const getUserByEmail = function(db, email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  const queryParams = [email];
  return db.query(queryString, queryParams);
};

const addUser = function(db, userInfo) {
  const { email, password } = userInfo;
  const queryParams = [email, password ];
  const queryString = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id'
  return db.query(queryString, queryParams);
};


module.exports = { getUserByEmail, addUser };
