//LIST OF ALL DEPENDENCIES: START
const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//LIST OF ALL DEPENDENCIES: END

//IMPORTING FUNCTIONS/DATA FROM OTHER JS FILES: START

const consts = require('./api/const');
const loginRoutes = require('./api/routes/login-route');

//IMPORTING FUNCTIONS/DATA FROM OTHER JS FILES: END

//DATABASE CONNECTION INITIALIZATION: START
var mongoDB = consts.DATABASE.DB_LINK;

mongoDB = mongoDB.replace("auth", consts.DATABASE.MONGO_ATLAS_PW);
mongoDB = mongoDB.replace("dbname", consts.DATABASE.DB_NAME);

console.log("mongo db link = "+mongoDB);

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', ()=>{
    console.log("Mongo database connection success!");
})

//DATABASE CONNECTION INITIALIZATION: END


//MIDDLEWARES

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//FOR CORS HANDLING OF HEADERS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(consts.STATUS.OK).json({});
    }
    next();
})

//LIST ALL ROUTES: START

app.use('/sample', loginRoutes);

//LIST ALL ROUTES: END

//ERROR MIDDLEWARE : START

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = consts.STATUS.NOT_FOUND;
    next(error);
});


app.use((error, req, res, next)=>{
    res.status(error.status || consts.STATUS.INTERNAL_SERVER);
    res.json({
        error:{
            message: error.message
        }
    })
});
//ERROR MIDDLEWARE : END

module.exports = app;