const router = require("express").Router();
const {getSearchNotes} = require('../db/queries/search');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.signedCookies.name;
    getSearchNotes(db, )
      .then((note) => {
        res.send(note.rows);
      });
  });

  return router;
};
