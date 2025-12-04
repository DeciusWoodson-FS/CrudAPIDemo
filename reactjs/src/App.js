import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getStudents();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const getStudents = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/students`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setStudents(data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Students:</h1>
        <ul>
          <li>Students</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
