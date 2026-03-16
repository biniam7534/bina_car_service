import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:4000/employees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        setError('Failed to load employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Network error. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the Car Service Management System</p>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/add-employee">Add Employee</Link></li>
        </ul>
      </nav>

      <h3>All Employees ({employees.length})</h3>
      {loading && <p>Loading employees...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          {employees.length === 0 ? (
            <p>No employees found. <Link to="/add-employee">Add your first employee</Link></p>
          ) : (
            <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
              {employees.map((employee, index) => (
                <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <strong>{employee.first_name} {employee.last_name}</strong><br />
                  Email: {employee.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;