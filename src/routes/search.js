const router = require("express").Router();
const { getSearchNotes } = require('../db/queries/search');

module.exports = (db) => {
  router.get("", (req, res) => {
    const user_id = req.signedCookies.name;
    if (!user_id) {
      return res.status(400).send("It seems you're trying to update a note withtout logging in. Please log in first.");
    }
    const keyword = req.query.q;
    getSearchNotes(db, user_id, keyword)
      .then((note) => {
        res.send(note.rows);
      });
  });

  return router;
};
