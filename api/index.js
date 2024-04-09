const express = require('express');
const app = express();
const cors = require('cors');
const User = require("./models/user.js");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PORT = 4000;
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const salt = bcrypt.genSaltSync(10);
const secret = 'asdfasdgouhfgjhaslfjasdf';


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/user')
app.post('/register',async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.create({
            username:username,
            password:bcrypt.hashSync(password,salt),
        })
        res.json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
 
})

app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username:username});
  const passok =  bcrypt.compareSync(password,userDoc.password);
  if(passok){
   jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
    if(err) throw err;
    res.cookie('token',token).json('ok');
});
  }
  else{
    res.status(400).json('wrong credentials');
  }
})



app.listen(PORT, () => {
    console.log(`Connection is live at port no. ${PORT}`);
})