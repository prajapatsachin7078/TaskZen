import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'animate.css'; // Import Animate.css for text effects

const messages = [
  "Stay productive, stay positive! 🌟",
  "Break tasks into smaller steps. 📋",
  "Consistency is key to success. 🏆",
  "Focus on progress, not perfection. 🚀",
  "You are capable of amazing things! 🌈",
];

function Home({ isLoggedIn }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <h1 className="text-5xl font-extrabold mb-4 text-center text-indigo-800 animate__animated animate__fadeInDown">
        Welcome to TaskZen
      </h1>
      <p className="text-lg mb-2 text-center text-indigo-600 italic animate__animated animate__fadeInUp">
        *“Achieve clarity and peace in your tasks.”*
      </p>
      <p className="text-lg mb-8 text-center text-indigo-700 font-medium animate__animated animate__fadeIn">
        {messages[currentMessage]}
      </p>

      <div className="flex space-x-4 mb-6">
        <Link to="/signup">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-lg">
            Get Started
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            title: "Create Tasks",
            description: "Easily add new tasks and manage your to-do list with a simple interface.",
          },
          {
            title: "Organize Categories",
            description: "Categorize your tasks for better organization and easier tracking.",
          },
          {
            title: "Track Progress",
            description: "Monitor your completed tasks and stay motivated by seeing your progress.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-800">{feature.title}</h2>
            <p className="text-gray-600 text-center mb-4">{feature.description}</p>
            <button
              onClick={() => handleNavigation('/todo')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-auto py-4 bg-white shadow-md w-full">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} TaskZen. All Rights Reserved.</p>
          <Link to="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
