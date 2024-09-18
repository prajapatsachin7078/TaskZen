/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
// import PropTypes from 'prop-types'

function SignIn(props) {
  const { handleLoggedIn, handleUserNameUpdate } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
      axios.post("http://localhost:3000/signin", {
        email,
        password,
      })
      .then((response)=>{   
        const { token, userName } = response.data;
        // Save the token and username in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        // Update state and props
        handleLoggedIn(true);
        handleUserNameUpdate(userName);
        // Navigate to the Todo component
        navigate("/todos");
      })
      .catch((error)=> {
        console.log("Error: " ,error);
        navigate("/signup");
        alert("Sign up first, You're not registered..");
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg p-8 bg-slate-300 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Sign In</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button 
            onClick={handleSignIn}
            type="submit" 
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

// SignIn.propTypes = {
//   handleLoggedIn: PropTypes.func.isRequired, // Define the prop type for handleLoggedIn
//   setUserName: PropTypes.func.isRequired  // Define the prop type for setUserName
// };

export default SignIn;  
