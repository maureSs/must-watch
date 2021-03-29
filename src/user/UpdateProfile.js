import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/user');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <NavbarComponent />
      <div className='user-container'>
        <div>
          <h2>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <form className='user-container-things' onSubmit={handleSubmit}>
            <label className='email-style'>Email</label>
            <br />
            <input
              type='email'
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
            <br />
            <label className='password-style'>Password</label>
            <br />
            <input
              type='password'
              ref={passwordRef}
              placeholder='Leave blank to keep the same'
            />
            <br />
            <label className='password-confirmation-style'>
              Password Confirmation
            </label>
            <br />
            <input
              type='password'
              ref={passwordConfirmRef}
              placeholder='Leave blank to keep the same'
            />
            <br />
            <button
              disabled={loading}
              type='submit'
              style={{ marginTop: '1%' }}
            >
              Update
            </button>
          </form>
        </div>
        <div>
          <Link to='/user'>Cancel</Link>
        </div>
      </div>
    </>
  );
}
