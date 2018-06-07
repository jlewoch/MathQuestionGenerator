import React, {Component} from 'react';
import Buttons from './buttons/Buttons';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 0,
      started: false,
      history: []
    }
    this.timer = 0;
    this.numColor = 'black';
    this.paused = false;

  }

  // calculates how man min and seconds in the total amount of seconds from totalQuestions multiplied by 3
  counter = (x) => {
    let min = this.addZero(Math.floor(x / 60))
    let sec = this.addZero(Math.floor(x % 60))

    let obj = {
      minutes: min,
      seconds: sec
    }

    return obj;
  }

  // adds a zero if variable is below 10
  addZero = (x) => {
    if (x < 10) {
      x = '0' + x
    }
    return x;
  }

  componentWillMount() {
    this.resetTimer()
  }

  // starts Timer
  startTimer = () => {
    this.clearInputFields();
    this.resetTimer()
    this.setState({started: true})
    this.timer = setInterval(this.countDown, 1000)

  }

  countDown = () => {

    if (this.state.seconds >= 0) {
      let seconds = this.state.seconds - 1
      this.setState({
        time: this.counter(this.state.seconds),
        seconds: seconds
      })
    } else {
      clearInterval(this.timer)
      document.getElementById('check').click();
      this.setState({started: false})
      this.numColor = 'black'
      this.resetTimer()
    }

    if (this.state.seconds < 10 && this.state.seconds !== 0) {
      this.numColor = 'red'
    } else {
      this.numColor = 'black'
    }

  }

  //clears input fields on questions if user wants to try again on the same questions
  clearInputFields = () => {
    for (let x = 0; x < this.props.totalQuestions; x++) {
      const ans = document.getElementById(x + 'input');
      const remain = document.getElementById(x + 'remainder');
      ans.readOnly = false;
      ans.value = ''
      ans.style.backgroundColor = '#FFF';
      remain.readOnly = false;
      remain.value = ''
      remain.style.backgroundColor = '#FFF';
    }
    this.setState({history: [], paused: false})
  }

  //updates the timer to the correct time based on 3 seconds per questions
  resetTimer = () => {
    let seconds = this.props.totalQuestions * 3
    let timeLeft = this.counter(seconds)
    this.setState({time: timeLeft, seconds: seconds})
  }

  //pases and resumes timer also lock and unlocks input fields
  togglePaused = () => {
    this.addToHistory()
    this.paused = !this.paused;
    for (let x = 0; x < this.props.totalQuestions; x++) {
      const ans = document.getElementById(x + 'input');
      const remain = document.getElementById(x + 'remainder');
      if (this.paused) {
        ans.readOnly = true;
        remain.readOnly = true;
      } else {
        ans.readOnly = false;
        remain.readOnly = false;
      }
    }

    if (this.paused) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(this.countDown, 1000)
    }

  }

  //resets timer to origional state making start button appear
  toggleStarted = () => {
    this.clearInputFields()
    this.resetTimer()
    clearInterval(this.timer)
    this.setState({started: false})
  }

  //currently not in use will be used in the future
  addToHistory() {
    this.setState({
      history: [
        ...this.state.history,
        this.state.seconds
      ]
    })
  }

  //updates timer when user changes amount of questions
  componentWillReceiveProps(nextprops) {
    let seconds = nextprops.totalQuestions * 3
    let timeLeft = this.counter(seconds)
    this.setState({time: timeLeft, seconds: seconds})

  }

  // clears timer if being disabled
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (<div style={{
        width: '120px',
        height: '100%'
      }}>
      <p style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '50%',
          margin: '0px',
          fontWeight: 'bolder',
          color: this.numColor
        }}>{this.state.time.minutes + ':' + this.state.time.seconds}</p>
      <Buttons paused={this.paused} history={this.state.history} started={this.state.started} startTimer={this.startTimer} togglePaused={this.togglePaused} toggleStarted={this.toggleStarted}/>

    </div>);
  }
}
export default Timer;
