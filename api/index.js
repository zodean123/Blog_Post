const express = require('express');
const app = express();
const cors = require('cors');
const User = require("./models/user.js");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PORT = 4000;
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleWare = multer({dest:'uploads/'})
const fs = require('fs'); //Renaming the file

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfasdgouhfgjhaslfjasdf';


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

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
    const userDoc = await User.findOne({username});
  const passok =  bcrypt.compareSync(password,userDoc.password);
  if(passok){
   jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
    if(err) throw err;
    res.cookie('token',token).json({
        id:userDoc._id,
        username,
    });
});
  }
  else{
    res.status(400).json('wrong credentials');
  }
})


app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });
  

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });
  
  app.post('/post',uploadMiddleWare.single('file'), (req,res)=>{
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
   res.json({ext});
  })




app.listen(PORT, () => {
    console.log(`Connection is live at port no. ${PORT}`);
})