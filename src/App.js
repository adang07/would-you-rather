import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar'
import Login from './components/Login';
import NewQuestion from './components/NewQuestion';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import QuestionPoll from './components/QuestionPoll';
import PageNotFound from './components/404PageNotFound';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <Router>
        <div className="container">
          
          { this.props.notLoggedIn ? <Route exact component={Login} /> :
            <Fragment>
              <NavBar />
              <Switch>
                      <Route exact path='/' component={Dashboard} />
                      <Route exact path='/question/:id' component={QuestionPoll} />
                      <Route exact path='/add' component={NewQuestion} />
                      <Route exact path='/leaderboard' component={Leaderboard} />
                      <Route path='/404' component={PageNotFound} />
                      <Route component={PageNotFound} />
              </Switch>
            </Fragment>}        
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    notLoggedIn: authedUser === null,
    user: authedUser ? users[authedUser] : null
  }
}


export default connect(mapStateToProps)(App);
