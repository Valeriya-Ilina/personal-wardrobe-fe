import { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class LoginRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key: this.props.userIntention
    }
  }

  setKey = (key) => {
    this.setState({
      key: key
    })
  }

  render() {
    return(
      <>
        <div >
          <Tabs
            id="login-register-tabs"
            activeKey={this.state.key}
            onSelect={(k) => this.setKey(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="login" title="Login">
              <LoginForm changeLoggedInStatus={this.props.changeLoggedInStatus}/>
            </Tab>
            <Tab eventKey="register" title="Register">
              <RegisterForm />
            </Tab>
          </Tabs>
        </div>
      </>
    )
  }
}

export default LoginRegister;
