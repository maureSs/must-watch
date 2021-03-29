import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <div className='user-container'>
      <div>
        <h2>Password Reset</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        {message && <Alert variant='success'>{message}</Alert>}
        <form className='user-container-things' onSubmit={handleSubmit}>
          <label className='email-style'>Email</label>
          <br />
          <input type='email' ref={emailRef} required />
          <br />
          <button style={{ marginTop: '1%' }} disabled={loading} type='submit'>
            Reset Password
          </button>
        </form>
        <div className='w-100 text-center mt-3'>
          <Link to='/login'>Login</Link>
        </div>
      </div>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
}
