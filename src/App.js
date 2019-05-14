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

    // determine if userInput is a valid number. true -> compute and display result. false -> notify user to correct the input
    if (this.state.userInput < 27 || this.state.userInput > 127) {
      this.setState({
        result: "I only accept numbers in between 27 and 127, please try again."
      });
    } else {
      for (let index = 0; index < this.state.userInput; index++) {
        trackQueue.push(index);
        queueCopy.push(index);
      }

      let action = () => {
        timer++;
        let activeBall = queueCopy.shift();
        trackMinuteOne.push(activeBall);
      };

      // dropMinuteOne
      // remove 1st item from trackMinuteOne and place it at the end of trackMinuteFive.
      // empty trackMinuteOne in the correct order into trackQueue
      // if trackMinuteFive length is === 12, trigger dropMinuteFive
      let dropMinuteOne = () => {
        let dropBall = trackMinuteOne.pop();
        trackMinuteFive.push(dropBall);

        for (let index = trackMinuteOne.length - 1; index >= 0; index--) {
          let ball = trackMinuteOne.pop();
          queueCopy.push(ball);
        }
      };

      // dropMinuteFive
      // remove 1st item from trackMinuteOne and place it at the end of trackHour.
      // empty trackMinuteFive in the correct order into trackQueue
      // if trackHour length === 12, trigger dropHour
      let dropMinuteFive = () => {
        let dropBall = trackMinuteFive.pop();
        trackHour.push(dropBall);

        for (let index = trackMinuteFive.length - 1; index >= 0; index--) {
          let ball = trackMinuteFive.pop();
          queueCopy.push(ball);
        }
      };

      // drop hour
      // remove all and add them to trackQueue in correct order
      // check trackQueue and compare it to original Queue for solution
      // if solved, run calculator. if not, run action.
      let dropHour = () => {
        for (let index = trackHour.length - 1; index >= 0; index--) {
          let ball = trackHour.pop();
          queueCopy.push(ball);
        }
      };

      // calculate
      // timer is holding a sum of minutes. Calculate will determining how many days will pass
      // to return the queue to it's original state.
      let calculate = () => {
        let day = 1440;
        let sum = timer / day;
        let roundedSum = Math.floor(sum);

        this.setState({ result: roundedSum + " days" });
      };

      // isEqual
      // compare the two tracks to see if they are identical or not.
      // identical -> run calculate, notIdentical -> continue the do...while loop
      let isEqual = () => {
        if (JSON.stringify(trackQueue) === JSON.stringify(queueCopy)) {
          console.log(trackQueue, queueCopy);
          return true;
        } else {
          return false;
        }
      };

      // do...while loop is running a conditinal statement before triggering the next action.
      do {
        if (trackHour.length === 12) {
          console.log("Hour Drop");
          dropHour();
        } else if (trackMinuteFive.length === 12) {
          // console.log("5 Minute Drop");
          dropMinuteFive();
        } else if (trackMinuteOne.length === 5) {
          // console.log("Minute Drop");
          dropMinuteOne();
        } else {
          // console.log("Action");
          action();
        }
      } while (isEqual() === false);
      calculate();
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Welcome to the Ball Clock Calculator!</h3>
          <h6>By Dallin Hyde</h6>
          Please input a number to count.
          <br />
          When you click on 'Start Count' I will display
          <br />
          how long it will take the first ball to get
          <br />
          back to the number one slot in the queue.
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
