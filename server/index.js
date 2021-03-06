const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(()=>console.log('MongoDB Connected..'))
.catch((error)=>console.log(error));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hello', (req, res)=>{
  res.send("안녕하세요")
})

app.post('/api/users/register', (req, res)=>{
  const user = new User(req.body);
  user.save((err, userInfo) =>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  //find required email in database
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if(!userInfo){
      return res.json({
        loginSuccess: false,
        message: "there is no email in database",
      })
    }
    //if the email is in database, check that password is correct
    userInfo.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch){
        return res.json({
          loginSuccess: false,
          mesage: "wrong password"
        })
      }
      //if the password is correct, generate token
      userInfo.generateToken((err, userInfo)=>{
        if(err) return res.status(400).send(err);
        // store token in cookie
        res.cookie("x_auth", userInfo.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: userInfo._id,
        })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) =>{
  /* If authentication is true, do this */
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role 0 means not admin
    isAuth: true, 
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})

app.get('/api/users/logout', auth, (req, res)=>{
  User.findOneAndUpdate({_id: req.user._id}, 
    { token: ""}
    , (err , user)=>{
      if(err) return res.json({ sucess:false, err})
      return res.status(200).send({
        success:true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})