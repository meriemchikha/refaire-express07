const userController = require("./controllers/userController");
const movieHandlers = require("./middlewares/movieHandlers");
const express = require("express");
const { hashPassword, verifyPassword, verifyToken }  = require("./middlewares/hashPassword");
 
const router = express.Router();


// route users
 
router.get("/users", userController.getUsers);
router.post("/users", hashPassword, userController.addUser);
router.post(
  "/api/login",
  hashPassword.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
); 

// route movies
router.get("/api/movies", movieHandlers.getMovies);
router.get("/api/movies/:id", movieHandlers.getMovieById);
router.post("/api/movies" ,movieHandlers.postMovie);
router.put("/api/movies/:id", movieHandlers.updateMovie);
router.delete("/api/movies/:id", movieHandlers.deleteMovie);



module.exports = router;
