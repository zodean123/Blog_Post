const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 4000;


app.use(cors);
app.use(express.json());

app.post('/register',(req,res)=>{
    const {username,password} = req.body;
    res.json({requestData:{username,password}});
    
})

app.listen(PORT,()=>{
    console.log(`Connection is live at port no. ${PORT}`);
})