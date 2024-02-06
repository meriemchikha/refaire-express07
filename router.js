const userController = require("./controllers/userController");
const express = require("express");
const hashPassword = require("./middlewares/hashPassword");

const router = express.Router();

// get users
console.log("je suis dans le router ");
router.get("/users", userController.getUsers);
router.post("/users", hashPassword, userController.addUser);

module.exports = router;
