import React, { useState } from 'react';

function AddEmployee(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:4000/add-employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Employee added successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(result.error || result.detail || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Add employee error:', error);
      setMessage('Network error. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Add employee</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>First name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '250px', padding: '5px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Last name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: '250px', padding: '5px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '250px', padding: '5px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '250px', padding: '5px', fontSize: '16px' }}
            required
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '5px 15px', fontSize: '16px' }}>
          Submit
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('successfully') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddEmployee;
