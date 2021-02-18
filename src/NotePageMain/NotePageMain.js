import React, { useContext } from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import AppContext from '../AppContext'
import {findNote} from '../notes-helpers'

export default function NotePageMain(props) {
  console.log(props)
  const context = useContext(AppContext)
  const {noteId} = props.match.params
  const note = findNote(context.notes, noteId)
  console.log(note)
  const goHome = () => {
    props.history.push('/')
  }
  return (
    note ? <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        goHome={goHome}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
    : null
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
