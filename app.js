const express=require("express");
const path=require("path");
const app=express();
const port=8000;
const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
 mongoose.connect('mongodb://127.0.0.1:27017/contacts');
const contactschema= new mongoose.Schema({
    name:String,
    contact:String,
    email:String,
    address:String,
    concern:String
})
const data2 = mongoose.model('data2', contactschema);
app.set('view engine', 'html');
app.set('views',path.join(__dirname, 'views'))
// EXPRESS SPECIFIC STUFF
app.use( express.static('static'));
app.use("/static", express.static('static'));
app.use(express.urlencoded({ extended: true }))
//ENDPOINTS
app.get('/',(req, res)=>{
    res.sendFile('home.html', {root: 'views'});
})
app.get('/contact',(req, res)=>{
    res.sendFile(__dirname+'contact.html')
})
app.post('/contact',async(req, res)=>{
    const data=data2(req.body)
    await data.save().then(()=>{
        res.send("The data was saved")
    }).catch(()=>{
        res.send("The data not was saved")
    })
})
//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`)
})