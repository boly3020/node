const express = require("express");
const app = express();
const mongoose = require("mongoose");
const doctorRoute = require("./Modules/Doctor/doctorRouter")
const adminRoute = require("./Modules/Admin/adminRouter")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors');
app.use(cors());
require('dotenv').config();
// console.log(process.env.SECRET_KEY)

app.use('/doctor', doctorRoute);
app.use('/admin', adminRoute);



mongoose.connect("mongodb://localhost:27017/DocDb", (err) => {
    if (err) process.exit(1);
    else { console.log("connected to database successfully"); }

});

app.listen(port, () => {
    console.log(`express app listening on port ${port}`);
});
app.get("/", (req, res) => {
    res.send("doctors");
});
app.use((err, req, res, next) => {
    res.send({
        status: err.statusCode,
        message: err.message,
        errors: err,
    });
});


app.options('*', cors());