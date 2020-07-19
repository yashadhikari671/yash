const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURL;

const Users =require('./router/api/Users');
const Profile =require('./router/api/Profile');
const Post =require('./router/api/Post');

const app = express();

 mongoose.set('useNewUrlParser', true);
 mongoose.set('useFindAndModify', false);
 mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(db).then(()=>console.log('mangodb connected succesfuly')).catch(err=> console.log(err));



app.get('/',(req,res)=>res.send('hellow'));


//routes

app.use('/api/Users', Users);
app.use('/api/Profile', Profile);
app.use('/api/Post', Post);



const port = process.env.port || 5000;

app.listen(port , ()=>console.log(`server is running on ${port}`));