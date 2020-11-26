import React, { Component } from 'react'
import AppContext from '../src/AppContext'
import PropTypes from 'prop-types'

class AddNote extends Component {
    static contextType = AppContext

    state = {
        title: '',
        name: '',
        content: '',
        folderId: '',
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:9090/notes', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                content: this.state.content,
                folderId: this.state.folderId,
                modified: new Date().toISOString()
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    console.log(`Error Message: ${err}`)
                    throw err
                })
            }
            return res.json()
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({err})
        })
    }
    
    render() {

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h2 style={{color: 'white'}}>Add Note</h2>
                    <div>
                        <label style={{color: 'white'}}>Note Name</label><br />
                        <input 
                            type="text"
                            placeholder="Note Title"
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                            /><br />
                        <label style={{color: 'white'}}>Note Content</label><br />
                        <input 
                            type="text"
                            placeholder="Note Content"
                            name='content'
                            value={this.state.content}
                            onChange={this.handleChange}
                            required
                        /><br />
                        <label style={{color: 'white'}}>Folder</label><br />
                        <select 
                            value={this.state.folderId}
                            name='folderId'
                            onChange={this.handleChange}
                            required>
                                <option value=''>Select Folder</option>
                            {
                                this.context.folders.map(folder => (
                                <option value={folder.id} key={folder.id}>{folder.name}</option>
                                ))
                            }
                        </select><br /><br /><br />
                        <button
                            type="submit">Add Note</button>
                    </div>
                </form>
            </>
        )
    }
}

export default AddNote

AddNote.propTypes = {
    history: PropTypes.object.isRequired
}