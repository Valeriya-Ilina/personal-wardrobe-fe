import { Component } from 'react'
import { Button, Offcanvas, Form, FloatingLabel } from 'react-bootstrap';
import CreatableSelectInput from './CreatableSelectInput'
import SideMenu from './SideMenu'

let baseURL = 'http://127.0.0.1:8000'

class ItemsWishList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOffcanvas: false,
      itemCurrentlyBeingEdited: null
    }
  }

  componentDidMount() {
    this.props.getItems()
  }

  editItem = (item) => {
    this.handleShow()
    this.setState({
      itemCurrentlyBeingEdited: item
    })
  }


  // Offcanvas methods (side menu)
  setShow = (boolean) => {
    this.setState({
      showOffcanvas: boolean
    })
  }

  handleClose = () => {
    this.setShow(false)

    // clear form
    this.setState({
      itemCurrentlyBeingEdited: null
    })
  }

  handleShow = () => {
    this.setShow(true)
  }


  render() {
    console.log(this.state)
    const wishListItems = this.props.items.filter(item => !item.is_purchased)
    return(
      <>
        <div>
          <h1>Wish list items</h1>
          {
            wishListItems.map((item, idx) => {
              return (
                <div key={idx}>
                  <img class='item' src={item.imageUrl} />
                  <p>${item.price}</p>
                  <a href={item.itemInStoreUrl}>Go to store</a>
                  <button onClick={()=>this.editItem(item)}>Edit</button>
                </div>
              )
            })
          }
          <Button onClick={this.handleShow}><img src="https://icons-for-free.com/iconfiles/png/512/circle+create+new+plus+sign+icon-1320085936892806512.png" class='add-item-btn'/></Button>
        </div>


        <div>
          <SideMenu showOffcanvas={this.state.showOffcanvas} getItems={this.props.getItems} handleClose={this.handleClose} categories={this.props.categories} createCategory={this.props.createCategory} itemCurrentlyBeingEdited={this.state.itemCurrentlyBeingEdited} editItem={this.editItem}/>
        </div>


      </>
    )
  }
}

export default ItemsWishList;
