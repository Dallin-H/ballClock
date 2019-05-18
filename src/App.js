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

    // determine if userInput is a valid number. true -> compute and display result. false -> notify user to correct the input.
    if (this.state.userInput < 27 || this.state.userInput > 127) {
      this.setState({
        result: "I only accept numbers in between 27 and 127, please try again."
      });
    } else {
      // populate trackQueue and queueCopy.
      for (let index = 0; index < this.state.userInput; index++) {
        trackQueue.push(index + 1);
        queueCopy.push(index + 1);
      }

      let action = () => {
        let ball = queueCopy.shift();
        trackMinuteOne.push(ball);
        


      };

      let dropMinuteOne = () => {

        let dropBall = trackMinuteOne.pop();
        trackMinuteFive.push(dropBall);

        for (let index = trackMinuteOne.length - 1; index >= 0; index--) {
          let ball = trackMinuteOne.pop();
          queueCopy.push(ball);
        }
      };

      let dropMinuteFive = () => {

        let dropBall = trackMinuteFive.pop();
        trackHour.push(dropBall);

        for (let index = trackMinuteFive.length - 1; index >= 0; index--) {
          let ball = trackMinuteFive.pop();
          queueCopy.push(ball);
        }
      };

      let dropHour = () => {
        timer++;
        for (let index = trackHour.length - 1; index >= 0; index--) {
          let ball = trackHour.pop();
          queueCopy.push(ball);
        }

        let equalYetLocal = false;
        let checkEqual = () => {
          if (queueCopy[0] !== 1) {
            equalYetLocal = false;
          } else {
            if (JSON.stringify(trackQueue) === JSON.stringify(queueCopy)) {
              equalYetLocal = true;
            } else {
              equalYetLocal = false;
            }
          }
        };

        checkEqual();
        equalYetGlobal = equalYetLocal;
      };

      let calculate = () => {

        let roundedSum = Math.floor(timer / 2);

        this.setState({ result: roundedSum + " days" });
      };

      do {
        if (trackHour.length === 12) {
          dropHour();
        } else if (trackMinuteFive.length === 12) {
          dropMinuteFive();
        } else if (trackMinuteOne.length === 5) {
          dropMinuteOne();
        } else {
          console.log('q: ' + queueCopy)
          console.log('t1: ' + trackMinuteOne)
          console.log('t5: ' + trackMinuteFive)
          console.log('th: ' + trackHour)
          console.log('-----------------')
          action();
        }
      } while (equalYetGlobal === false);
      calculate();
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
