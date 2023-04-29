const getSearchNotes = function(db, user_id, keyword) {
  // If searching by note keywords
  const queryParams = [user_id,keyword];
  const queryString = `SELECT * FROM notes WHERE user_id = $1 AND text LIKE '%' || $2 || '%';`;

  return db.query(queryString, queryParams);
};

module.exports = { getSearchNotes };