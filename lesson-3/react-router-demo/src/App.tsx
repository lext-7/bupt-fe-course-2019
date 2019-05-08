import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to="/">
              <button>Go To Home</button>
            </Link>
            <Link to="/about/">
              <button>Go To About</button>
            </Link>
            <Link to="/users/">
              <button>Go To Users</button>
            </Link>
          </div>

          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
        </div>
      </Router>
    );
  }
}

export default App;
