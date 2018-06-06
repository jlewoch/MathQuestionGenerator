import React, { Component } from 'react';
import './App.css';
import NavigationBar from '../components/navigationbar/NavigationBar';
import QuestionsTemplate from '../components/questions/QuestionsTemplate';

// variables
let visibility = 'none';
let correct = 0;
let questions = [];
let run = true;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFunc: '+',
      totalQuestions: 10,
      max:12,
      min:1,
      refresh: true,
    }
  }


// renders questions based on max min and total questions
  renderQuestions = () => {


    if(run){
      questions = []
      correct = 0
      for (let x = 0; x < this.state.totalQuestions; x++) {


        let top = Math.floor(Math.random() * (this.state.max - this.state.min) + this.state.min);
        let bot = Math.floor(Math.random() * (this.state.max - this.state.min) + this.state.min);
          while (top.toString().length < bot.toString().length) {
            top = Math.floor(Math.random() * (this.state.max - this.state.min) + this.state.min);
            bot = Math.floor(Math.random() * (this.state.max - this.state.min) + this.state.min);
          }


          questions.push(
            <QuestionsTemplate
              key={x}
              id={x}
              selectedFunc={this.state.selectedFunc}
              visibility={visibility}
              quesNum={x + 1}
              top={top}
              bot={bot}
            />
          )
        }
      }
      if (questions.length === this.state.totalQuestions) {
      run = false;
    }
    return questions;
  }



// handles setting selectedFunc when a navigation button is selected
  navClick = (e) => {
    run = true;
    switch (e.target.value) {
      case 0:
        visibility = 'none'
        this.setState({selectedFunc: '\xD7' })
        break;
      case 1:
       visibility = 'flex'
        this.setState({selectedFunc: '\xF7' })
        break;
      case 3:
      visibility = 'none'
        this.setState({ selectedFunc: '\u2212' })
        break;
      case 2:
      visibility = 'none'
        this.setState({ selectedFunc: '+' })
        break;
      default:
        break;
    }
  }

// used to refresh page when required to show any local variable changes
toggleState(){
  this.setState({ refresh: !this.state.refresh })
}

// confirms answer and evaluates how many are correct
  checkAnswers = () => {
    correct = 0;
    for (let x = 0; x < this.state.totalQuestions; x++) {
      const tn = document.getElementById(x + 'tn');
      const bn = document.getElementById(x + 'bn');
      const ans = document.getElementById(x + 'input');
      const remain = document.getElementById(x + 'remainder');

      ans.readOnly = true;
      remain.readOnly = true;

      switch (this.state.selectedFunc) {

        // checks addition
        case '+':
          if (ans.value.toString() === (parseFloat(tn.innerHTML) + parseFloat(bn.innerHTML)).toString()) {
            correct +=1
              ans.style.backgroundColor = '#0F0'
          } else {
            ans.style.backgroundColor = '#F00'
          }
          this.toggleState();
        break;

        //checks multiplication
        case '\xD7':
          if (ans.value.toString() === (parseFloat(tn.innerHTML) * parseFloat(bn.innerHTML)).toString()) {
            correct +=1
              ans.style.backgroundColor = '#0F0'
          } else {
            ans.style.backgroundColor = '#F00'
          }
        break;

        //  checks division and remainder
        case '\xF7':
          if (Math.round(ans.value).toString() === Math.round(parseFloat(tn.innerHTML) / parseFloat(bn.innerHTML)).toString()) {
              correct += .5
              ans.style.backgroundColor = '#0F0'

              if (remain.value.toString() === (parseFloat(tn.innerHTML) % parseFloat(bn.innerHTML)).toString()) {
                correct += .5
                remain.style.backgroundColor = '#0F0'
              }

          } else {
            ans.style.backgroundColor = '#F00'
            remain.style.backgroundColor = '#F00'
          }
        break;

        case '\u2212':
          if (ans.value.toString() === (parseFloat(tn.innerHTML) - parseFloat(bn.innerHTML)).toString()) {
            correct +=1
              ans.style.backgroundColor = '#0F0'
          } else {
            ans.style.backgroundColor = '#F00'
          }
        break;

        default:
      }
    }
  }


onChangeHandler = (e) => {
run = true;
  switch (e.target.name) {

    // detects change within total Questions input
    case 'totalQuestions':
      this.setState({ totalQuestions: Math.round(e.target.value) })
      break;

      // detects change within max input
      case 'max':
      if (!isNaN(e.target.value) && e.target.value !=='') {
        this.setState({ max: Math.round(e.target.value) })
      } else {
        this.setState({ max: 0 })
      }
        break;

        // detects change within min input
        case 'min':
        if (!isNaN(e.target.value) && e.target.value !=='') {
          this.setState({ min: Math.round(e.target.value) })
        } else {
          this.setState({ min: 0 })
        }
          break;
    default:
  }
}

  render() {

    return (
      <div className="App">
        <div style={{ marginBottom: '5px', height: '60px', width: '100%' }}>
          <NavigationBar
            numofques={this.onChangeHandler}
            correct={correct}
            maxVal={this.state.max}
            minVal={this.state.min}
            maxNum={this.onChangeHandler}
            minNum={this.onChangeHandler}
            val={this.state.totalQuestions}
            navClick={this.navClick}
          />
        </div>
        {this.renderQuestions()}

        <button id='check' onClick={this.checkAnswers} >Check Answers</button>


      </div>
    );
  }
}

export default App;
