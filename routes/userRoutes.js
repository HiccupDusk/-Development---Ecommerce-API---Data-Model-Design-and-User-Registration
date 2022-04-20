// SETUP DEPENDENCIES-----------------------------------------------------------------------------
const express = require("express");
const router = express.Router();

//SETUP MODULES-----------------------------------------------------------------------------
const auth = require("../auth");
const UserController = require("../controllers/userControllers");

//USER REGISTRATION-----------------------------------------------------------------------------
//http://localhost:4000/api/users/register
router.post("/register", (req, res) =>{
	UserController.registerUser(req.body).then(result => res.send(result));
})

//USER AUTHENTICATION(login)-----------------------------------------------------------------------------
router.post("/login", (req, res) => {
	UserController.loginUser(req.body).then(result => res.send(result));
});

//CHANGE USER ADMIN-----------------------------------------------------------------------------
router.post("/updateUserAdmin/:userId", auth.verify, (req, res) => {

	const userData = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};
	if (userData.isAdmin){
		UserController.updateUserAdmin(req.params.userId, req.body).then(result => res.send(result))
	} else { res.send (false)}
});

// CREATING ORDER AS A USER FOR CHECKOUT -----------------------------------------------------------------------------
router.post("/createOrder", auth.verify, (req, res) => {
	const data = {
		userId : auth.decode(req.headers.authorization).id,
		productId : req.body.productId
	}

	UserController.createOrder(data).then(result => res.send(result));
})

// RETRIEVE AUTHETICATED USER'S ORDER-----------------------------------------------------------------------------
router.get("/retrieveOrders", auth.verify, (req, res) => {

	const data = auth.decode(req.headers.authorization)

	UserController.retrieveOrders(data.id).then(result => res.send(result));
})

// RETRIEVE ALL ORDERS (ADMIN))-----------------------------------------------------------------------------
router.get("/retrieveAllOrders", auth.verify, (req, res) => {

	const userData = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};
	
	if (userData.isAdmin){
		UserController.retrieveAllOrders().then(result => res.send(result))
	} else { res.send (false)}
})

//RETRIEVE ALL USERS INFO (ADMIN) ))-----------------------------------------------------------------------------
router.get("/getAllUser", auth.verify, (req, res) => {

	const userData = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};
	if (userData.isAdmin){
		UserController.getAllUser().then(result => res.send(result))
	} else { res.send (false)}
})


module.exports = router;
