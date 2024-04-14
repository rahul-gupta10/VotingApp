const { default: mongoose } = require("mongoose");

let candidateSchema = new mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    party:{
        type: String,
        required:true
    },
    electionSign:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    vote: [
        {
            user :{
                type: mongoose.Schema.Types.ObjectId,
                ref :'user',
                required :true
            },
            votedAt:{
                type : Date,
                default : Date.now()
            }
        
        }
    ],
    voteCount : {
        type : Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate',candidateSchema);
module.exports = Candidate;