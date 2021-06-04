import { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import dayjs from 'dayjs'

const baseURL = process.env.REACT_APP_BASEURL

class OutfitNewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      result: ""
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id] : event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const url = baseURL + '/api/v1/outfits/'
    const body = {
      name: this.state.name,
      date: dayjs().format('DD-MM-YYYY')
    }
    console.log(body)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
      })

      if (response.status === 201) {
        console.log("OUTFIT IS CREATED")
        const newOutfit = await response.json()
        this.props.addOutfit(newOutfit.data)

      }
      else {
        this.setState({
          result: "Something went wrong"
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
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormControl type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name} placeholder="name" />
            <Button type="submit">Submit</Button>
            {
              this.state.result ? <p>{this.state.result}</p> : ""
            }
          </Form>
        </div>
      </>
    )
  }
}

export default OutfitNewForm;
