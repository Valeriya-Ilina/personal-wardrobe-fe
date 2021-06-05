import { Component } from 'react'
import { Button } from 'react-bootstrap'
import SelectableCategory from './SelectableCategory'
import OutfitBox from './OutfitBox'
import OutfitNewForm from './OutfitNewForm'

const baseURL = process.env.REACT_APP_BASEURL

class Outfits extends Component {
  constructor(props) {
    super(props)

    this.state = {
      outfits: [],
      idOfOutfitToBeEdited: -1,
      allItemsInAllOutfits: [],
      selectedOutfitItems: [],
      isOutfitNewFormOpen: false
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

  addOutfit = async (newOutfit) => {
    const copyOutfits = [...this.state.outfits]
    copyOutfits.push(newOutfit)
    this.setState({
      outfits: copyOutfits,
      isOutfitNewFormOpen: false
    })
  }

  editOutfit = (outfit) => {
    this.getSelectedOutfitItems(outfit.id)
    console.log(outfit.id)

    this.setState({
      idOfOutfitToBeEdited: outfit.id
    })
  }

  deleteOutfit = async () => {
    const id = this.state.idOfOutfitToBeEdited
    console.log(id)
    const url = baseURL + '/api/v1/outfits/' + id
    try {
      const response = await fetch( url, {
        method: 'DELETE',
        credentials: "include"
      })
      if (response.status === 200){
        const findIndex = this.state.outfits.findIndex(outfit => outfit.id === id)
        let copyOutfits = [...this.state.outfits]
        copyOutfits.splice(findIndex, 1)

        this.setState({
          outfits: copyOutfits,
          idOfOutfitToBeEdited: -1
        })
      }
    }
    catch(err){
      console.log('Error =>', err)
    }
  }

  addSelectedOutfitItemInDatabase = async (itemWithCoordinates) => {
    const url = baseURL + '/api/v1/outfit-collections/'
    console.log('in addSelectedOutfitItemInDatabase saving ', itemWithCoordinates)

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
        console.log("ITEM WITH COORDINATES IS CREATED WITH ID ", responseBody.data.id)
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

  editSelectedOutfitItemInDatabase = async (id, itemSizePosition) => {
    const url = baseURL + '/api/v1/outfit-collections/' + id

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(itemSizePosition),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.status === 200) {
        console.log('image position and size updated')
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
  }


  addSelectedOutfitItem = async (itemWithCoordinates) => {
    // call to backend to POST
    const newItemWithCoordinates = await this.addSelectedOutfitItemInDatabase(itemWithCoordinates)
    await this.props.getItems();
    await this.getItemsInOutfits()
    this.getSelectedOutfitItems(this.state.idOfOutfitToBeEdited)

    // // update in state
    // const copyAllItemsInAllOutfits = [...this.state.allItemsInAllOutfits]
    // const copySelectedOutfitItems = [...this.state.selectedOutfitItems]
    // copyAllItemsInAllOutfits.push(newItemWithCoordinates)
    // copySelectedOutfitItems.push(newItemWithCoordinates)

    // this.setState({
    //   allItemsInAllOutfits: copyAllItemsInAllOutfits,
    //   selectedOutfitItems: copySelectedOutfitItems
    // }, () => {
    //   console.log('newItemWithCoordinates is ', newItemWithCoordinates)
    //   console.log('selectedOutfitItems are ', this.state.selectedOutfitItems)
    // })
  }

  removeSelectedOutfitItem = async (itemOutfit) => {
    // call to backend to DELETE
    await this.removeSelectedOutfitItemInDatabase(itemOutfit.id)
    await this.props.getItems();
    await this.getItemsInOutfits()
    this.getSelectedOutfitItems(this.state.idOfOutfitToBeEdited)

    // update in state
    // const copyAllItemsInAllOutfits = [...this.state.allItemsInAllOutfits]
    // const copySelectedOutfitItems = [...this.state.selectedOutfitItems]

    // console.log("itemOutfit - ", itemOutfit)
    // this.setState({
    //   allItemsInAllOutfits: copyAllItemsInAllOutfits.filter(io => io.id !== itemOutfit.id),
    //   selectedOutfitItems: copySelectedOutfitItems.filter(io => io.id !== itemOutfit.id)
    // }, () => {
    //   console.log('after removal selectedOutfitItems is ', this.state.selectedOutfitItems)
    //   this.getItemsInOutfits()
    // })
  }

  editSelectedOutfitItem = (itemOutfitId, itemSizePosition) => {
    // call to backend to PUT
    this.editSelectedOutfitItemInDatabase(itemOutfitId, itemSizePosition)

    // update in state
    //
    const allItemsClone = [...this.state.allItemsInAllOutfits];
    const selectedItemsClone = [...this.state.selectedOutfitItems];
    const modifiedItemIndex = this.state.allItemsInAllOutfits.findIndex(item => item.id === itemOutfitId);
    const modifiedItemIndexInSelected = this.state.selectedOutfitItems.findIndex(item => item.id === itemOutfitId)
    const oldItem = this.state.allItemsInAllOutfits[modifiedItemIndex];
    const oldItemInSelected = this.state.selectedOutfitItems[modifiedItemIndexInSelected]
    allItemsClone[modifiedItemIndex] = {
      ...oldItem,
      ...itemSizePosition
    };
    selectedItemsClone[modifiedItemIndexInSelected] = {
      ...oldItemInSelected,
      ...itemSizePosition
    }
    this.setState({
      allItemsInAllOutfits: allItemsClone,
      selectedOutfitItems: selectedItemsClone
    });
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



  showOutfitNewForm = () => {
    this.setState({
      isOutfitNewFormOpen: !this.state.isOutfitNewFormOpen
    })
  }

  hideOutfitNewForm = () => {
    this.setState({
      isOutfitNewFormOpen: !this.state.isOutfitNewFormOpen
    })
  }


  render() {
    console.log(this.state)
    return(
      <div class="container">
        <h1>Outfits</h1>
        <div className="outfits-container">
          {
            this.state.outfits.map((outfit, idx) => {
              return (
                <Button key={idx} className="outfit-name-btn" onClick={() => this.editOutfit(outfit)} variant="link">{outfit.name}</Button>
              )
            })
          }
          <div>
            <Button onClick={this.showOutfitNewForm} variant="outline-dark" id="add-new-outfit-btn">add new outfit</Button>
            {this.state.selectedOutfitItems.length ? "" : <Button onClick={() => this.deleteOutfit()} variant="light" id="delete-outfit-btn">Detete current outfit</Button>}
            {
              this.state.isOutfitNewFormOpen ? <OutfitNewForm addOutfit={this.addOutfit}/> : ""
            }
          </div>
          {
            // if === -1, do not show components, otherwise, show the selected outfit
            this.state.idOfOutfitToBeEdited != -1 ?

            <>
              <OutfitBox idOfOutfitToBeEdited={this.state.idOfOutfitToBeEdited} selectedOutfitItems={this.state.selectedOutfitItems} deleteOutfit={this.deleteOutfit} editSelectedOutfitItem={this.editSelectedOutfitItem}/>
              <div className="categories-with-items-container">
                <SelectableCategory categoriesWithItems={this.props.categoriesWithItems} idOfOutfitToBeEdited={this.state.idOfOutfitToBeEdited} selectedOutfitItems={this.state.selectedOutfitItems} addSelectedOutfitItem={this.addSelectedOutfitItem} removeSelectedOutfitItem={this.removeSelectedOutfitItem}
                editSelectedOutfitItem={this.editSelectedOutfitItem} />
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
