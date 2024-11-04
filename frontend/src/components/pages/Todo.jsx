import axios from 'axios';
import { useEffect, useState } from 'react';
import List from '../List';
import CreateTask from '../CreateTask';
import Modal from 'react-modal';
import { BACKEND_API_URI } from '../../util/uri';

Modal.setAppElement('#root'); // Set the app element for accessibility

function Todo() {
  const [category, setCategory] = useState('All');
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };

  const sortTodosByPriority = (todos) => {
    return todos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    fetchTodos(selectedCategory);
  };

  const fetchTodos = async (selectedCategory) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BACKEND_API_URI}/todos/${selectedCategory}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const sortedTodos = sortTodosByPriority(response.data.todos);
      setTodos(sortedTodos);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // Fetch initial tasks from the backend
  useEffect(() => {
    fetchTodos(category);
  }, []);

  const updateTodos = (updatedTodos) => {
    const sortedUpdatedTodos = sortTodosByPriority(updatedTodos);
    setTodos(sortedUpdatedTodos);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '500px',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">My Todo List</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="w-2/3">
            <label className="block text-gray-700 mb-2 font-semibold">Select Category:</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="All">All</option>
              <option value="My Day">My Day</option>
              <option value="Important">Important</option>
              <option value="Planned">Planned</option>
              <option value="Assigned to me">Assigned to me</option>
              <option value="Grocery">Grocery</option>
            </select>
          </div>
          <button
            className="bg-indigo-600 text-white w-28 mt-8 h-10 rounded-md hover:bg-indigo-700 transition duration-300"
            onClick={openModal}
          >
            New Task
          </button>
        </div>

        <List todos={todos} getTodos={updateTodos} />

        {/* Modal for Creating a New Task */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Create New Task"
          style={customModalStyles} // Apply custom styles
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">Create New Task</h2>
          <CreateTask getTodos={updateTodos} closeModal={closeModal} />
          <button className="mt-4 bg-red-500 text-white rounded-md px-4 py-2" onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
}

export default Todo;
