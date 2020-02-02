const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  title: String,
  body: String
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
