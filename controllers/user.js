const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.SignUp = async function(req,res){
    try {
     const salt = await bcrypt.genSalt(10);
     const hashpass = await bcrypt.hash(req.body.password,salt);
     const new_user = new User({
        name:req.body.name,
        email:req.body.email,
        isAdmin:req.body.isAdmin,
        password:hashpass
     })   
     const user = await new_user.save();
     return res.status(200).json({
        message:"Registered Successfully",
        user
     })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}


module.exports.login = async function(req,res){
    try {
      const user =await User.findOne({
        email:req.body.email
      })  
      if(!user){
        return res.status(404).json('User is not found')
      }
      const validated = await bcrypt.compare(req.body.password,user.password);
      if(!validated){
        return res.status(403).json('Wrong Password');
      }
      return res.status(200).json({user,
        data:{
            token:jwt.sign(user.toJSON(),'Guruji_Astro',{expiresIn:10000})
           }
      })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}

module.exports.update = async function(req,res){
    try {
        const user =await User.findOne({
            email:req.body.email
          }) 
          if(!user){
            return res.status(404).json('User is not found')
          } 
          const validated = await bcrypt.compare(req.body.password,user.password);
          if(!validated){
            return res.status(403).json('Wrong Password');
          }
          const newpassword = req.body.newpassword;
          const salt = await bcrypt.genSalt(10)
          const hashpass = await bcrypt.hash(newpassword,salt);
          const update = await User.findByIdAndUpdate(user._id,{
            password:hashpass
          })
          return res.status(200).json({
            meassage:"Updated Successfully",update
          })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}

module.exports.delete = async function(req,res){
    try {
        const user =await User.findOne({
            email:req.body.email
          })  
          if(!user){
            return res.status(404).json('User is not found')
          }
          const validated = await bcrypt.compare(req.body.password,user.password);
          if(!validated){
            return res.status(403).json('Wrong Password');
          }
          const del = await User.findByIdAndDelete(user._id,{
            id:user._id
          })
          return res.status(200).json({
            meassage:"Deleted Successfully"
          })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}