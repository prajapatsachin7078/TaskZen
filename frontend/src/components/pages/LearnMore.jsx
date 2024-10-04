import React from 'react';

const LearnMore = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
            <h1 className="text-4xl font-bold mb-4">Learn More About Our Todo App</h1>
            <p className="text-lg text-center mb-6 max-w-2xl">
                Our Todo App is designed to help you manage your tasks efficiently.
                You can create tasks, organize them into categories, and track your progress easily.
            </p>
            <p className="text-lg text-center mb-6 max-w-2xl">
                Whether you're planning your day, focusing on important tasks, or
                managing your grocery list, our app has got you covered.
            </p>
            <p className="text-lg text-center mb-6 max-w-2xl">
                Get started today and make your task management a breeze!
            </p>
        </div>
    );
};

export default LearnMore;
