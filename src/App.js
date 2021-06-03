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

const baseURL = process.env.REACT_APP_BASEURL

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      items: [],
      categories: [],
      categoriesWithItems: [],
      showOffcanvas: false,
      itemCurrentlyBeingEdited: null
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  editItem = (item) => {
    this.handleShow()
    this.setState({
      itemCurrentlyBeingEdited: item
    })
  }

  // Offcanvas methods (side menu)
  setShow = (boolean) => {
    this.setState({
      showOffcanvas: boolean
    })
  }

  handleClose = () => {
    this.setShow(false)
    // clear form
    this.setState({
      itemCurrentlyBeingEdited: null
    })
  }

  handleShow = () => {
    this.setShow(true)
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

      // get unique category names
      const uniqueCategories = [...new Set(jsonResponse.data.map(item => item.category_id.name))]

      // populate array with unique category names and items that belong to these categories
      let categoriesWithItems = []
      categoriesWithItems = uniqueCategories.map(category => {
        let itemsBelongToCategory = []
        jsonResponse.data.map(item => {
          if (item.category_id.name === category) {
            itemsBelongToCategory.push(item)
          }
        })
        return {
          category_name: category,
          items: itemsBelongToCategory
        }
      })

      if (response.status === 200) {
        this.setState({
          // items: jsonResponse.data,
          categoriesWithItems: categoriesWithItems
        })
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  deleteItemFromState = (id) => {
    let copyArray = [...this.state.categoriesWithItems]
    for (const category of copyArray) {
      const findIndex = category.items.findIndex(item => item.id === id)
      if (findIndex != -1) {
        category.items.splice(findIndex, 1)
        break
      }
    }

    this.setState({
      categoriesWithItems: copyArray
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
                  <ItemsWishList items={this.state.items} categories={this.state.categories} createCategory={this.createCategory} getItems={this.getItems} categoriesWithItems={this.state.categoriesWithItems} itemCurrentlyBeingEdited={this.state.itemCurrentlyBeingEdited} is_purchased={false} editItem={this.editItem} deleteItemFromState={this.deleteItemFromState} showOffcanvas={this.state.showOffcanvas} handleShow={this.handleShow} handleClose={this.handleClose} />
                  :
                  <Redirect to="/login" />
                }
              </Route>
              <Route path="/wardrobe">
                { this.state.loggedIn ?
                  <ItemsWardrobeList items={this.state.items} categories={this.state.categories} createCategory={this.createCategory} getItems={this.getItems} categoriesWithItems={this.state.categoriesWithItems} itemCurrentlyBeingEdited={this.state.itemCurrentlyBeingEdited} is_purchased={true}
                  editItem={this.editItem} deleteItemFromState={this.deleteItemFromState} showOffcanvas={this.state.showOffcanvas} handleShow={this.handleShow} handleClose={this.handleClose} />
                  :
                  <Redirect to="/login" />
                }
              </Route>
              <Route path="/outfits">
                { this.state.loggedIn ?
                  <Outfits categoriesWithItems={this.state.categoriesWithItems}/>
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
