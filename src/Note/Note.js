import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext'
// import config from '../config'
import PropTypes from 'prop-types'
// import NoteListMain from '../NoteListMain/NoteListMain'

export default function Note(props) {
  // console.log(props)
  const context = useContext(AppContext)
  const handleClick = (id) => {
    context.deleteNote(id)
    props.goHome()
  }
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'
      onClick={() => handleClick(props.id)}
      >
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}

Note.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  modified: PropTypes.string,
  goHome: PropTypes.func
}
