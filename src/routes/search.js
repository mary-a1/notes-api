const router = require("express").Router();
const {getSearchNotes} = require('./db/queries/search');

module.exports = (db) => {
  router.get("", (req, res) => {
    const keyword = req.query.q
    const user_id = req.signedCookies.name;
    getSearchNotes(db,user_id, keyword)
      .then((note) => {
        console.log("This is the notes", note)
        res.send(note.rows);
      });
  });

  return router;
};
