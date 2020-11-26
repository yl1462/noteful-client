import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import AppContext from '../AppContext'
import { getNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types'


export default function NoteListMain(props) {
  const context = useContext(AppContext)
  const {folderId} = props.match.params
  const notes = getNotesForFolder(context.notes, folderId)
  const goHome = () => {
    props.history.push('/folder/' + folderId)
  }
  return (
    <section className='NoteListMain'>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
              goHome={goHome}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )
}

NoteListMain.defaultProps = {
  notes: [],
}

NoteListMain.propTypes = {
  history: PropTypes.object.isRequired
}