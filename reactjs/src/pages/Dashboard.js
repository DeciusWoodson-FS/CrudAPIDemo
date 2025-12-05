import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";

// Function and error handling
function Dashboard() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    class: "",
  });

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

  const createStudent = async () => {
    try {
      await fetch(`${API_BASE}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => getStudents());
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createStudent();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Students:</h1>
        <Link to="/">Home</Link>

        <ul>
          {students &&
            students.map((student) => {
              if (!student) return null;

              return (
                <li key={student._id}>
                  <Link to={`/students/${student._id}`}>{student.name}</Link>
                </li>
              );
            })}
        </ul>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input type="submit" value="Submit" />
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Class:
            <input
              type="text"
              name="class"
              value={values.class}
              onChange={handleInputChanges}
            />
          </label>
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
