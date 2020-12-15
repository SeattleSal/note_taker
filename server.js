// Note Taker app
// Dependencies
// ===========================================================
var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public folder available
app.use(express.static('public'))

// Routes
// ===========================================================
app.get("/", function(req, res) {
    res.send("Welcome... to the Note Taker!");
  });

  
// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });