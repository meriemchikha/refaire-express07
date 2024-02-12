const userModels = require("../models/userModels");

const getUsers = async (req, res) => {
  try {
    const [users] = await userModels.getUsers();
    console.log("users :>> ", users);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send("check your email and password");
    } else {
      const [user] = await userModels.getUserByEmail(email);
      if (!user.length) {
        res.status(404).send("Not found");
      }
      const isMatch = await argon2.verify(user[0].hashedPassword, password);
      if (!isMatch) {
        res.status(401).send("mot de pass ou email erronné");
      } else {
        const token = jwt.sign({ user_id: user[0].id }, "privateKey", {
          expiresIn: "1h",
        });

        res
          .status(200)
          .json({ message: `welcome back ${user[0].firstname} !`, token });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }};

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
  getUserByEmail,
};
