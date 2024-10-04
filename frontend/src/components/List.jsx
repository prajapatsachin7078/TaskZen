import axios from 'axios';
import { FaTrashAlt, FaCheckCircle, FaExclamationCircle, FaFlag,} from 'react-icons/fa';
import { toast } from 'react-toastify';



function List({ todos, getTodos }) {
  const handleDelete = (taskId) => {
    axios.delete("http://localhost:3000/todos", {
      data: { taskId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })  
      .then(res => {
        toast.success(res.data.message);
        getTodos(res.data.todos);
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const toggleComplete = (taskId) => {
    axios.put("http://localhost:3000/todos", { taskId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (res.data.status) {
          toast.success(res.data.message);
        }
        getTodos(res.data.list);
      })
      .catch(err => toast.error(err.message));
  };

  return (
    
    <div className="my-4 border-gray-300">
      <ul className="list-disc w-full max-h-80 p-4 mt-4 overflow-y-auto">
        {
          todos && todos.map((todo, index) => (
            <li key={index} className={`flex justify-between items-center mb-2 p-2 rounded-md ${todo.priority === 'High' ? 'bg-red-300' : todo.priority === 'Medium' ? 'bg-yellow-300' : 'bg-green-300'}`}>
              <div className="flex items-center space-x-2">
                <span
                  onClick={() => toggleComplete(todo._id)}
                  className={`cursor-pointer text-lg ${todo.isCompleted ? "text-green-600" : "text-gray-500"}`}
                >
                  {todo.isCompleted ? <FaCheckCircle /> : <FaExclamationCircle />}
                </span>

                <span className={`flex-grow ${todo.isCompleted ? "line-through" : ""}`}>{todo.task}</span>
                
              </div>
              <div className=''>

                {todo.priority === 'High' && <FaFlag className="text-red-500" />}
                {todo.priority === 'Medium' && <FaFlag className="text-yellow-500" />}
                {todo.priority === 'Low' && <FaFlag className="text-green-500" />}
              </div>
              <div className="flex space-x-2">
                <span onClick={() => { handleDelete(todo._id) }} className="text-lg cursor-pointer text-red-600 hover:text-red-800">
                  <FaTrashAlt />
                </span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default List;
