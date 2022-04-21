// SETUP DEPENDENCIES-------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const router = express.Router();

//SETUP MODULES-------------------------------------------------------------------------------------------------------------------------
const auth = require("../auth");
const ProductControllers = require("../controllers/productControllers");

// GET ALL PROCDUCTS -----------------------------------------------------------------------------
router.get("/getAllActiveProducts", (req, res) =>{
	ProductControllers.getAllActiveProducts().then(result => res.send(result));
})

// GET SINGLE PROCDUCTS -----------------------------------------------------------------------------
router.get("/getSingleProduct/:productIds", (req, res) =>{
	ProductControllers.getSingleProducts(req.params.productIds).then(result => res.send(result));
})

// CREATE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
router.post("/createProduct/", auth.verify, (req, res) => {

	const userData = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};
	if (userData.isAdmin){
		ProductControllers.createProduct(req.body).then(result => res.send(result))
	} else { res.send (false)}

} );

// UPDATE A PRODUCT INFO (ADMIN ONLY) -----------------------------------------------------------------------------
router.post("/udpateProduct/:idProduct", auth.verify, (req, res) => {

	const userData = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};
	if (userData.isAdmin){
		ProductControllers.udpateProduct(req.params.idProduct, req.body).then(result => res.send(result))
	} else { res.send (false)}

} );

//ARCHIVE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
router.post("/archiveProduct/:idProduct", auth.verify, (req, res) => {

	const userData = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};
	if (userData.isAdmin){
		ProductControllers.archiveProduct(req.params.idProduct).then(result => res.send(result))
	} else { res.send (false)}

} );

//UNARCHIVE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
router.post("/unarchiveProduct/:idProduct", auth.verify, (req, res) => {

	const userData = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};
	if (userData.isAdmin){
		ProductControllers.unarchiveProduct(req.params.idProduct).then(result => res.send(result))
	} else { res.send (false)}

} );

module.exports = router;