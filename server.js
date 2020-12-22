// Note Taker app
// Dependencies
// ===========================================================
const express = require("express");
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public folder available
app.use(express.static("public"));

// Routes
// ===========================================================
// GET `/api/notes` - Read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  // use fs module to read the file
  fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function(err, data) {
    if (err) throw err;
  
    // then parse file contents with JSON.parse() to get real data and return as JSON
    let contents = JSON.parse(data);
    res.json(contents);
  });
});

// POST `/api/notes` - Receive a new note and add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
  // access the POSTed data in req.body
  let newNote = req.body;
  // Use uuid for random mostly unique id
  newNote.id = uuidv4();

  fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function(err, data) {
    if (err) throw err;
  
    // parse file contents with JSON.parse() to get real data and return as JSON
    let notesAll = JSON.parse(data);
    notesAll.push(newNote);
    let notesAlltring = JSON.stringify(notesAll);
    
    // add new note to db.json and refresh page
    fs.writeFile(path.join(__dirname + "/db/db.json"), notesAlltring, function(err) {
      if (err) throw err;
      res.json(notesAll);
    });
  });
});

// DELETE `/api/notes/:id` - delete the note with :id
app.delete("/api/notes/:id", function(req, res) {
  // access id from req.params
  const idToDelete = req.params.id;

  // grad all notes data
  fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function(err, data) {
    if (err) throw err;
  
    let notesAll = JSON.parse(data);
    // find that note with matching ID
    let filteredNotes = notesAll.filter((note) => {
      return note.id != idToDelete;
    });

    let notesAllString = JSON.stringify(filteredNotes);
    
    // add updated notes to db.json and refresh page
    fs.writeFile(path.join(__dirname + "/db/db.json"), notesAllString, function(err) {
      if (err) throw err;
      res.json(notesAllString);
    });
  });
});

// returns notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// return index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

