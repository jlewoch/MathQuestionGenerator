import React, {Component} from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: this.props.totalQuestions * 3 }
    this.timer = 0;
    this.numColor = 'black'
  }


counter = (x) => {
  let min =  this.addZero(Math.floor(x / 60))
  let sec = this.addZero(Math.floor(x % 60))

  let obj = {
    minutes: min,
    seconds: sec
  }

  return obj;
}

addZero = (x) => {
  if (x < 10) {
    x = '0' + x
  }
  return x
}

componentDidMount(){
  let timeLeft = this.counter(this.state.seconds)
  this.setState({time: timeLeft})
}

startTimer = () => {
this.clearInputFields();

  this.setState({seconds: this.props.totalQuestions * 3})
  if (this.timer === 0) {
    this.timer = setInterval(this.countDown, 1000)
  }
}

countDown = () => {


  if (this.state.seconds >= 0) {
    let seconds = this.state.seconds - 1
    this.setState({ time: this.counter(this.state.seconds), seconds: seconds})
  } else {
    clearInterval(this.timer)
    document.getElementById('check').click();
  }

  if (this.state.seconds < 10 && this.state.seconds !== 0) {
    this.numColor = 'red'
  } else {
    this.numColor = 'black'
  }

}

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
  let seconds = this.props.totalQuestions * 3
}

  render() {
    return (
      <div style={{width: '100px', height: '100%', }}>
        <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50%', margin: '0px', fontWeight: 'bolder', color: this.numColor}}>{this.state.time.minutes + ':' + this.state.time.seconds}</p>
        <button style={{width: '100%', height: '50%', margin: '0px'}} onClick={this.startTimer} >Start Timer</button>

      </div>);
  }
}
export default Timer;
