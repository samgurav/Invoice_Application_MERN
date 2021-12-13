const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fname:{
        type: String,
        required:true
    },
    lname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
      
    },
    title:{
        type:String,
    
      
    },
    path:{
        type:String,
    
      
    },
    address:{
        type:String,
      
      
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
   
    }


})

module.exports=mongoose.model('userdata',userSchema)