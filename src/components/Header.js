import { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container, NavText, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import LoginRegister from './LoginRegister'


class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">Personal Wardrobe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/items/?purchased=false">Wish List</Nav.Link>
                <Nav.Link as={Link} to="/items/?purchased=true">Your Wardrobe</Nav.Link>
                <Nav.Link as={Link} to="/outfits">Outfits</Nav.Link>
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

        <Switch>
          <Route exact path="/">
            { this.props.loggedIn ?
              <Redirect to="/items/?purchased=false" />
              :
              <Redirect to="/home" />
            }
          </Route>
          <Route path="/login">
            { this.props.loggedIn ?
              <Redirect to="/items/?purchased=false" />
              :
              <LoginRegister userIntention="login"/>
            }
          </Route>
          <Route path="/register">
            { this.props.loggedIn ?
              <Redirect to="/items/?purchased=false" />
              :
              <LoginRegister userIntention="register" />
            }
          </Route>
          <Route path="/home">
            { this.props.loggedIn ?
              <Redirect to="/items/?purchased=false" />
              :
              <Redirect to="/home" />
            }
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Header;
