const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    email:{
        type: String
    } 
});

userSchema.pre('save', async function(next) {
    const saltRounds = 10;
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
const User = mongoose.model('User', userSchema);

module.exports = User;