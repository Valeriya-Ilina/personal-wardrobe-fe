import { Component } from 'react'

let baseURL = 'http://127.0.0.1:8000'

class Outfits extends Component {
  constructor(props) {
    super(props)

    this.state = {
      outfits: [],
      idOfOutfitToBeEdited: -1,
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

  editOutfit = (outfit) => {
    // console.log(event.target.attributes.index.value)
    this.setState({
      idOfOutfitToBeEdited: outfit.id
    })
  }


  render() {
    console.log(this.state)
    return(
      <div>
        <h1>Outfits</h1>
        <div className="outfits-container">
          <h3>Outfit list</h3>
          {
            this.state.outfits.map((outfit, idx) => {
              return (
                <button key={idx} onClick={() => this.editOutfit(outfit)}>{outfit.name}</button>
              )
            })
          }
          {
            // if === -1, do not show components, otherwise, show the selected outfit
            this.state.idOfOutfitToBeEdited != -1 ?

            <>
              <div className="categories-with-items-container">
                <h3>Categories with items list for {this.state.idOfOutfitToBeEdited}</h3>
                {
                  // map through the list of categories
                  this.props.categoriesWithItems.map((categoryWithItems, idx) => {
                    return (
                      <div key={idx}>
                        <p>{categoryWithItems.category_name}</p>
                        {
                          // map through the list of items in each category
                          categoryWithItems.items.map((item, idx) => <img src={item.imageUrl} className="item-image-in-outfit" key={idx}/> )
                        }

                      </div>
                    )
                  })
                }
              </div>
              <div className="outfit-box">
                <p>box</p>
              </div>
            </>

            :

            ""
          }

        </div>
      </div>
    )
  }
}

export default Outfits;
