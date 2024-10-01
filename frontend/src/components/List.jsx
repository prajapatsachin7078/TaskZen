import axios from 'axios';
function List({ todos,getTodos }) {
  // Delete handler
  const handleDelete=(taskId)=>{

      axios.delete("http://localhost:3000/todos", {
          data: { taskId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // Send token in Authorization header
          }
      })      
      .then(res=>{
          alert(res.data.message);
          getTodos(res.data.todos);
      })  
      .catch(err=>{
          alert(err.message);
      })
  }
  // Status handler
  const toggleComplete =(taskId)=>{
    axios.put("http://localhost:3000/todos",{
      taskId
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // Send token in Authorization header
      }
    }
  ).then(res=>{
      if(res.data.status){
        alert(res.data.message); 
      }
      getTodos(res.data.list)})
    .catch(err=>alert(err));
  }
  return (
  <div className="my-4  border-gray-300 ">
    <ul className="list-disc w-[100%] max-h-80 p-4  mt-4 overflow-y-auto">
      {
        todos && todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2 bg-blue-500 p-2 rounded-md">
            <div className="flex space-x-2">
              <span 
                onClick={() => toggleComplete(todo._id)} // Call a function to toggle the todo state
                className={`border rounded-full w-6 border-black cursor-pointer text-lg ${todo.isCompleted?"bg-green-500":""}`}>
                
              </span>

              <span className={` ${todo.isCompleted?"line-through":""}`}>{todo.task}</span>
            </div>
            <div className="flex space-x-2">
              <span onClick={()=>{handleDelete(todo._id)}} className="text-lg cursor-pointer">❌</span>
            </div>
          </li>
        ))
      }
    </ul>
    </div>
  );
}

export default List;
