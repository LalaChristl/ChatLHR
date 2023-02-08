const nodemailer = require("nodemailer");
require("dotenv").config();

function getSubject(template) {
  switch (template) {
    case "welcome":
      return "Welcome to ChatLHR";
    case "forgotpass":
      return "Instructions on how to change your password for ChatLHR";
    default:
      "";
  }
}

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(token, template) {
  const data = {
    from: '"Lala 🦩" <larosechristl@gmail.com>', // sender address
    to: "lesleyannchristl@gmail.com", // list of receivers
    subject: getSubject(template), // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Welcome to our chat app</b>
    <p>click <a href="http://localhost:3000/emailconfirm/${token}">here</a> to verify your email</p>
  `,
  };
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(data);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    console.log(error.message);
  }
};
