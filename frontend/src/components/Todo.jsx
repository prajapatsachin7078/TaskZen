import axios from 'axios';
import { useEffect, useState } from 'react'
import List from "./List";
import CreateTask from "./CreateTask";
function Todo() {
    const [category, setCategory] = useState('My Day'); // State for selected category
    const [todos, setTodos] = useState([]);
  
    const handleCategoryChange = (e) => {
      let selectedCategory = e.target.value;
      setCategory(selectedCategory);
      const token = localStorage.getItem("token");  
      axios.get(`http://localhost:3000/todos/${selectedCategory}`,
        {
          headers: {
            Authorization: `Bearer ${token}` // Send token in Authorization header
          }
        })
        .then(response => {
          console.log(response.data);
          const {todos} = response.data;
          setTodos(todos);
        })
        .catch(error => {
          console.log("Error:", error.message);
        });
  };
     // Fetch initial tasks from the backend
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");      
        const response = await axios.get("http://localhost:3000/todos", {
          headers: {
            Authorization: `Bearer ${token}` // Send token in Authorization header
          }
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);
    const updateTodos = (updatedTodos) => {
      setTodos(updatedTodos);
    }
    return (
      <div className='border h-[90vh] rounded-md'>
        <div className="container mx-auto p-4">
          <CreateTask getTodos={updateTodos}/>
          <div className='border-y py-2 mt-3 w-[100%] flex justify-between'>
            <span className='content-center text-white'>Category:   </span>
          <select 
              className="border text-sm border-gray-300 rounded-md px-1 py-1  w-[25%]" 
              value={category} // Bind category value to select input
              onChange={handleCategoryChange} // Handle category change
            >
               <option defaultChecked value="All">All</option>
              <option>My Day</option>
              <option>Important</option>
              <option>Planned</option>
              <option>Assigned to me</option>
              <option>Grocery</option>
            </select>
          </div>
          <List todos={todos} getTodos={updateTodos} />
        </div>
      </div>
    );
}

export default Todo