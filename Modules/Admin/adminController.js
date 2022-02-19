const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('./adminModel');
const asyncValidateFn = util.promisify(jwt.sign);
require('dotenv').config();



const login = async (req,res,next)=>{
    const { username, password } = req.body;
    try {
        const admin  = await Admin.findOne({ username});
        console.log(admin);
        if(!admin)throw new Error('invalid username or password 1');
        const {password: hashedPassword} = admin;
        const result = await bcrypt.compare(password, hashedPassword);
        if(!result) throw new Error('invalid username or password 22');
        const token = await asyncValidateFn({
            id: admin.id
        },process.env.SECRET_KEY);

        res.send({token});
    } catch (error) {
        console.log(error);
        next(error);
    }
}
module.exports =login;