import React, { useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import db from '../firebase';
import { Button, makeStyles, Modal } from '@material-ui/core';

const Show = ({ show }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const updateShow = () => {
    db.collection('shows').doc(show.id).set(
      {
        show: text,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <div className='show'>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className='edit-tool'>
          <input
            type='text'
            placeholder={show.show}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            style={{ marginLeft: 20 }}
            onClick={updateShow}
          >
            Edit Show
          </Button>
        </div>
      </Modal>
      <h4 className='show-text'>{show.show}</h4>
      <h4 className='show-buttons'>
        <EditIcon className='show-edit' onClick={() => setOpen(true)} />
        <DeleteForeverIcon
          onClick={() => db.collection('shows').doc(show.id).delete()}
        />
      </h4>
    </div>
  );
};

export default Show;
