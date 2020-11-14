import React, { Component } from React

class AddNote extends Component {
    render() {

        return (
            <>
                <form>
                    <h2>Add Note</h2>
                    <div>
                        <label>Title</label>
                        <input 
                            type="text"
                            placeholder="Note Title"/>
                    </div>
                </form>
            </>
        )
    }
}

export default AddNote