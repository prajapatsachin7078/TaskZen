import axios from 'axios';
import React, { useState } from 'react'

function CreateTask({getTodos}) {
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('My Day'); // State for selected category

    const handleInputChange = (e) => {
        let text = e.target.value;
        setTask(text);
      };
    
      const handleCategoryChange = (e) => {
        let selectedCategory = e.target.value;
        setCategory(selectedCategory);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const data = {
          task: {
            task,
            category
          } // Include category with the task data
        };
        try {
          const response = await axios.post("http://localhost:3000/todos", data,{
            headers: {
              Authorization: `Bearer ${token}` // Send token in Authorization header
            }
          });
          alert(response.data.message);
          // Clear the input field and reset category
          setTask("");
          setCategory("My Day");
          const updatedTodos = response.data.todos;
          getTodos(updatedTodos);
        } catch (error) {
          alert("Error adding task: ", error);
        }
      };
  return (
    <div className="md:flex  sm-flex justify-center">
          <input 
            type="text" 
            placeholder="Add new task" 
            value={task}
            className="border border-gray-300 rounded-md px-2 max-w-7xl" 
            onChange={handleInputChange}
          />
          <select 
            className="border border-gray-300 rounded-md px-2 sm:min-w-2 mx-2" 
            value={category} // Bind category value to select input
            onChange={handleCategoryChange} // Handle category change
          >
            <option defaultChecked value="My Day">select</option>
            <option>My Day</option>
            <option>Important</option>
            <option>Planned</option>
            <option>Assigned to me</option>
            <option>Grocery</option>
          </select>
          <button 
            className="bg-green-700 text-white ml-2 px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
  )
}

export default CreateTask