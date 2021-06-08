const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
   email: {
       type:String
   },
   password: {
       type:String
   },
   confirmpassword: {
       type:String
   } 
})
// we will create a new collection
const Register = new mongoose.model('registers', employeeSchema);
module.exports = Register;