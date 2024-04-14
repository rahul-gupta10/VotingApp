const express = require('express');
const router = express.Router();
const user = require('../model/user')
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../fetchuser')
require('dotenv').config();


const jwt_sig = process.env.JWT_SIGNATURE;

//Routes for creating user
router.post("/createuser",
    [],
    async (req, res) => {
        const checkresult = validationResult(req);
        try {
            if (checkresult.isEmpty()) {
                let success = false;
                let userstatus = await user.findOne({ aadharCardNumber: req.body.aadharCardNumber }); //cehcking email if exist 
                if (userstatus) {
                    return res.status(400).json({ success: false, error: "User already exist" });
                }
                else {
                    console.log(`[${new Date().toLocaleString()} ]   creating user  ${req.body.aadharCardNumber}`)
                    const newuser = new user(req.body)
                    const response = await newuser.save();
                    const data = {
                        id: response.id
                    }
                    const authtoken = jwt.sign(data, jwt_sig);
                    success = true;
                    res.json({ success, authtoken, response });
                }
            }
            else {
                res.status(400).json({ errors: checkresult.array() });
            }

        }
        catch (error) {
            res.status(500).send({ error: "something went wrong " + error.message });
        }
    }


)

//Update user details
router.put('/updateprofile', fetchuser, async (req, res) => {
    const id = req.user;
    const updated = await user.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    res.json({ updated })
})

//view user profile
router.get('/profile', fetchuser, async (req, res) => {
    try {
        const id = req.user;
        const response = await user.findById(id)
        res.json({ response })
    } catch (error) {
        res.json({ error })
    }
})

// update password for user
router.put('/profile/updatePass', fetchuser, async (req, res) => {
    let success = false;
    const id = req.user;
    let userfind = await user.findById(id)
    if (!userfind) return res.status(401).json({ error: "User not found" });
    const isMatched = await bcrypt.compare(req.body.currentPassword, userfind.password)
    if (!isMatched) return res.status(401).json({ error: "Current password  not matched" });
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.newPassword, salt);
        const updated = await user.findByIdAndUpdate(id, { password: password }, {
            new: true,
            runValidators: true
        });
        success = true
        res.json({ success})
    } catch (error) {
        res.status(500).send({ success:true , error: "something went wrong while changing password " + error.message });
    }
})


// Route for user authentication / login.
router.post('/login',
    async (req, res) => {
        try {
            let success = false;
            const aadharCardNumber = req.body.aadharCardNumber;
            const password = req.body.password;
            let userstatus = await user.findOne({ aadharCardNumber: aadharCardNumber });
            if (userstatus) {
                const isMatch = await bcrypt.compare(password, userstatus.password);
                if (isMatch) {
                    const payload = {
                        id: userstatus.id
                    }
                    const authtoken = jwt.sign(payload, jwt_sig);
                    success = true;
                    res.json({ success, authtoken,userstatus });
                } else {
                    res.send({ success, error: "Sorry, your password is incorrect. Please double-check your password." });
                }

            } else {
                return res.status(500).json({ success, error: "Opps!! Username not found" })

            }
        }
        catch (error) {
            res.status(500).send({ error: "something went wrong while login " + error.message });
        }
    })

module.exports = router;