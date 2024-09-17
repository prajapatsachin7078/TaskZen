const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp');

// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require : true,
        unique: true // Ensures that each username is unique
    },
    password:{
        type: String,
        require: true
    }
});

const TodoSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true, // Task description is required
        trim: true // Removes extra spaces from the string
    },
    isCompleted: {
        type: Boolean,
        default: false // Default value is false, meaning the task is not completed
    },
    dueDate: {
        type: Date,
        default: null // Optional due date for the task
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Store the user's ObjectId
        required: true,  // Ensure that every todo is associated with a user
        ref: 'User'  // This references the User model (though we are not enforcing relationships)
    }
}, {
    timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}