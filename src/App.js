import './App.css';
import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './components/Home'
import ItemsWishList from './components/ItemsWishList'
import ItemsWardrobeList from './components/ItemsWardrobeList'
import Outfits from './components/Outfits'
import LoginRegister from './components/LoginRegister'
import Header from './components/Header'
import Footer from './components/Footer'

let baseURL = 'http://127.0.0.1:8000'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      items: [],
      categories: []
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  changeLoggedInStatus = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  getItems = async () => {
    const url = baseURL + '/api/v1/items/'
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: "include"
      })
      // convert response to json
      const jsonResponse = await response.json()

      if (response.status === 200) {
        this.setState({
          items: jsonResponse.data
        })
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  deleteItemFromState = (id) => {
    const findIndex = this.state.items.findIndex(item => item.id === id)
    console.log(findIndex)
    let copyItems = [...this.state.items]
    copyItems.splice(findIndex, 1)

    this.setState({
      items: copyItems
    })
  }

  getCategories = async () => {
    const url = baseURL + '/api/v1/categories/'
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: "include"
      })
      // convert response to json
      const jsonResponse = await response.json()

      if (response.status === 200) {
        this.setState({
          categories: jsonResponse.data
        })
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  createCategory = async (category_name) => {
    const url = baseURL + '/api/v1/categories/'
    try {
      const categoryBody = {
          "name": category_name
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryBody),
        credentials: "include"
      })

      // convert response to json
      const json_response = await response.json()

      if (response.status === 201) {
        this.getCategories()
      }

      return json_response.data

    }
    catch (err) {
      console.log('Error => ', err)
    }
  }



  render() {
    console.log(this.state)
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
                  <ItemsWishList items={this.state.items} categories={this.state.categories} createCategory={this.createCategory} getItems={this.getItems}  purchased={false} deleteItemFromState={this.deleteItemFromState} />
                  :
                  <Redirect to="/login" />
                }
              </Route>
              <Route path="/wardrobe">
                { this.state.loggedIn ?
                  <ItemsWardrobeList items={this.state.items} categories={this.state.categories} createCategory={this.createCategory} getItems={this.getItems}  purchased={true}/>
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
