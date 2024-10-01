import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const messages = [
  "Stay productive, stay positive!",
  "Break tasks into smaller steps.",
  "Consistency is key to success.",
  "Focus on progress, not perfection.",
  "You are capable of amazing things!",
];

function Home() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to the Todo App</h1>
      <p className="text-lg mb-8">{messages[currentMessage]} <span className='animate-bounce'>📓</span></p>
      
      <div className="flex space-x-4">
        <Link to="/signup">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
            Sign Up
          </button>
        </Link>
        <Link to="/signin">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
