const express=require('express');
const fs=require('fs')
const router = express.Router();
const nodemailer=require('nodemailer')
const multer=require('multer');
const storage=multer.memoryStorage();
var upload =multer({storage:storage});
const catModel=require('../db/userSchema')
const productSchema=require('../db/productSchema')
//  router.use(express.static(__dirname+"./public/"))

//  const storage=multer.diskStorage({
//     destination:(req,res,cb)=>{
//         cb(null,'.public/Images/')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"-" +Date.now()+path.extname(file.originalname))
     
//     }
// })


router.get('/fetchpost', (req, res) => {
    catModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})




router.post('/email',upload.single('file') , (req,res)=>{
 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'guravsamiksha17@gmail.com',
        pass: ''
      }
    });
    
    var mailOptions = {
      from: 'guravsamiksha17@gmail.com',
      to: 'guravsamiksha17@gmail.com',
      subject: 'Invoice PDF',
      text:
       `
       Dear Customer,

       Your Have Successfully downloaded the pdf and We have attached the pdf here. Please find Attached PDF.
       
       Thank You!`,
       attachments: [{
        filename: 'invoice.pdf',
        content: req.file.buffer,
      }],
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send("Email Sent!")
  })
router.post('/addpost',(req,res)=>{
   
    console.log(req.body)
let fname=req.body.fname;
let lname=req.body.lname;
let email=req.body.email;
let username=req.body.username;
let password=req.body.password;
let cpassword=req.body.cpassword;
let title=req.body.title;
let address=req.body.address;
let path=req.body.path
//insert data
let ins=new catModel({fname:fname,lname:lname,email:email,username:username,password:password,cpassword:cpassword,title:"",address:"",path:""});
ins.save((err)=>{
   if(err){ res.send("Already Added")}
  
})
})




router.post('/addsetting',(req,res)=>{
    catModel.updateOne({email:req.body.email},{$set:{title:req.body.title,address:req.body.address,path:req.body.path}},err=>{
        if(err) {res.json({"msg":"failed to update"})}
        else{
            res.json({"msg":'data updated'})
        }
    })
})

router.post('/addinvoice',(req,res) => {
    let insert = new productSchema({
        rname:req.body.rname,
        remail:req.body.remail,
        raddress:req.body.raddress,
        rdate:req.body.rdate,
        email:req.body.email,
        product:req.body.product,
        status:req.body.status

    })
    insert.save((e)=>{
        console.log(e)
        if(e){
            res.send('Already added')
        }
        else{
            res.send('category added')
        }
    })
})
router.post('/fetchproduct',(req,res) => {
    let email = req.body.email;
    productSchema.find({email:email},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
router.post("/deleteinvoice",(req,res)=>{
    productSchema.remove({_id:req.body._id},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
router.post("/updatepost",(req,res)=>{
    productSchema.updateOne({_id:req.body._id},{$set:{status:'PAID'}},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
module.exports=router;

