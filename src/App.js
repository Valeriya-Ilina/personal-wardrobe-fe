import './App.css';
import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginRegister from './components/LoginRegister'
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false
    }
  }

  changeLoggedInStatus = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  render() {
    console.log(this.state.loggedIn)
    return (
      <>
        <div className="App">
          <Header loggedIn={this.state.loggedIn} changeLoggedInStatus={this.changeLoggedInStatus} />

          <Router>
            <Switch>
              <Route exact path="/">
                { this.state.loggedIn ?
                  <Redirect to="/items/?purchased=false" />
                  :
                  <Redirect to="/home" />
                }
              </Route>
              <Route path="/login">
                { this.state.loggedIn ?
                  <Redirect to="/items/?purchased=false" />
                  :
                  <LoginRegister userIntention="login" changeLoggedInStatus={this.changeLoggedInStatus} />
                }
              </Route>
              <Route path="/register">
                { this.state.loggedIn ?
                  <Redirect to="/items/?purchased=false" />
                  :
                  <LoginRegister userIntention="register" changeLoggedInStatus={this.changeLoggedInStatus} />
                }
              </Route>
              <Route path="/home">
                { this.state.loggedIn ?
                  <Redirect to="/items/?purchased=false" />
                  :
                  <Redirect to="/home" />
                }
              </Route>
            </Switch>
          </Router>

          <Main />
          <Footer />
        </div>
      </>
    )
  }
}

export default App;
