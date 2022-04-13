// SETUP DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");

//routes
const userRoutes = require("./routes/userRoutes");

//server
const app = express();


//Allows all resources/origins to access our backend application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({  extended:true }));

//http://localhost:4000/api/users
app.use("/api/users", userRoutes);

//Connect to our MongoDB connection
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.listen(process.env.PORT, () => {
	console.log(`API is now online on port ${process.env.PORT}`)
})