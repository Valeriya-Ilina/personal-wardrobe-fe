import { Component } from 'react'

const baseURL = process.env.REACT_APP_BASEURL

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      registerResult: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id] : event.target.value })
  }

  registerUser = async (event) => {
    event.preventDefault()

    const url = baseURL + '/api/v1/users/register'
    const registerBody = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerBody)
      })

      if (response.status === 201) {
        console.log("USER IS CREATED")
        this.setState({
          registerResult: "USER IS CREATED"
        })
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  render() {
    console.log(this.state)
    return(
      <>
      <form onSubmit={this.registerUser}>
        <div>
          <input type="text" name="username" id="username" placeholder="username" onChange={this.handleChange} />
        </div>

        <div>
          <input type="text" name="email" id="email" placeholder="email" onChange={this.handleChange} />
        </div>

        <div>
          <input type="password" name="password" id="password" placeholder="password" onChange={this.handleChange}/>
        </div>

        <button type="submit">Create</button>
      </form>
      <p>{this.state.registerResult}</p>
      </>
    )
  }
}

export default RegisterForm;
