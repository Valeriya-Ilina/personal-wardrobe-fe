import { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

let baseURL = 'http://127.0.0.1:8000'

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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/home">Personal Wardrobe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/wishlist">Wish List</Nav.Link>
                <Nav.Link as={Link} to="/wardrobe">Your Wardrobe</Nav.Link>
                <Nav.Link as={Link} to="/outfits">Outfits</Nav.Link>
              </Nav>
            </Navbar.Collapse>

            {
              this.props.loggedIn ?
              <>
                Username
                <Link onClick={this.logoutUser}>Logout</Link>
              </>
              :
              <Navbar.Collapse className="justify-content-end">
                <NavDropdown title="Sign In" id="collasible-nav-dropdown" menuVariant='dark'>
                  <div className="d-grid gap-2">
                    <Button href="/login" variant="secondary">Sign In</Button>
                  </div>
                  <NavDropdown.Divider />
                  <p>Don't have an account?
                    <a href="/register">Register</a>
                  </p>
                </NavDropdown>
              </Navbar.Collapse>
            }
          </Container>
        </Navbar>
    )
  }
}

export default Header;
