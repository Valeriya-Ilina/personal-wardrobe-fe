import './App.css';
import { Component } from 'react'
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

  render() {
    return (
      <div className="App">
        <Header loggedIn={this.state.loggedIn} />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;
