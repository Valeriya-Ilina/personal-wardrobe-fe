import { Component } from 'react'
import SelectableImage from './SelectableImage'

const baseURL = process.env.REACT_APP_BASEURL

class Outfits extends Component {
  constructor(props) {
    super(props)

    this.state = {
      outfits: [],
      idOfOutfitToBeEdited: -1,
      itemsInOutfits: [],
      selectedOutfitItems: []
    }
  }

  componentDidMount() {
    this.getOutfits()
    this.getItemsInOutfits()
  }

  // get all outfit names and dates for user
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
    this.getSelectedOutfitItems(outfit.id)

    // console.log(event.target.attributes.index.value)
    this.setState({
      idOfOutfitToBeEdited: outfit.id
    })
  }

  // get all items in all outfits for user
  getItemsInOutfits = async (outfit_id) => {
    const url = baseURL + '/api/v1/outfit-collections/?outfit_id=' + outfit_id
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: "include"
      })
      // convert response to json
      const jsonResponse = await response.json()

      if (response.status === 200) {
        this.setState({
          itemsInOutfits: jsonResponse.data
        })
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  getSelectedOutfitItems = (outfit_id) => {
    const selectedOutfitItems = this.state.itemsInOutfits.filter(element => element.outfit_id.id === outfit_id)

    this.setState({
      selectedOutfitItems: selectedOutfitItems
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
                  this.props.categoriesWithItems.map((categoryWithItems, categoryIndex) => {
                    return (
                      <div key={categoryIndex}>
                        <p>{categoryWithItems.category_name}</p>
                        {
                          // map through the list of items in each category
                          categoryWithItems.items.map((item, itemIndex) => {
                            return (
                              <SelectableImage item={item} categoryIndex={categoryIndex} itemIndex={itemIndex}/>
                            )
                          })
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
