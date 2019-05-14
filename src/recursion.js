import React, { Component } from "react";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: 0,
      trackMinuteOne: [],
      trackMinuteFive: [],
      trackHour: [],
      trackQueue: [],
      result: "waiting for input"
    };
  }

  // update userInput on state
  handleChange = value => {
    this.setState({ userInput: value });
  };

  // check the userInput, begin calculation and change result on state.
  startCount = () => {
    const { userInput, trackQueue, result } = this.state;

    
    // determine if userInput is a valid number. true -> compute and display result. false -> notify user to correct the input
    if (userInput < 27 || userInput > 127) {
      this.setState({
        result: "I only accept numbers in between 27 and 127, please try again."
      });
    } else {
      let trackMinuteOne = [];
      let trackMinuteFive = [];
      let trackHour = [];
      let timer = 0;
      let queueCopy = [];

      // populate trackQueue with the correct number of ballBearings.
      // make a clone of trackQueue called queueCopy.
      for (let index = 0; index < userInput; index++) {
        trackQueue.push(index);
        queueCopy.push(index);
      }

      // action
      // add 1 to timer
      // remove first ballBearing from trackQueue and place it on the end of trackMinuteOne.
      // if trackMinuteOne length === 5, trigger dropMinuteOne
      let action = () => {
        timer++;

        // calculate
        // timer is holding a sum of minutes. Calculate will determiningg how many days will pass to return the queue to it's original state.
        let calculate = () => {
          let day = 60 * 24;
          let sum = timer / day;
          let roundedSum = Math.floor(sum)

          this.setState({result: roundedSum + ' days'})
        }

        // drop hour
        // remove all and add them to trackQueue in correct order
        // check trackQueue and compare it to original Queue for solution
        // if solved, run calculator. if not, run action.
        let dropHour = () => {
          for (let index = trackHour.length - 1; index > 0; index--) {
            const element = trackHour[index];
            queueCopy.push(element)
          }

          trackHour = [];

          trackQueue === queueCopy ? calculate() : action();
        }

        // dropMinuteFive
        // remove 1st item from trackMinuteOne and place it at the end of trackHour.
        // empty trackMinuteFive in the correct order into trackQueue
        // if trackHour length === 12, trigger dropHour
        let dropMinuteFive = () => {
          let dropBall = trackMinuteFive.pop();
          trackHour.push(dropBall);

          for (let index = trackMinuteFive.length - 1; index > 0; index--) {
            const element = trackMinuteFive[index];
            queueCopy.push(element)
          }

          trackMinuteFive = [];

          trackHour.length === 12 ? dropHour() : action();
        }

        // dropMinuteOne
        // remove 1st item from trackMinuteOne and place it at the end of trackMinuteFive.
        // empty trackMinuteOne in the correct order into trackQueue
        // if trackMinuteFive length is === 12, trigger dropMinuteFive
        let dropMinuteOne = () => {
          let dropBall = trackMinuteOne.pop();
          trackMinuteFive.push(dropBall);

          for (let index = trackMinuteOne.length - 1; index > 0; index--) {
            const element = trackMinuteOne[index];
            queueCopy.push(element)
          }

          trackMinuteOne = [];

          trackMinuteFive.length === 12 ? dropMinuteFive() : action();
        };

        
        let activeBall = queueCopy.shift();
        trackMinuteOne.push(activeBall);

        trackMinuteOne.length === 5 ? dropMinuteOne() : action();
      };

      if (result === 'waiting for input') {action();}
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
