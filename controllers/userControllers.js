// MODULES -----------------------------------------------------------------------------
const User = require("../models/User");
const bcrypt = require('bcrypt');
const auth = require("../auth");
const Products = require("../models/Products");

// REGISTER USER-----------------------------------------------------------------------------
module.exports.registerUser = (reqBody) => {

	//Creates a new User Object
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		mobileNo: reqBody.mobileNo,
		email: reqBody.email,

		password: bcrypt.hashSync(reqBody.password, 10)
	})

	
	return newUser.save().then((user, error) => {
		//User registration failed
		if(error) {
			return false;
		} else {
			//User Registration is success
			return true
		}
	})

}

// AUTHETICATE USER-----------------------------------------------------------------------------
module.exports.loginUser = (reqBody) => {
	//findOne it will returns the first record in the collection that matches the search criteria

	return User.findOne({ email: reqBody.email }).then(result => {
		//User does not exist
		if(result == null){
			return false;
		} else {
			//User exists

			//The "compareSync" method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and returns "true" or "false".
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

			//if the password match
			if(isPasswordCorrect){
				//Generate an access token
				return { accessToken : auth.createAccessToken(result.toObject())}
			} else {
				//Password does not match
				return false;
			}

		};
	});
};

// CHANGE USER'S ADMIN (ADMIN)-----------------------------------------------------------------------------
module.exports.updateUserAdmin = (userId, reqBody) => {
	let updatedUserAdmin = {
		isAdmin: reqBody.isAdmin
	}
	return User.findByIdAndUpdate(userId, updatedUserAdmin).then((result, error) => {
		//course not updated
		if(error) {
			return false;
		}else {
			//course updated successfully
			return true;
		}
	})
}

// CREATING ORDER AS A USER -----------------------------------------------------------------------------
module.exports.createOrder = async (data) => {
	//Add the courseId to the enrollments array of the user

	let isUserUpdated = await User.findById(data.userId).then( user => {
		//push the course Id to enrollments property
		user.items.push({ productsId: data.productId});
		//save
		return user.save().then((user, error) => {
			if(error) {
				return false;
			}else {
				return true
			}
		})
	});


	let isProductUpdated = await Products.findById(data.productId).then(product => {
		//add the userId in the course's database(enrollees)
		product.customer.push({ userId: data.userId });
		return product.save().then((product, error) => {
			if(error) {
				return false;
			}else {
				return true;
			}
		})
	});


	//Validation
	if(isUserUpdated && isProductUpdated){
		//user enrollment successful
		return true;
	}else {
		//user enrollment failed
		return false;
	}

}

// RETRIEVE AUTHETICATED USER'S ORDER-----------------------------------------------------------------------------
module.exports.retrieveOrders = (data) => {
	return User.findById(data).then(result => {
		return result.items;
	}) 
}

// RETRIEVE ALL ORDERS (ADMIN))-----------------------------------------------------------------------------
module.exports.retrieveAllOrders = () => {
	return User.find({items:{$elemMatch:{status:true}}},{_id: 0, items: 1, firstName: 2}).then(result => {
		return result;
	}) 
}

//RETRIEVE ALL USERS INFO (ADMIN) ))-----------------------------------------------------------------------------
module.exports.getAllUser = () => {
	return User.find({}).then(result => {
		return result;
	}) 
}