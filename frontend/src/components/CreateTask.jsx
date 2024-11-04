import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BACKEND_API_URI } from '../util/uri';

function CreateTask({ getTodos, closeModal }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('My Day');
  const [priority, setPriority] = useState('Low');

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      task: {
        task,
        category,
        priority, // Include priority with the task data
      }
    };

    try {
      const response = await axios.post(`${BACKEND_API_URI}/todos`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Task Created Successfully!");
      setTask("");
      setCategory("My Day");
      setPriority("Low"); // Reset priority
      const updatedTodos = response.data.todos;
      getTodos(updatedTodos);
      closeModal(); // Close modal after creating task
    } catch (error) {
      toast.error("Error adding task: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={task}
        className="border border-gray-300 rounded-md px-2 mb-4 w-full"
        onChange={handleInputChange}
        required
      />
      <select
        className="border border-gray-300 rounded-md px-2 mb-4 w-full"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="My Day">My Day</option>
        <option value="Important">Important</option>
        <option value="Planned">Planned</option>
        <option value="Assigned to me">Assigned to me</option>
        <option value="Grocery">Grocery</option>
      </select>
      <select
        className="border border-gray-300 rounded-md px-2 mb-4 w-full"
        value={priority}
        onChange={handlePriorityChange}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      {/* Flex container for buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default CreateTask;
