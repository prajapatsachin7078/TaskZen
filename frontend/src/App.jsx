import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/pages/Home';
import Navbar from './components/shared/Navbar';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Todo from './components/pages/Todo';
import LearnMore from './components/pages/LearnMore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    // Ensuring the state is synced with localStorage on mount
    const storedUserName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    setUserName(storedUserName || "");
    setLoggedIn(!!token);

  }, []);

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
      <ToastContainer />
      <Routes>
        <Route
          path="/signin"
          element={<SignIn
            handleLoggedIn={handleLoggedIn}
            handleUserNameUpdate={handleUserNameUpdate}
          />} />
        <Route path="/signup" element={isLoggedIn ? <Todo /> : <SignUp />} />
        <Route path="/todos" element={isLoggedIn ? <Todo /> : <SignIn />} />
        <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} /> {/*Default route*/}
        <Route path='/learn-more' element={<LearnMore/>}/>
      </Routes>
    </div>
  );
}

export default App;
