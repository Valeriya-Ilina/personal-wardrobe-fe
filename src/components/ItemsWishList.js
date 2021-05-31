import { Component } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import SideMenu from './SideMenu'

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
    // filter categories with items that are not purchased
    const categoriesWithItemsWishList = []
    this.props.categoriesWithItems.forEach(category => {
      const itemsNotPurchased = !!category.items.find(item => !item.is_purchased)
       if (itemsNotPurchased) {
         const items = category.items.filter(item => !item.is_purchased)
         categoriesWithItemsWishList.push({...category, items})
       }
    })


    return(
      <>
        <div class="items-wish-list-container">
          <h1>Wish list items</h1>
          <Button onClick={this.handleShow} id="add-new-item-btn">Add New Item</Button>
          {
            categoriesWithItemsWishList.map((category, idx) => {
              return (
                <Container key={idx}>
                  <Row>
                    <div>
                      <h3>{category.category_name}</h3>
                      <div class="category-items">
                      {
                        category.items.map((item, idx) => {
                          return (
                            <div class="item" key={idx} >
                              <img class='item-image' src={item.imageUrl} alt={item.name} />
                              <p>${item.price}</p>
                              <a href={item.itemInStoreUrl}>Go to store</a>
                              <button onClick={()=>this.editItem(item)}>Edit</button>
                            </div>
                          )
                        })
                      }
                      </div>
                    </div>
                  </Row>
                </Container>
              )
            })
          }
        </div>

        <div>
          <SideMenu showOffcanvas={this.state.showOffcanvas} getItems={this.props.getItems} handleClose={this.handleClose} categories={this.props.categories} createCategory={this.props.createCategory} itemCurrentlyBeingEdited={this.state.itemCurrentlyBeingEdited} editItem={this.editItem}  deleteItemFromState={this.props.deleteItemFromState} />
        </div>
      </>
    )
  }
}

export default ItemsWishList;
