const express = require('express');
const router = express.Router();
const Candidate = require('../model/candidate')
const User = require('../model/user')
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../fetchuser');
const user = require('../model/user');
require('dotenv').config();


const jwt_sig = process.env.JWT_SIGNATURE;

const checkRole = async (userid) => {
    const user = await User.findById(userid);
    if (user.role === 'admin') return true;
    else return false
}
//Routes for creating Candidate
router.post("/createCandidate",
    [],fetchuser,
    async (req, res) => {
        const checkresult = validationResult(req);
        try {
            if (checkresult.isEmpty()) {
                let success = false;
                if(!await checkRole(req.user)) return res.status(403).json({success,error:"User is not authorize to add Candidate"})
                const newCandidate = new Candidate(req.body)
                const response = await newCandidate.save();
                success = true;
                res.json({ success, response });
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

//Update Candidate details
router.put('/updateCandprofile/:id', fetchuser, async (req, res) => {
    const id = req.user;
    if(!await checkRole(req.user)) return res.status(403).json({success,error:"User is not authorize to modify Candidate"})
    const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.json({ updated })
})

//view user profile
router.get('/profile', fetchuser, async (req, res) => {
    const id = req.user;
    let success=false
    if(!await checkRole(req.user)) return res.status(403).json({success,error:"User is not authorize to View Candidate"})
    const response = await Candidate.find();
    res.json({ response })
})

//view user profile
router.get('/candidatelist', async (req, res) => {
    let success=false
    const response = await Candidate.find();
    if(response){
        res.send({success:true,response})
    }
})

//Route for voting the Candidate.

router.post('/vote/:candId',fetchuser,async (req,res)=>{
    let success  = false;
    if(await checkRole(req.user)) return res.status(403).json({success,error:"admin is not authorize to Vote Candidate"})
    const candId = req.params.candId;
    const voterid = req.user;
    try {
        let cand = await Candidate.findById(candId)
        if(!cand) return res.status(404).json({success,error:"Candidate not found"})

        let user = await User.findById(voterid);

        if(!user) return res.status(404).json({success,error:"User not found"})

        if(user.isVoted) return res.status(401).json({success,error:"User has already given the vote!!"})
        console.log("updating vote now")
        //Updating Candidate vote
        cand.vote.push({user:voterid});
        cand.voteCount++;
        await cand.save();
        //Updating User 
        user.isVoted = true
        await user.save();
        success=true
        res.status(200).json({success})


    } catch (error) {   
        res.status(404).json({success ,error:"failed during voting"+ error.message})
        
    }
})

//Fetch Vote count

router.get('/getCount',async (req,res)=>{
    let success = false
    const response = await Candidate.find().sort({voteCount:'desc'});
    if(response){
        const result = response.map((data)=>{
            return {
                candname : data.name,
                name : data.party,
                count : data.voteCount
            }
        })
        return res.status(200).json({success:true,result})
    } 
    return res.status(404).json({success,error:"Candidate not found"})

})
module.exports = router;