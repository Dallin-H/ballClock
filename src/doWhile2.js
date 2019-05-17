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
    let trackMinuteFive = [];
    let trackHour = [];
    let timer = 0;
    let trackQueue = [];
    let queueCopy = [];
    let equal = false;

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

      let isEqual = () => {
        queueCopy.forEach((el, id) => {
          if (el !== trackQueue[id]) {
            equal = false;
          } else {
            equal = true;
          }
        });
        this.setState({ result: Math.floor(timer/2) + ' days' });
      }

      // rotate 4 balls in queueCopy.
      let action = () => {
        let array = queueCopy.splice(0, 4);
        array.reverse();
        array.forEach(el => queueCopy.push(el));
        let ball = queueCopy.shift();
        trackMinuteFive.push(ball);
      }

      let emptryTrack = (track) => {
        track.forEach(ball => {
          let lastOne = track.pop();
          queueCopy.push(lastOne);
        })
      }

      let dropMinuteFive = () => {
        let ballDrop = trackMinuteFive.pop();
        trackHour.push(ballDrop);

        emptyTrack(trackMinuteFive);
      }

      function dropHour() {
        timer++;
        console.log(timer)
        emptyTrack(trackHour);
        isEqual();
      }

      do {
        if (trackMinuteFive.length === 12) {
          dropMinuteFive();
        } else if (trackHour.length === 12) {
          dropHour();
        } else {
          action();
        }
      } while (equal === false);
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
