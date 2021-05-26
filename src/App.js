import './App.css';
import { Component } from 'react'
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;
