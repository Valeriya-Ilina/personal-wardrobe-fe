import { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container, NavText, Button } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Personal Wardrobe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/items/?purchased=false">Wish List</Nav.Link>
                <Nav.Link href="/items/?purchased=true">Your Wardrobe</Nav.Link>
                <Nav.Link href="/outfits">Outfits</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown title="Sign In" id="collasible-nav-dropdown" menuVariant='dark'>
                <div className="d-grid gap-2">
                  <Button variant="secondary">Sign In</Button>
                </div>
                <NavDropdown.Divider />
                <p>Don't have an account?
                  <a href="#">Register</a>
                </p>
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
  }
}

export default Header;
