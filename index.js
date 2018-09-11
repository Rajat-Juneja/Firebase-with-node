const express = require('express');
const bodyParser= require('body-parser');
const nodemailer= require('nodemailer');
const firebase = require('firebase');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/mail',(req,res)=>{
    SendMailToSubs(req.body.name, req.body.email);
})

function SendMailToSubs(toname,toid){

    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: '****',
                   pass: '****'
               }
           });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"SetMyTest " <****>', // sender address
            to: toid, // list of receivers
            subject: "New User", // Subject line
            // text: '', // plain text body
            html: "Dear "+toname+", Welcome to our app" // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else{
                console.log(info);
            }
        });
    });
    
    }

var server = app.listen(process.env.PORT||5000,()=>{
    console.log(server.address().port);
});