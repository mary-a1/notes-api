
const getUserNotes = function(db, user_id) {
  const queryParams = [user_id];
  const queryString = `SELECT journals.*, users.name FROM journals JOIN users ON users.id = user_id
  WHERE user_id = $1 ORDER BY created_at DESC;`;
  return db.query(queryString, queryParams);
};

const getNotesById = function(db, note_id) {
  const queryParams = [note_id];
  const queryString = `;`;
  return db.query(queryString, queryParams);
};

const addNote = function(db, noteInfo) {
  const queryParams = [noteInfo.user_id, noteInfo.text];
  const queryString = `
  INSERT INTO journals (user_id, text) 
  VALUES ($1, $2) RETURNING *`;
  return db.query(queryString, queryParams);
};

const updateNote = function(db, noteId, noteContent) {
  const queryParams = [];
  const queryString = `UPDATE blogs SET
    title = $1,
    image_url = $2,
    content = $3,
    category_id = $4
    WHERE id = $5`;
  return db.query(queryString, queryParams);
};

const deleteNote = function(db, noteId) {
  const queryParams = [noteId];
  const queryString = `DELETE FROM journals WHERE id = $1`;
  return db.query(queryString, queryParams);
};

const shareNote = function(db, noteId, user_id) {
  const queryParams = [noteId];
  // get the content of the notesId (first query)
  
  const queryString = `INSERT INTO notes`;
  return db.query(queryStringOne, queryParamsOne)
    .then (() => {
      return db.query(queryStringTwo, queryParamsTwo);
      // insert into notes user_id, noteContent (.then second query)
    });
};

module.exports = { getUserNotes, getNotesById, addNote, updateNote, deleteNote, shareNote };
