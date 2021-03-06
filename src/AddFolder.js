import React, { Component } from 'react'
import AppContext from '../src/AppContext'
import PropTypes from 'prop-types'
import config from './config'

class AddFolder extends Component {
    static contextType = AppContext

    state = {
        title: '',
        folder: ''
    }

    handleChange = (e) => {
        this.setState({folder:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/folders`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:this.state.folder})
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
        .then(folder => {
            this.context.addFolder(folder)
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
                    <h2 style={{color: 'white'}}>Add Folder</h2>
                    <div>
                        <label style={{color: 'white'}}>Folder Name</label><br />
                        <input 
                            type="text"
                            placeholder="Note Title"
                            required
                            value={this.state.folder}
                            onChange={this.handleChange}
                            />
                        
                        <button
                            type="submit"
                        >Add Folder</button> 
                        
                        
                    </div>
                </form>
            </>
        )
    }
}

export default AddFolder

AddFolder.propTypes = {
    history: PropTypes.object.isRequired
}