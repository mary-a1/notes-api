const getSearchNotes = function(db, params) {
  // If searching by note keywords
  const queryParams = [`${params.toUpperCase()}%`];
  const queryString = `SELECT * FROM drugs WHERE name LIKE $1`;

  return db.query(queryString, queryParams);
};

module.exports = { getSearchNotes };