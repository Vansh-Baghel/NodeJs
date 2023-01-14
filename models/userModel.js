const express = require('express');
const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    // isEmail is inbuilt property which checks if the email is same or not.
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Please Enter password with atleast 8 letters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords must match!!',
    },
  },
  role: {
    type : String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user'
  },
  passwordChangedAt: Date,
  passwordResetToken : String,
  passwordResetExpires : Date,
  newPassword: {
    type: String,
    minLength: [8, 'Please Enter password with atleast 8 letters'],
    select: false,
  },
  active : {
    type : Boolean, 
    default : true
  }
});

userSchema.pre('save', async function (next) {
  // To only edit if the password is modified
  if (!this.isModified('password')) return next();
  else {
    //      Converting the password string in the database as random numbers. here 12 is the level of security, how safe it is.
    //      The high the number, more will the safety and more will be the time taken to convert into hash code.
    this.password = await bcrypt.hash(this.password, 12);

    //      Converting passwordConfirm is set to undefined to hide it from the database, we don't really need to save the confirm,
    //      its work is to just compare both the passwords.
    this.passwordConfirm = undefined;
    next();
  }
});

userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
  if (this.passwordChangedAt){
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
}

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');

  // This crpyto one will be saved in our database which is encrypted.
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;    // Means after 10 Mins

  console.log({resetToken} , this.passwordResetToken);

  return resetToken;
}

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  // This is a small hack to sub by 1000 because sometimes token might be generated before password change. Therefore to fix it, we use this.
  // Otherwise it could give error because we are comparing the token time with the time of changed password using changedPasswordAfter.
  this.passwordChangedAt = Date.now() - 1000;
  next();
})

userSchema.pre(/^find/, function(next) {
  this.find({active : {$ne : false}});
  next();
} )

const User = mongoose.model('User', userSchema);

module.exports = User;
