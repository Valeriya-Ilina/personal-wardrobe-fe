import { Component } from 'react'

let baseURL = 'http://127.0.0.1:8000'

class Outfits extends Component {
  constructor(props) {
    super(props)

    this.state = {
      outfits: []
    }
  }

  componentDidMount() {
    this.getOutfits()
  }

  getOutfits = async () => {
    const url = baseURL + '/api/v1/outfits/'
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: "include"
      })
      // convert response to json
      const jsonResponse = await response.json()

      if (response.status === 200) {
        this.setState({
          outfits: jsonResponse.data
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
      <div>
        <h1>Outfits</h1>
        <div className="outfits-container">
          {
            this.state.outfits.map(outfit => {
              return (
                <p>{outfit.name}</p>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Outfits;
