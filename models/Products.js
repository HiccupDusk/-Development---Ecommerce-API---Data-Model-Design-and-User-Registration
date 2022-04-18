const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Course is required"]
	},

	description: {
		type: String,
		required: [true, "Description is required"]
	},

	price: {
		type: Number,
		required: [true, "Price is required"]
	},

	isActive: {
		type: Boolean,
		default: true
	},

	createdOn: {
		type: Date,
		default: new Date()
	},
    customer: [
		{
			userId: {
				type: String,
				required: [true, "UserId is required"]
			},
			boughtOn: {
				type: Date,
				default: new Date()
			}
		}


	]

})


module.exports = mongoose.model("Products", ProductsSchema);