// MODULES -----------------------------------------------------------------------------
const Products = require("../models/Products");
const bcrypt = require('bcrypt');
const auth = require("../auth");

// GET ALL PROCDUCTS -----------------------------------------------------------------------------
module.exports.getAllActiveProducts = () => {
	return Products.find({ isActive: true }).then(result => {
		return result;
	}) 
}

// GET SINGLE PROCDUCTS -----------------------------------------------------------------------------
module.exports.getSingleProducts = (productId) => {
	return Products.findById(productId).then(result => {
		return result;
	}) 
}


// CREATE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
 module.exports.createProduct = (reqBody) => {

	let newProducts = new Products ({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
	})
	return newProducts.save().then((Products, error) => {

		if(error) {
			return false;
		} else {
			//Course Creation successful
			return true;
		}
	})
 }

 // UPDATE A PRODUCT INFO (ADMIN ONLY) -----------------------------------------------------------------------------
 module.exports.udpateProduct = (idProduct, reqBody) => {

	let udpatedProduct = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
	}
	return Products.findByIdAndUpdate(idProduct, udpatedProduct).then((result, error) => {
		//course not updated
		if(error) {
			return false;
		}else {
			//course updated successfully
			return true;
		}
	})
}

//ARCHIVE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
module.exports.archiveProduct = (reqParams) => {

	let updateActiveField = {
		isActive : false
	}

	return Products.findByIdAndUpdate(reqParams, updateActiveField).then((result, error) => {
		if(error) {
			return false;
		} else {
			return true;
		}
	})
}

//UNARCHIVE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
module.exports.unarchiveProduct = (reqParams) => {

	let updateActiveField = {
		isActive : true
	}

	return Products.findByIdAndUpdate(reqParams, updateActiveField).then((result, error) => {
		if(error) {
			return false;
		} else {
			return true;
		}
	})
}
