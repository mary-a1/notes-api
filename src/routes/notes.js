const router = require("express").Router();
const { getUserNotes, getNotesById, addNote, updateNote, deleteNote, shareNote } = require('../db/queries/note');

module.exports = (db) => {
  // To get a list of all notes for the authenticated user
  router.get("/", (req, res) => {
    const id = req.signedCookies.name;
    if (!id) {
      return res.status(400).send("It seems you're trying to add a note withtout logging in.Please log in first.");
    }
    getUserNotes(db, id)
      .then((note) => {
        res.send(note.rows);
      });
  });

  // To get a note by ID for the authenticated user
  router.get("/:id", (req, res) => {
    const user_id = req.signedCookies.name;
    if (!user_id) {
      return res.status(400).send("It seems you're trying to add a note withtout logging in.Please log in first.");
    }
    const note_id = req.url.substring(1);
    getNotesById(db, note_id)
      .then((note) => {
        if (!note.rows.length) { // check if note exists
          return res.sendStatus(404);
        }
        res.send(note.rows); // send the first item in the rows array
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500); // handle any other errors
      });
  });

  // To add a note entry of a user
  router.post("/", (req, res) => {
    // Validate note
    const user_id = req.signedCookies.name;
    const { text } = req.body;
    const noteInfo = { user_id, text };
    let status = 400;
    if (!text) {
      return res.status(status).send("Please include some text in this note entry.");
    }
    if (!user_id) {
      return res.status(status).send("It seems you're trying to add a note withtout logging in.Please log in first.");
    }

    // If note entry is valid add it to the note table
    addNote(db, noteInfo)
      .then((note) => {
        res.status(200).send(note.rows[0]);
      });
  });

  // To update an existing note by ID for the authenticated user.
  router.put("/:id", (req, res) => {
    const user_id = req.signedCookies.name;
    if (!user_id) {
      return res.status(400).send("It seems you're trying to update a note withtout logging in. Please log in first.");
    }
    const noteId = req.url.split("/")[1];
    const noteContent = req.body.note;
    updateNote(db, noteId, noteContent)
      .then(() => {
        res.status(200).send({ message: "note updated!" });
      });
  });

  // To delete a note entry of a user
  router.delete("/:id", (req, res) => {
    const user_id = req.signedCookies.name;
    if (!user_id) {
      return res.status(400).send("It seems you're trying to update a note withtout logging in. Please log in first.");
    }
    const noteId = req.url.split("/")[1];
    deleteNote(db, noteId)
      .then(() => {
        res.status(200).send({ message: "note deleted!" });
      });
  });

  // To share a note with another user for the authenticated user
  router.post("/:id/share", (req, res) => {
    const user_id = req.signedCookies.name;
    if (!user_id) {
      return res.status(400).send("It seems you're trying to update a note withtout logging in. Please log in first.");
    }
    const noteId = req.url.split("/")[1];
    const other_user_id = req.body.user_id;
    shareNote(db, noteId, other_user_id)
      .then(() => {
        res.status(200).send({ message: "note shared!" });
      });
  });

  return router;
};