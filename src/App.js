import React, { Component } from "react";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: 0,
      result: "waiting for input"
    };
  }

  // update userInput on state
  handleChange = value => {
    this.setState({ userInput: value });
  };

  // check the userInput, begin calculation and change result on state.
  startCount = () => {
    let trackMinuteOne = [];
    let trackMinuteFive = [];
    let trackHour = [];
    let timer = 0;
    let trackQueue = [];
    let queueCopy = [];
    let equalYetGlobal = false;
    let start = new Date();

    // determine if userInput is a valid number. true -> compute and display result. false -> notify user to correct the input.
    if (this.state.userInput < 27 || this.state.userInput > 127) {
      this.setState({
        result: "I only accept numbers inbetween 27 and 127, please try again."
      });
    } else {
      // populate trackQueue and queueCopy.
      this.setState({
        result: 'loading...'
      })
      for (let index = 0; index < this.state.userInput; index++) {
        trackQueue.push(index);
        queueCopy.push(index);
      };

      let action = () => {
        let ball = queueCopy.shift();
        trackMinuteOne.push(ball);
      };

      let emptyTray = (current, next) => {
        let ball = current.pop();
        while (current.length > 0) {
          queueCopy.push(current.pop());
        };
        next.push(ball);
      };

      let checkEqual = () => {
        // if (queueCopy[0] !== 0) {
        //   return false;
        // } else {
        //   return JSON.stringify(trackQueue) === JSON.stringify(queueCopy);
        // };
        for (let i = 0; i < queueCopy.length; i ++) {
          if (trackQueue[i] !== queueCopy[i]) {
              return false;
          }
      }
      return true;
      };

      let calculate = () => {
        let roundedSum = Math.floor(timer / 2);
        this.setState({ result: roundedSum + " days" });
      };

      do {
        if (trackHour.length === 12) {
          timer++;
          emptyTray(trackHour, queueCopy);
          equalYetGlobal = checkEqual();
        } else if (trackMinuteFive.length === 12) {
          emptyTray(trackMinuteFive, trackHour);
        } else if (trackMinuteOne.length === 5) {
          emptyTray(trackMinuteOne, trackMinuteFive);
        } else {
          action();
        }
      } while (equalYetGlobal === false);
      calculate();
      console.log(new Date() - start);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Welcome to the Ball Clock Calculator!</h3>

          <input
            type="number"
            placeholder="27-127"
            onChange={e => this.handleChange(e.target.value)}
          />
          <button onClick={this.startCount}>Start Count</button>
          <div>
            Result:
            <div style={{ color: "black" }}>{this.state.result}</div>
          </div>
        </header>
      </div>
    );
  }
}
