import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  console.log(message)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)

    try {
      const response = await axios.post('http://localhost:5000/forget', { email });
      setMessage(response.data.message);

    } catch (error) {
      setMessage('Error sending password reset email.');
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
