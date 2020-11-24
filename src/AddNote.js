import React, { Component } from 'react'
import AppContext from '../src/AppContext'

class AddNote extends Component {
    static contextType = AppContext

    state = {
        title: '',
        note: ''
    }

    handleChange = (e) => {
        this.setState({note:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:9090/notes', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:this.state.note})
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
                            value={this.state.note}
                            onChange={this.handleChange}
                            required
                            />
                        <button
                            type="submit">Add Note</button>
                    </div>
                </form>
            </>
        )
    }
}

export default AddNote