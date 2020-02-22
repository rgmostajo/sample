
const mongoose = require('mongoose');
const consts = require('../const');
const User = require('../models/user-model');

//EXPORTING SIGNUP FUNCTION
exports.signup = ((req, res, next)=>{

    //GETTING DATA FROM THE REQUEST BODY
    var username = req.body.username;
    var password = req.body.password;
    var status = req.body.status;
    var userPayload = req.body.userPayload

    //SHOULD BE THE SAME AS THE MODEL OF THE SCHEMA
    let user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: password,
        status: status,
        userPayload: userPayload
    })
    // .save() IS A MONGOOSE QUERY FOR SAVING DATA INTO THE COLLECTION
    //.THEN() AND .CATCH() -> USED AS THE PROMISE/CALLBACK FUNCTION.
    //.THEN() IS EXECUTED IF THE QUERY IS SUCCESSFUL WHILE .CATCH() IS EXECUTED IF NOT.
    user.save()
    .then(result =>{
        //RESULT HOLDS THE DATA AFTER THE QUERY IS EXECUTED
        console.log(result);
        //SENDING RESPONSE DEPENDING ON THE RESULT
        res.status(consts.STATUS.OK).json({
            successful: true,
            message: "User successfully created"
        })
        
    })
    .catch( err =>{
        console.log(err);
        //ERROR RESPONSE!
        res.status(consts.STATUS.INTERNAL_SERVER).json({
            successful: false,
            message: "User unsuccessfully created"
        })
    });

    
    
})

exports.deactivate = ((req, res, next)=>{

    var status = req.body.status;

    console.log("user status =", status);

    var update = {status: status};
    var filter = {username: req.params.username}
    //FINDONE IS FOR SEARCHING A DOCUMENT WHICH MAKES THE FIRST PARAMETER TRUE
    //AND THEN UPDATING THE KEY OF THE DOCUMENT THAT MATCHES THROUGH THE SEND PARAMETER
    //THE THIRD PARAMETER IS TO ENSURE THAT THE NEW DOCUMENT IS BEING UPDATED
    User.findOneAndUpdate(filter, update, {new: true, userFindAndModify: false})
    .then(result =>{
        console.log(result);
        if (result === null){
            res.status(consts.STATUS.NOT_FOUND).json({
                successful: false,
                message: "User does not exists"
            })
        }
        else{
            res.status(consts.STATUS.OK).json({
                successful: true,
                message: "User successfully updated"
            })
        }
        
        
    })
    .catch( err =>{
        console.log(err);
        res.status(consts.STATUS.INTERNAL_SERVER).json({
            successful: false,
            message: "User unsuccessfully updated"
        })
    });

    
    
});

exports.login = ((req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;

    var filter = {username: username};

    //FINDONE.EXEC() IS FOR SEARCHING A DOCUMENT THAT MATCHES THE FIRST PARAMETER
    User.findOne(filter).exec()
    .then(result =>{
        if (result){
            if (result.status == false){
                res.status(consts.STATUS.UNAUTHORIZED).json({
                    successful: false,
                    message: "User account is deactivated"
                })
                console.log("Status is not active");
            }
            else if (result.password != password){
                console.log("Wrong password");
                res.status(consts.STATUS.UNAUTHORIZED).json({
                    successful: false,
                    message: "Wrong credentials"
                })
            }
            
            else{
                res.status(consts.STATUS.OK).json({
                    successful: true,
                    message: "Login Success"
                })
                console.log("Login success");
            }
            
        }
        else{
            res.status(consts.STATUS.NOT_FOUND).json({
                successful: true,
                message: "User not found"
            })
            console.log("User not found");
            return;
        }
    })
    .catch(err =>{
        res.status(consts.STATUS.INTERNAL_SERVER).json({
            successful: false,
            message: err
        })
        console.log("Error: "+err);
        return;
    })
});

exports.deleteUser = ((req, res, next) =>{

    //DELETE ONE IS FOR DELETING A DOCUMENT WHICH MATCHES THE FIRST PARAMETER
    User.deleteOne({ username: req.body.username}, {userFindAndModify: false})
    .then(result =>{
        if (result){
            res.status(consts.STATUS.OK).json({
                successful: true,
                message: "User deleted!"
            })
        }
        else{
            res.status(consts.STATUS.NOT_FOUND).json({
                successful: true,
                message: "No users available",
                count: 0
            })
        }
    })
    .catch(err =>{
        res.status(consts.STATUS.INTERNAL_SERVER).json({
            successful: false,
            message: err
        })
        console.log("Error: "+err);
        return;
    })
})

exports.deleteUsers = ((req, res, next) =>{

    //DELETEMANY() FOR REMOVING ALL DOCUMENTS, HENCE, THE FIRST PARAMETER IS AN EMPTY JSON STRING
    User.deleteMany({})
    .then(result =>{
        if (result){
            res.status(consts.STATUS.OK).json({
                successful: true,
                message: "All users are removed"
            })
        }
        else{
            res.status(consts.STATUS.NOT_FOUND).json({
                successful: true,
                message: "No users available",
                count: 0
            })
        }
    })
    .catch(err =>{
        res.status(consts.STATUS.INTERNAL_SERVER).json({
            successful: false,
            message: err
        })
        console.log("Error: "+err);
        return;
    })
})

exports.listUsers = ((req, res, next) =>{
    //SEARCHING ALL DOCUMENTS IN A COLLECTION, THAT IS WHY THE FILTER SECTION, OR THE FIRST PARAMETER IS EMPTY
    User.find({})
    .then(result =>{
        if (result){
            res.status(consts.STATUS.OK).json({
                successful: true,
                message: result
            })
        }
        else{
            res.status(consts.STATUS.NOT_FOUND).json({
                successful: true,
                message: "No users available",
                count: 0
            })
        }
    })
    .catch(err =>{
        res.status(consts.STATUS.INTERNAL_SERVER).json({
            successful: false,
            message: err
        })
        console.log("Error: "+err);
        return;
    })
})


