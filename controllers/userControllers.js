// MODULES -----------------------------------------------------------------------------
const User = require("../models/User");
const bcrypt = require('bcrypt');
const auth = require("../auth");

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


