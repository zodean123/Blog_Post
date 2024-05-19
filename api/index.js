const express = require('express');
const app = express();
const cors = require('cors');
const User = require("./models/user.js");
const Post = require('./models/Post.js');
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
app.use('/uploads',express.static(__dirname+'/uploads'));

mongoose.connect('mongodb://localhost:27017/test');

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
  
  app.post('/post', uploadMiddleWare.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    console.log(token);
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
        
      });
      res.json(postDoc);
    });
  
  });

  app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
    }
  
    const { token } = req.cookies;
    
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) return res.status(401).json({ error: 'Unauthorized' });
  
      const { id, title, summary, content } = req.body;
  
      try {
        const postDoc = await Post.findById(id);
  
        if (!postDoc) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
  
        if (!isAuthor) {
          return res.status(403).json({ error: 'You are not the author' });
        }
  
        await postDoc.updateOne({
          title,
          summary,
          content,
          cover: newPath ? newPath : postDoc.cover,
        });
  
        return res.json(postDoc);
      } catch (error) {
        console.error('Error updating post:', error);
        if (!res.headersSent) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });
  });
  
  
  

  app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
  });

  app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  })

app.listen(PORT, () => {
    console.log(`Connection is live at port no. ${PORT}`);
})