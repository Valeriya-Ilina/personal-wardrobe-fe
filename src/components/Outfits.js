import { Component } from 'react'
import SelectableCategory from './SelectableCategory'

const baseURL = process.env.REACT_APP_BASEURL

class Outfits extends Component {
  constructor(props) {
    super(props)

    this.state = {
      outfits: [],
      idOfOutfitToBeEdited: -1,
      allItemsInAllOutfits: [],
      selectedOutfitItems: [],
      categoriesWithItems: this.props.categoriesWithItems // temporarily
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
    console.log(outfit.id)

    // console.log(event.target.attributes.index.value)
    this.setState({
      idOfOutfitToBeEdited: outfit.id
    })
  }

  addSelectedOutfitItemInDatabase = async (itemWithCoordinates) => {
    const url = baseURL + '/api/v1/outfit-collections/'
    console.log(itemWithCoordinates)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(itemWithCoordinates)
      })

      const responseBody = await response.json()
      console.log(responseBody)
      if (response.status === 201) {
        console.log("ITEM WITH COORDINATES IS CREATED")
        return responseBody.data
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  removeSelectedOutfitItemInDatabase = async (itemOutfitId) => {
    const url = baseURL + '/api/v1/outfit-collections/' + itemOutfitId

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (response.status === 200) {
        console.log("DELETED ITEM WITH COORDINATES WITH ID " + itemOutfitId)
        return itemOutfitId
      }
    }
    catch(err){
      console.log('Error =>', err)
    }
  }


  addSelectedOutfitItem = async (itemWithCoordinates) => {
    const copyAllItemsInAllOutfits = [...this.state.allItemsInAllOutfits]
    const copySelectedOutfitItems = [...this.state.selectedOutfitItems]

    // fetch call to api backend to POST
    const newItemWithCoordinates = await this.addSelectedOutfitItemInDatabase(itemWithCoordinates)
    console.log(itemWithCoordinates)

    copyAllItemsInAllOutfits.push(newItemWithCoordinates)
    copySelectedOutfitItems.push(newItemWithCoordinates)

    this.setState({
      allItemsInAllOutfits: copyAllItemsInAllOutfits,
      selectedOutfitItems: copySelectedOutfitItems
    })
  }

  removeSelectedOutfitItem = async (itemOutfitId) => {
    const copyAllItemsInAllOutfits = [...this.state.allItemsInAllOutfits]
    const copySelectedOutfitItems = [...this.state.selectedOutfitItems]

    // fetch call to api backend to DELETE
    await this.removeSelectedOutfitItemInDatabase(itemOutfitId)

    // remove
    const findIndexInAll = this.state.allItemsInAllOutfits.findIndex(item => item.id === itemOutfitId)
    console.log(findIndexInAll)
    const findIndexInSelected = this.state.selectedOutfitItems.findIndex(item => item.id === itemOutfitId)

    copyAllItemsInAllOutfits.splice(findIndexInAll, 1)
    copySelectedOutfitItems.splice(findIndexInSelected, 1)

    this.setState({
      allItemsInAllOutfits: copyAllItemsInAllOutfits,
      selectedOutfitItems: copySelectedOutfitItems
    })
  }

  // get all items in all outfits for user from backend
  getItemsInOutfits = async () => {
    const url = baseURL + '/api/v1/outfit-collections/'
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: "include"
      })
      // convert response to json
      const jsonResponse = await response.json()

      if (response.status === 200) {
        this.setState({
          allItemsInAllOutfits: jsonResponse.data
        })
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  // filter selected items based on selected outfit
  getSelectedOutfitItems = (outfit_id) => {
    const selectedOutfitItems = this.state.allItemsInAllOutfits.filter(element => element.outfit_id.id === outfit_id)

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
                <SelectableCategory categoriesWithItems={this.props.categoriesWithItems} idOfOutfitToBeEdited={this.state.idOfOutfitToBeEdited} selectedOutfitItems={this.state.selectedOutfitItems} addSelectedOutfitItem={this.addSelectedOutfitItem} removeSelectedOutfitItem={this.removeSelectedOutfitItem} />
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
