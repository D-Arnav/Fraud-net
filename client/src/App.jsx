import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Nothing")

  const handleClick = () => {
    fetch('http://localhost:8000/hello')
      .then(response => response.json())
      .then(data => setMessage(JSON.stringify(data)))
  };

  return (
    <>
      <div>
      <button onClick={handleClick}>
      Click to get message from API
      </button>
      <p>
        Message from API: {message}
      </p>
      </div>
    </>
  )
}

export default App