# TaskZen

TaskZen is a user-friendly task management application designed to help you organize and prioritize your daily tasks efficiently. With a clean and intuitive interface, TaskZen allows users to create, update, and categorize their tasks while keeping track of priorities and deadlines.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure sign-up and login process.
- **Task Management**: Create, read, update, and delete tasks.
- **Categorization**: Organize tasks into categories like "My Day," "Important," "Planned," etc.
- **Priority Levels**: Assign priority levels (Low, Medium, High) to tasks.
- **Responsive Design**: Fully functional on both desktop and mobile devices.
- **Notifications**: Receive alerts for important tasks.

## Installation

To get started with TaskZen, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/prajapatsachin7078/taskzen.git
   cd taskzen
   ```

2. **Install dependencies**:

   For the frontend:

   ```bash
   cd client
   npm install
   ```

   For the backend:

   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory of the server with the following variables:

   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:

   Start the backend server:

   ```bash
   cd server
   npm start
   ```

   Start the frontend application:

   ```bash
   cd client
   npm start
   ```

## Usage

Once the application is running, navigate to `http://localhost:3000` in your web browser. You can sign up for a new account or log in if you already have an account.

### Creating Tasks

1. Select a category from the dropdown.
2. Click the "New Task" button.
3. Fill in the task details, including the task description, category, and priority.
4. Click "Add" to create your task.

### Managing Tasks

- Click on a task to edit or delete it.
- Use the category filter to view tasks in different categories.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to report bugs, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For inquiries or feedback, you can reach me at [sachin](mailto:prajapatsachin7078@gmail.com).

---

Thank you for checking out TaskZen! Happy task managing! 🎉
```