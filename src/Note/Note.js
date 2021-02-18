import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext'
import PropTypes from 'prop-types'
import config from '../config'

export default function Note(props) {
  const context = useContext(AppContext)
  const handleClick = (id) => {
    fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      context.deleteNote(id)
      props.goHome()
    })
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
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  modified: PropTypes.string.isRequired,
  goHome: PropTypes.func.isRequired
}
