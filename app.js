
const express=require('express');
const path=require('path');
const app=express();
const port=process.env.PORT || 8000;
const bodyparse=require('body-parser');
//MONGOOSE SPECIFIC STUFFS
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Contact');
}

//DEFINING SCHEMA AND MODELS
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String
  });

  const contact = mongoose.model('contact', ContactSchema);
//EXPRESS SPECIFIC STUFFS
app.use('/static', express.static('static'));
app.use(express.urlencoded())
//PUG SPECIFIC STUFFS
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.ejs', params);
});
app.get('/home', (req, res)=>{
    const params = {}
    res.status(200).render('index.ejs', params);
});
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.ejs', params)});
app.get('/signup', (req, res)=>{
    const params = {}
    res.status(200).render('loginpage.ejs', params)});
app.post('/contact', (req, res)=>{
   var mydata=new contact(req.body);
   mydata.save().then(()=>res.send("this data has been stored successfully into the DataBase")).catch(()=>res.status(404).send("This data is not saved"));
//    res.status(200).render('/contact.ejs')
});




// START THE SERVER
app.listen(process.env.PORT || 8000, ()=>{
    console.log(`The application started successfully on port ${port}`);
});