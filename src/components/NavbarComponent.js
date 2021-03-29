import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarComponent() {
  return (
    <div className='navbar'>
      <ul>
        <li>Must-Watch</li>
        <li>
          <Link to='/'>
            <button className='home-button' classtype='button'>
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to='/user'>
            <button className='profile-button'>Profile</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
