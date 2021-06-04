import { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './../App.css'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div class='container'>
        <div class="home-image">
          <img src='./images/main_page7.jpeg' class="backgroundImg7" />
          <Button as={Link} to='/wishlist' class="btn">Wish List</Button>
        </div>
        <div class='container'>
          <div class='row'>
            <span class="home-image">
              <img src='./images/main_page2.jpeg' class="backgroundImg2" />
              <Button as={Link} to='/wishlist' class="btn">Your Wardrobe</Button>
            </span>
            <span class="home-image">
              <img src='./images/main_page4.jpeg' class="backgroundImg4" />
              <Button as={Link} to='/wishlist' class="btn">Outfits</Button>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
