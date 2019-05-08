import React, { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import logo from './logo.svg';
import { IState } from './redux/reducer';
import { createIncreaseAction, createResetAction } from './redux/action';
import './App.css';

class App extends Component<{ count: number } & DispatchProp> {
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(createIncreaseAction());
  };

  reset = () => {
    const { dispatch } = this.props;
    dispatch(createResetAction());
  };

  render() {
    const { count } = this.props;

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
              <button onClick={this.handleClick}>
                You has clicked {count} times.
              </button>
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

const mapStateToProps = (state: IState) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(App);
