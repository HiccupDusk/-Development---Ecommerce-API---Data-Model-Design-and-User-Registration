const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: [true, "First name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"]
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile no. is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	items: [
		{
			productsId: {
				type: String,
				required: [true, "product ID is required"]
			},
			boughtOn: {
				type: Date,
				default: new Date()
			},
			status: {
				type: String,
				default: "bought"
			}
		}

	]



})

module.exports = mongoose.model("User", userSchema);










