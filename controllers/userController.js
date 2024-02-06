const userModels = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const [users] = await userModels.getUsers();
    console.log("users :>> ", users);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, city, language, hashedPassword } =
      req.body;

    const [results] = await userModels.addUser(
      firstname,
      lastname,
      email,
      city,
      language,
      hashedPassword
    );
    if (!results.affectedRows) {
      res.send("erreur lors de l'enregistrement de user ");
    } else {
      res.send("created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getUsers,
  addUser,
};
