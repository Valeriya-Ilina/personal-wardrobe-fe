import { Component } from 'react'

const baseURL = process.env.REACT_APP_BASEURL

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      authenticationResult: ''
    }
  }

  loggingUser = async (event) => {
    event.preventDefault()

    const url = baseURL + '/api/v1/users/login'
    const loginBody = {
      email: this.state.email,
      password: this.state.password
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginBody),
        credentials: "include"
      })

      const json = await response.json()
      if (response.status === 200) {
        console.log("USER IS AUTHENTICATED")
        this.props.changeLoggedInStatus(json.data.username)
      } else {
        this.setState({
          authenticationResult: "Something went wrong",
          password:""
        })
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id] : event.target.value })
  }

  render() {
    console.log(this.state)
    return(
      <>
        <div>
          <form onSubmit={this.loggingUser}>
            <div>
              <input type="text" name="email" id="email" onChange={this.handleChange} value={this.state.email} placeholder="email" />
            </div>

            <div>
              <input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password} placeholder="password" />
            </div>

            <button type="submit">Login</button>
          </form>
        <p>{this.state.authenticationResult}</p>
        </div>
      </>
    )
  }
}

export default LoginForm;
