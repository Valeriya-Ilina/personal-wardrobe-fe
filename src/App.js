import './App.css';
import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './components/Home'
import Items from './components/Items'
import Outfits from './components/Outfits'
import LoginRegister from './components/LoginRegister'
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
      <Router>
        <div className="App">
          <Header loggedIn={this.state.loggedIn} changeLoggedInStatus={this.changeLoggedInStatus} />
          <main>
            <Switch>
              <Route exact path="/">
                { this.state.loggedIn ?
                  <Redirect to="/wishlist" />
                  :
                  <Redirect to="/home" />
                }
              </Route>
              <Route path="/login">
                { this.state.loggedIn ?
                  <Redirect to="/wishlist" />
                  :
                  <LoginRegister userIntention="login" changeLoggedInStatus={this.changeLoggedInStatus} />
                }
              </Route>
              <Route path="/register">
                { this.state.loggedIn ?
                  <Redirect to="/wishlist" />
                  :
                  <LoginRegister userIntention="register" changeLoggedInStatus={this.changeLoggedInStatus} />
                }
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/wishlist">
                { this.state.loggedIn ?
                  <Items purchased={false}/>
                  :
                  <Redirect to="/login" />
                }
              </Route>
              <Route path="/wardrobe">
                { this.state.loggedIn ?
                  <Items purchased={true}/>
                  :
                  <Redirect to="/login" />
                }
              </Route>
              <Route path="/outfits">
                { this.state.loggedIn ?
                  <Outfits />
                  :
                  <Redirect to="/login" />
                }
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
