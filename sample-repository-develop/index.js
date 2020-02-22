'use strict';

// `require` is used to import third party libraries
// here we use it to import express
const express = require('express');
// calling `express()` creates a new app, which we set to 
// the constant `app`
const app = express();

// note that in memory JS is NOT normally
// how you'd want to store state on the server,
// but we're simplifying here to get a sense of express
// basics.
let theCount = 0;

// this sets up a static file server that can serve
// assets from a public folder
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// this endpoint sends back the current value of `theCount`
// which is an in-memory variable. This function increments
// the count by 1 and then returns a JSON object of the form
// `{ "count": 12}`. Note that because `theCount` is a volatile,
// in-memory variable, each time the server restarts, its value
// will be reset to 0 (and keep in mind that our HyperDev server
// goes to sleep when it's not receiving requests).
app.get("/the-count", (req, res) => {
  console.log('incrementing the count');
  theCount += 1;
  console.log(`the count is ${theCount}`);
  res.json({count: theCount});
});

// listen for requests and log when you've started doing it
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));