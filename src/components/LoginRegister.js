import { Component } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class LoginRegister extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <>
        <div>
          <h1>LoginRegister</h1>
          {
            this.props.userIntention == 'login' ?
            <LoginForm /> :
            <RegisterForm />
          }
        </div>
      </>
    )
  }
}

export default LoginRegister;
