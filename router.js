const express = require("express");
const { hashPassword, verifyPassword, verifyToken }  = require("./middlewares/hashPassword");
const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const movieHandlers = require("./middlewares/movieHandlers");
const userHandlers = require("./middlewares/userHandlers");


const router = express.Router();
// les routes publiques
 
router.get("/api/movies", movieControllers.getMovies);
router.get("/api/movies/:id", movieControllers.getMovieById);
router.get("/api/users", userControllers.getUsers);
router.get("/api/users/:id", userControllers.getUserByEmail);
router.post("/api/users", userHandlers, hashPassword, userControllers.postUser);
router.post(
  "/api/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
// les routes à protéger
router.post("/api/movies", verifyToken, movieControllers.postMovie);
router.put("/api/movies/:id", movieHandlers, movieControllers.putMovie);
router.delete("/api/movies/:id", movieControllers.deleteMovie);
router.put("/api/users/:id", userHandlers, hashPassword, userControllers.putUser);
router.delete("/api/users/:id", userControllers.deleteUser);




module.exports = router;
