import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';

export default function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <>
      <NavbarComponent />
      <div className='user-container'>
        <div className='user-container-things'>
          <h2>Profile</h2>
          <br />
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <br />
          <Link to='/update-profile' style={{ color: '#5197DD' }}>
            Update Profile
          </Link>
          <br />
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </>
  );
}
