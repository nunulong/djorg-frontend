import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const notesClient = axios.create({
  baseURL: 'http://localhost:8000/api/notes',
  timeout: 1000
});

class App extends Component {
  state = {
    notes: [],
    error: ''
  };

  componentDidMount() {
    notesClient
      .get('/')
      .then(response => {
        const notes = response.data;
        this.setState({ notes });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: error.message });
      });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.notes.map(note => (
            <li key={note.id}>
              <h2>
                {note.title} {`(id: ${note.id})`}
              </h2>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
        {this.state.error ? <h2>{this.state.error}</h2> : null}
      </div>
    );
  }
}

export default App;
