import Todo from './components/Todo';
import './App.css';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the state is synced with localStorage on mount
    const storedUserName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    setUserName(storedUserName || "");
    setLoggedIn(!!token);

  }, [navigate]);

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
    navigate("/signin"); // Redirect to SignIn page
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={onLogout} />
      <Routes>
        <Route path="/signin" element={<SignIn handleLoggedIn={handleLoggedIn} setUserName={handleUserNameUpdate} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todos" element={isLoggedIn ? <Todo /> : <SignIn />} />
        <Route path="/" element={isLoggedIn ? <Todo /> : <SignIn />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;
