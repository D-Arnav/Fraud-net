import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:8000/hello');
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
        setMessage('Failed to load message.');
      }
    };

    fetchMessage();
  }, []);

  return (
        <>
        <p>
          {message}
        </p>
        </>
  );
}

export default App;