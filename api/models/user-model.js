const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SCHEMA IS SIMILAR TO TABLE. COMPOSED OF KEY NAME AND MONGODB TYPE
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    status: Boolean,
    userPayload: {
        lastName: String,
        firstName: String,
        email: String,
        contactNo: String
    }
});

//EXPORTING MODEL/SCHEMA NAMED USER-DB AND ITS STRUCTURE.
module.exports = mongoose.model('user-db', userSchema);