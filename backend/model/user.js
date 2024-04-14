const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }

});

userSchema.pre('save', async function(next){
    const userdetail = this;
    if(!userdetail.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(userdetail.password,salt);
      userdetail.password = hashpass;
      next();      
    }
    catch (error) {
      return next(error)
  }
  });
  
const user = mongoose.model('user', userSchema);
module.exports = user;