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
      trackQueueOriginal: [],
      timer: 0,
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
    // if (userInput < 27 || userInput > 127) {
    //   this.setState({
    //     result: "I only accept numbers in between 27 and 127, please try again."
    //   });
    // } else {

    for (let index = 0; index < this.state.userInput; index++) {
      trackQueue.push(index);
      queueCopy.push(index);
    }

    let action = () => {
      timer++;
      let activeBall = queueCopy.shift();
      trackMinuteOne.push(activeBall);
      console.log(activeBall)
    };

    let dropMinuteOne = () => {
      let dropBall = trackMinuteOne.pop();
      console.log(dropBall)
      trackMinuteFive.push(dropBall);

      for (let index = trackMinuteOne.length - 1; index > 0; index--) {
        const element = trackMinuteOne[index];
        queueCopy.push(element);
      }

      trackMinuteOne = [];
    };

    let dropMinuteFive = () => {
      let dropBall = trackMinuteFive.pop();
      trackHour.push(dropBall);

      for (let index = trackMinuteFive.length - 1; index > 0; index--) {
        const element = trackMinuteFive[index];
        queueCopy.push(element);
      }

      trackMinuteFive = [];
    };

    let dropHour = () => {
      for (let index = trackHour.length - 1; index > 0; index--) {
        const element = trackHour[index];
        queueCopy.push(element);
      }

      trackHour = [];
    };

    let calculate = () => {
      let day = 60 * 24;
      let sum = timer / day;
      let roundedSum = Math.floor(sum);

      this.setState({ result: roundedSum + " days" });
    };

    let comparator = () => {
        for (let index = 0; index < trackQueue.length; index++) {
            const element = trackQueue[index];
            if(element !== queueCopy[index]) {
              return false;
            } else {
              return true;
            }
          }
    }
    
    while (comparator() === false) {
        if (trackQueue === queueCopy) {
          console.log('Eureka!')
          calculate();
        } else if (trackHour.length === 12) {
          console.log('Hour Drop')
          dropHour();
        } else if (trackMinuteFive.length === 12) {
          console.log('5 Minute Drop')
          dropMinuteFive();
        } else if (trackMinuteOne.length === 5) {
          console.log('Minute Drop')
          dropMinuteOne();
        } else {
          console.log('hit')
          action();
        }
    }


    // }
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
