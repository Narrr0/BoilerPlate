const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = moongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email:{
    type: String,
    trim: true,  // 문자열 사이의 공백 제거
    unique: 1,
  },
  password:{
    type: String,
    minlength: 5
  },
  lastname:{
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0,
  },
  images: String,
  token:{
    type: String,
  },
  tokenExp:{
    type: Number,
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}