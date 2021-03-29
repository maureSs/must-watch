import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <div className='user-container'>
      <div>
        <h2>Sign Up</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <form className='user-container-things' onSubmit={handleSubmit}>
          <label className='email-style'>Email</label>
          <br />
          <input type='email' ref={emailRef} required />
          <br />
          <label className='password-style'>Password</label>
          <br />
          <input type='password' ref={passwordRef} required />
          <br />
          <label className='password-confirmation-style'>
            Password Confirmation
          </label>
          <br />
          <input type='password' ref={passwordConfirmRef} required />
          <br />
          <button disabled={loading} type='submit' style={{ marginTop: '1%' }}>
            Sign Up
          </button>
        </form>
      </div>
      <div>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </div>
  );
}
