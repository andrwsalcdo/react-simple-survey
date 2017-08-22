import React, { Component } from 'react';
import './App.css';

const uuid = require('uuid'); 
const firebase = require('firebase'); 

const config = {
    apiKey: "AIzaSyAZeqvLQ-uUOfGPEUtFtHK7KAqK7Pb_fCs",
    authDomain: "react-simple-survey.firebaseapp.com",
    databaseURL: "https://react-simple-survey.firebaseio.com",
    projectId: "react-simple-survey",
    storageBucket: "react-simple-survey.appspot.com",
    messagingSenderId: "122801023852"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        id: uuid.v1(),
        name: '', 
        answers: {
          q1: '',
          q2: '',
          q3: ''
        },
        submitted: false
      }

      this.handleNameSubmit = this.handleNameSubmit.bind(this); 
      this.handleQuestionChange = this.handleQuestionChange.bind(this); 
  }

  handleNameSubmit(event) {
    let name = this.refs.name.value;
    //need a callback function to store the ref value
    this.setState({ name: name }, () => {});
    event.preventDefault();
  }

  handleQuestionSubmit(event) {
    //submitting data to Firebase db
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name, 
      answers: this.state.answers
    }); 
    this.setState({ submitted: true });
    event.preventDefault(); 
  }

  handleQuestionChange(event) {
    let answers = this.state.answers; 
    
    if(event.target.name === 'q1') {
        answers.q1 = event.target.value; 
    } else if (event.target.name === 'q2') {
        answers.q2 = event.target.value;                         
    } else if (event.target.name === 'q3') {
        answers.q3 = event.target.value;         
    }

    this.setState({ answers: answers }); 
  }

  render() {
    let user, questions; 
    if(this.state.name && this.state.submitted === false) {
        user = <h2> Welcome {this.state.name} </h2>
        questions = <span>
          <h3>Survey Questions</h3>
          <form onSubmit={this.handleQuestionSubmit.bind(this)}>
            <div>
              <label>What is your favorite operating system?</label><br />
              <input type="radio" name="q1" value="Windows" 
                onChange={this.handleQuestionChange} />Windows<br />
              <input type="radio" name="q1" value="OSX"  
                onChange={this.handleQuestionChange} />OSX<br />
              <input type="radio" name="q1" value="Linux"  
                onChange={this.handleQuestionChange} />Linux<br />
              <input type="radio" name="q1" value="other" 
                 onChange={this.handleQuestionChange} />other<br />
            </div>
            <div>
              <label>What is your favorite brand of TV?</label><br />
              <input type="radio" name="q2" value="Sony" 
                onChange={this.handleQuestionChange} />Sony<br />
              <input type="radio" name="q2" value="Samsung"  
                onChange={this.handleQuestionChange} />Samsung<br />
              <input type="radio" name="q2" value="LG"  
                onChange={this.handleQuestionChange} />LG<br />
              <input type="radio" name="q2" value="other" 
                 onChange={this.handleQuestionChange} />other<br />
            </div>
            <div>
              <label>What is your favorite smartphone brand?</label><br />
              <input type="radio" name="q3" value="Apple" 
                onChange={this.handleQuestionChange} />Apple<br />
              <input type="radio" name="q3" value="Samsung"  
                onChange={this.handleQuestionChange} />Samsung<br />
              <input type="radio" name="q3" value="LG"  
                onChange={this.handleQuestionChange} />LG<br />
              <input type="radio" name="q3" value="other" 
                 onChange={this.handleQuestionChange} />other<br />
            </div>
            <input type="submit" value="submit" />
          </form>
        </span>;
    } else if (!this.state.name && this.state.submitted === false) {
        user = <span>
          <h2>Please enter your name to begin the survey</h2>
          <form onSubmit={this.handleNameSubmit}>
            <input type="text" placeholder="Enter your Name"
              ref="name"/> 
          </form>
          </span>;
        questions = ''; 
    } else if (this.state.submitted === true) {
        user = <h2>Thank you {this.state.name} </h2>
    }
    return (
      <div>
        <div className="App-header text-center">
          <h2>Simple Survey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
