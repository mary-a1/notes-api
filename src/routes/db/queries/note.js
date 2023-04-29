
const getUserNotes = function(db, user_id) {
  const queryParams = [user_id];
  const queryString = `SELECT notes.id, notes.text, notes.created_at FROM notes
  WHERE user_id = $1 ORDER BY created_at DESC;`;
  return db.query(queryString, queryParams);
};

const getNotesById = function(db, note_id) {
  const queryParams = [note_id];
  const queryString = `SELECT notes.id, notes.text, notes.created_at FROM notes 
  WHERE id = $1;`;
  return db.query(queryString, queryParams);
};

const addNote = function(db, noteInfo) {
  const queryParams = [noteInfo.user_id, noteInfo.text];
  const queryString = `
  INSERT INTO notes (user_id, text) 
  VALUES ($1, $2) RETURNING *`;
  return db.query(queryString, queryParams);
};

const updateNote = function(db, note_id, note_text) {
  const queryParams = [note_id, note_text];
  const queryString = `UPDATE notes SET
    text = $2
    WHERE id = $1`;
  return db.query(queryString, queryParams);
};

const deleteNote = function(db, noteId) {
  const queryParams = [noteId];
  const queryString = `DELETE FROM notes WHERE id = $1`;
  return db.query(queryString, queryParams);
};

const shareNote = function(db, noteId, user_id) {
  const queryParamsOne = [noteId];
  // get the content of the notesId (first query)
  const queryStringOne = `SELECT notes.id, notes.text, notes.created_at FROM notes WHERE id = $1`;
  return db.query(queryStringOne, queryParamsOne)
    .then ((result) => {
       // insert into notes user_id, noteContent (.then second query)
      console.log("This is the result ", result)
      const text = result.rows[0].text
      const queryParamsTwo = [user_id, text]
      const queryStringTwo = `INSERT INTO notes (user_id, text)  VALUES ($1, $2) RETURNING *`;
      return db.query(queryStringTwo, queryParamsTwo);
    
    });
};

module.exports = { getUserNotes, getNotesById, addNote, updateNote, deleteNote, shareNote };
