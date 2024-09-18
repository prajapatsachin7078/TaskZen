import Todo from './components/Todo';
import './App.css';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  console.log("App.jsx")
  useEffect(() => {
    // Ensuring the state is synced with localStorage on mount
    const storedUserName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    setUserName(storedUserName || "");
    setLoggedIn(!!token);

  },[]);

  function handleLoggedIn(status) {
    setLoggedIn(status);
  }

  function handleUserNameUpdate(name) {
    setUserName(name);
  }

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setLoggedIn(false);
    setUserName("");
    navigate("/"); // Redirect to SignIn page
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={onLogout} />
      <Routes>
        <Route
          path="/signin" 
          element={<SignIn 
                  handleLoggedIn={handleLoggedIn} 
                  handleUserNameUpdate ={handleUserNameUpdate}
        />} />
        {console.log("App.js - handleLoggedIn:", handleLoggedIn)}
        {console.log("App.js - handleUserNameUpdate:", handleUserNameUpdate)}
        <Route path="/signup" element={isLoggedIn ? <Todo /> : <SignUp />} />
        <Route path="/todos" element={isLoggedIn ? <Todo /> : <SignIn />} />
        <Route path="/" element={isLoggedIn ? <Todo />:<Home/>} /> {/*Default route*/}
      </Routes>
    </div>
  );
}

export default App;
