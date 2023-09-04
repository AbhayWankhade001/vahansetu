const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'||'http://localhost:8000/send-email', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));
  app.get("/",(req,res) =>{
    console.log("hi working")
    res.send("hi")
  })

  app.get("/send-email",(req,res) =>{
    console.log("hi working")
    res.send("hi")
  })
  app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received email:', email);
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "surendrawankhade1973@gmail.com",
        pass: "cyjepyhwchonjuii",
      },
    });
  
    const mailOptions = {
      from: email,
      to: email, // Use the extracted email as both sender and recipient
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.json({ success: false });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ success: true });
      }
    });
  });
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports.handler = serverless(app);
