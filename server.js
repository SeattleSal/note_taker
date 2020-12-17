// Note Taker app
// Dependencies
// ===========================================================
var express = require("express");
// import fs moduel
var fs = require("fs");
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public folder available
app.use(express.static('public'));

// Routes
// ===========================================================

// put api routes before html routes
// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  // use fs module to read the file

  // then parse file contents with JSON.parse() to get real data

  // send parse data back to the client with res.json()
  // 
});

// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
  // access the POSTed data in req.body

  // use fs module to read the file
  // then parse file contents with JSON.parse() to get real data, put into an object
  // push the req.body to the array list
  // JSON.stringify array list back into a JSON string
  // THEN save the contents back to the 'db.json' file with teh fs module

});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function(req, res) {
  //access id from req.params
  // use fs module to read the file
  // then parse file contents with JSON.parse() to get real data, put into an object
  // (option1)find matching index using findIndex
  // remove target element using splice
  // (option2) use filter

});


// returns notes.html
app.get("/notes", function(req, res) {
  // res.send("Welcome... to the Note Taker!");
  // res.sendFile("./public/notes.html");
        res.sendFile(path.join(__dirname + "\\public", "notes.html"));



});

// this needs to go last and always return index.html
app.get("*", function(req, res) {
    res.send("Welome... to the Note Taker!");
    // return context of index.html
    //     res.sendFile(path.join(__dirname, "index.html"));

  });


  
// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });