const nodemailer = require('nodemailer');

module.exports.sendemail = async function(str,data){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sagarcloud11@gmail.com', // generated ethereal user
          pass: 'jdztrrgvbqcvtjnc', // generated ethereal password
        },
      });


let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <sagarcloud11@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: 'maildecoration', // html body
  });

  console.log("Message sent: %s", info.messageId);

}
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>