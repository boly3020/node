const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({
    username : {
        type: 'string'
        
        ,required : true
    },
    password : {
        type: 'string'
    }, 
    email:String
})
adminSchema.pre('save', async function(next) {
    const saltRounds = 10;
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;