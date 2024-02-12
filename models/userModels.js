const db = require("../database");
const getUsers = () => {
  return db.query("select firstname,lastname,email,city,language from users");
};

const addUser = (
  firstname,
  lastname,
  email,
  city,
  language,
  hashedPassword
) => {
  return db.query(
    "insert into users (firstname,lastname,email,city,language,hashedPassword) values (?,?,?,?,?,?)",
    [firstname, lastname, email, city, language, hashedPassword]
  );
};
  getUserByEmail= (value) => {
    return this.database.query("select * from users where email = ?", [value]);
  };
module.exports = {
  getUsers,
  addUser,
};
