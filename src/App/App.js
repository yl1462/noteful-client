import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
// import dummyStore from '../dummy-store';
// import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import AppContext from '../AppContext'
import config from '../config';
import AddFolder from '../AddFolder'
import AddNote from '../AddNote'
import ErrorBoundary from '../ErrorBoundary'

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    addFolder = (folder) => {
        this.setState({folders: [...this.state.folders, folder]})
    }

    addNote = (note) => {
        this.setState({notes: [...this.state.notes, note]})
    }

    deleteNote = (id) => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        })
    }

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    renderNavRoutes() {
        // const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <Route path="/add-folder" component={NotePageNav} />
                
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        // const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                        />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                    />
                <Route 
                    path="/add-folder" 
                    component={AddFolder} 
                    />
                <Route 
                    path="/add-note" 
                    component={AddNote} 
                    />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.deleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote
        }
        return (
            <ErrorBoundary>
                <AppContext.Provider
                value={value}
                >
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
                </AppContext.Provider>
            </ErrorBoundary>
        );
    }
}

export default App;
