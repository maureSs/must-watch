import React, { useState, useEffect } from 'react';
import Header from './Header';
import Shows from './Shows';
import db from '../firebase';
import firebase from 'firebase';
import popcorn from '../images/popcorn.jpg';
import { useAuth } from '../user/AuthContext';

function MainContainer() {
  const [showTheForm, setShowTheForm] = useState(false);
  const { currentUser } = useAuth();
  /* I use "shows" for both movies and tv shows */
  const [shows, setShows] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('shows')
      .where('userId', '==', currentUser.uid)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setShows(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            show: doc.data().show,
            userId: doc.data().userId,
          }))
        );
      });
  }, [currentUser]);

  // Add a Movie or Tv Show
  const addShow = (event) => {
    event.preventDefault();

    db.collection('shows').add({
      show: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: currentUser.uid,
    });

    setInput('');
  };

  return (
    <div className='container'>
      <Header
        onAdd={() => setShowTheForm(!showTheForm)}
        showAdd={showTheForm}
      />
      {showTheForm && (
        <form className='add-form'>
          <div className='form-control'>
            <input
              style={{ cursor: 'text' }}
              type='text'
              placeholder='Add a Movie or Tv Show'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              style={{ backgroundColor: 'black', color: 'white' }}
              disabled={!input}
              type='submit'
              value='Save'
              onClick={addShow}
            />
          </div>
        </form>
      )}
      {shows.length < 1 ? (
        <img src={popcorn} alt='popcornShow' className='image' />
      ) : (
        ''
      )}
      <div className='no-tvshows'>
        {shows.length > 0 ? (
          <Shows shows={shows} />
        ) : (
          'You have no movies or tv shows on the list'
        )}
      </div>
    </div>
  );
}

export default MainContainer;
