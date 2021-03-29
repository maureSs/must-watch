import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <div className='user-container'>
      <div>
        <h2>Log In</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <form className='user-container-things' onSubmit={handleSubmit}>
          <label className='email-style'>Email</label>
          <input type='email' ref={emailRef} required />
          <br />
          <label className='password-style'>Password</label>
          <input type='password' ref={passwordRef} required />
          <br />
          <button disabled={loading} type='submit' style={{ marginTop: '1%' }}>
            Log In
          </button>
        </form>
        <div>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
      </div>
      <div>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
}
