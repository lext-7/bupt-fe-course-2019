import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component<{}, { content: string }> {

  state = {
    content: '',
  };

  handleClick = async () => {
    const { content, } = this.state;
    const resp = await axios.get('https://easy-mock.com/mock/5ca37e9e088bc82578d2b338/bupt-demo/test');
    this.setState({
      content: resp.data.data,
    });
  };

  reset = () => {
    this.setState({
      content: '',
    });
  };

  render() {
    const { content } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Response: {content}
          </p>
          <p>
            <button onClick={this.handleClick}>Click Me To Send Request</button>
          </p>
          <p>
              <button onClick={this.reset}>Reset</button>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
