import React, { Component } from React

class AddFolder extends Component {
    this.state ={
        title:""
    }
    render() {

        return (
            <>
                <form>
                    <h2>Add Folder</h2>
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

export default AddFolder