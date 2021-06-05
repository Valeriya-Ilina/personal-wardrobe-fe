import { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASEURL

class Header extends Component {

  logoutUser = async () => {
    const url = baseURL + '/api/v1/users/logout'
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: "include"
      })
      if (response.status === 200) {
        console.log("USER IS LOGGED OUT")
        this.props.changeLoggedInStatus()
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  render() {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar" >
          <Container>
            <Navbar.Brand as={Link} to="/home">Personal Wardrobe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/wishlist">Wish List</Nav.Link>
                <Nav.Link as={Link} to="/wardrobe">Your Wardrobe</Nav.Link>
                <Nav.Link as={Link} to="/outfits">Outfits</Nav.Link>
              </Nav>
              <Nav>
              {
                this.props.loggedIn ?
                <>
                  <Navbar.Text id='username-text'>
                    {this.props.username}
                  </Navbar.Text>
                  <Nav>
                    <Nav.Link as={Link} onClick={this.logoutUser}>Logout</Nav.Link>
                  </Nav>

                </>
                :
                <Navbar.Collapse className="justify-content-end">
                  <NavDropdown title="Sign In" id="collasible-nav-dropdown" menuVariant='dark'>
                  <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/register">Don't have an account? Register</NavDropdown.Item>

                  </NavDropdown>
                </Navbar.Collapse>
              }
              </Nav>

            </Navbar.Collapse>



          </Container>
        </Navbar>
    )
  }
}

export default Header;
