const express = require('express');
const app = express();
const cors = require('cors');
const User = require("./models/user.js");
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/user')
app.post('/register',async (req,res)=>{
    try{
        const user = await User.create({
            username:req.body.username,
            password:req.body.password,
        })
        res.json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
 
})

app.listen(PORT, () => {
    console.log(`Connection is live at port no. ${PORT}`);
})