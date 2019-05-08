import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component<{}, { count: number }> {

  state = {
    count: 0,
  };

  handleClick = () => {
    const { count, } = this.state;
    this.setState({
      count: count + 1,
    });
  };

  reset = () => {
    this.setState({
      count: 0,
    });
  };

  render() {
    const { count } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {count === 0 ? (
            <p>
              <button onClick={this.handleClick}>Click Me</button>
            </p>
          ) : (
            <p>
              <button onClick={this.handleClick}>You has clicked {count} times.</button>
            </p>
          )}
          <p>
              <button onClick={this.reset}>Reset</button>
            </p>
        </header>
      </div>
    );
  }
}

export default App;
