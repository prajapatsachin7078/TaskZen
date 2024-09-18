const { Router } = require("express");
const { User } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = Router();

// Load environment variables from .env file
require('dotenv').config();

// Access environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);  // Parse salt rounds as an integer
// Sign up route
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields (name, email, and password) are required!" });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered. Please use a different one." });
        }
        // Generating the salt using salt-rounds
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("hashed with salt: " ,hashedPassword);
        
        // Create and save the new user
        const user = new User({ name, email, password: hashedPassword });
        const savedUser = await user.save();

        res.json({ message: "User created successfully!", user: savedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "User couldn't be created... Error!", error: err });
    }
});

// Sign in route
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "You're not registered. Sign up first!" });
        }

        // Compare the hashed password with the users password..
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Wrong password..." });
        }

        // Generate a JWT token using the secret from .env
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Send the token in a custom header and the response body
        res.status(200)
            .json({ message: "Login successful" ,token,userName: user.name});
    } catch (error) {
        
        res.status(500).json({ message: "Error. Try again!", error });
    }
});

module.exports = userRouter;
