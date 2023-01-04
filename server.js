const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require("express");
const app = express();
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute')
const commentRoute = require('./routes/commentRoute');

dotenv.config({path: './config.env'});
app.use(express.json());

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    //console.log(req.headers)
    next();
})

app.get('/', (req,res)=>{
    console.log(req.requestTime+' -> '+'Home Page')
    res.status(200).send('Welcome to Blogging website Home page.')
})

app.use('/api/v1/users', userRoute);
app.use('/api/v1/blog', blogRoute);
app.use('/api/v1/comment', commentRoute);

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(()=> console.log(`DB connection successful`));

const port = process.env.PORT || 5000;
app.listen(port, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`Listening at port ${port}`)
    }
})