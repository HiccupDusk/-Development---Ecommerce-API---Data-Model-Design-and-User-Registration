// SETUP DEPENDENCIES-----------------------------------------------------------------------------
const express = require("express");
const router = express.Router();

//SETUP MODULES-----------------------------------------------------------------------------
const auth = require("../auth");
const UserController = require("../controllers/userControllers");

//Registration for user-----------------------------------------------------------------------------
//http://localhost:4000/api/users/register
router.post("/register", (req, res) =>{
	UserController.registerUser(req.body).then(result => res.send(result));
})

//User Authentication(login)-----------------------------------------------------------------------------
router.post("/login", (req, res) => {
	UserController.loginUser(req.body).then(result => res.send(result));
});



module.exports = router;