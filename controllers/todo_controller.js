const route = require('../routes/route');
const TODO = require('../models/todo_schema');
const jwt = require('jsonwebtoken');
const secret = 'Guruji_Astro'; // replace with your own secret key
const nodemailer = require('nodemailer');
const sendemail = require('../utility/sendmail')
const ejs = require('ejs');
const user = require('../models/User');

module.exports.create = async function(req,res){
    try {
        const new_todo = new TODO({
          task:req.body.task,
          description:req.body.description
        })
        const todo = await new_todo.save();
        const todouser = await user.findOne({ name: req.body.name });

        let transporter;
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'sagarcloud11@gmail.com', // generated ethereal user
            pass: 'jdztrrgvbqcvtjnc', // generated ethereal password
          },
        });
        let info = await transporter.sendMail({
            from: '"Task Added" <sagarcloud11@gmail.com>', // sender address
            to: todouser.email, // list of receivers
            subject: "Task Added", // Subject line
            text: "Your Task is :",todo, // plain text body
            html: "<h1>Your Task Added Succefully</h1>", // html body
          });

        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({
          message:"Work Added Sucessfully",
          todo
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}


module.exports.check = async function(req,res){
    try {
        const todo = await TODO.findOne({
            task:req.body.task
        })
        if(!todo){
            return res.status(404).json("work is not found");
        }
        const todouser = await user.findOne({ name: req.body.name });
        return res.status(200).json({todo,
         data:{
          token:jwt.sign(todo.toJSON(),'Guruji_Astro',{expiresIn:10000})
         }
        })
    } catch (error) {
        console.log(error);
         res.status(500).json(error)
    }
}

module.exports.update = async function(req,res){
    try {
        const todo = await TODO.findOne({
            task:req.body.task
        })
        if(!todo){
            return res.status(404).json("work is not found");
        }
        const todouser = await user.findOne({ name: req.body.name });
        const completed = true;
        const update = await TODO.findByIdAndUpdate(todo._id,{
            completed:true
        })
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sagarcloud11@gmail.com', // generated ethereal user
              pass: 'jdztrrgvbqcvtjnc', // generated ethereal password
            },
          });
    
        
    let info = await transporter.sendMail({
        from: '"Task Added" <sagarcloud11@gmail.com>', // sender address
        to:todouser.email, // list of receivers
        subject: "Task Completed", // Subject line
        text: "Your Task is :",todo, // plain text body
        html: "<h1>Congratulation ! Your have completed your Task Succefully</h1>" // html body
      });
    
      console.log("Message sent: %s", info.messageId);
        return res.status(200).json({
            message:"Updated Successfully",
            update
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports.delete = async function(req,res){
    try {
        const todo = await TODO.findOne({
            task:req.body.task
        })
        if(!todo){
            return res.status(404).json("work is not found");
        }
        const todouser = await user.findOne({ name: req.body.name });
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'sagarcloud11@gmail.com', // generated ethereal user
            pass: 'jdztrrgvbqcvtjnc', // generated ethereal password
          },
        });
  
      
  let info = await transporter.sendMail({
      from: '"Task Deleted" <sagarcloud11@gmail.com>', // sender address
      to:todouser.email, // list of receivers
      subject: "Task Added", // Subject line
      text: "Your Task is :",todo, // plain text body
      html: "<h1>Congratulation ! Your Task Deleted Succefully</h1>" // html body
    });
  
    console.log("Message sent: %s", info.messageId);
        const del = await TODO.findByIdAndDelete(todo._id,{
            id:todo.id
        })
        return res.status(200).json({
            message:"Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

