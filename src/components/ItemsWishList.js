import { Component } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import SideMenu from './SideMenu'

class ItemsWishList extends Component {

  componentDidMount() {
    this.props.getItems()
  }

  render() {
    // filter categories with items that are NOT purchased
    const categoriesWithItemsWishList = []
    this.props.categoriesWithItems.forEach(category => {
      const itemsNotPurchased = !!category.items.find(item => !item.is_purchased)
       if (itemsNotPurchased) {
         const items = category.items.filter(item => !item.is_purchased)
         categoriesWithItemsWishList.push({...category, items})
       }
    })

    return(
      <div class='container'>
        <div class="items-wish-list-container">
          <h1>Wish list items</h1>
          <Button onClick={this.props.handleShow} id="add-new-item-btn" variant="dark">Add New Item</Button>
          {
            categoriesWithItemsWishList.map((category, idx) => {
              return (
                <Container key={idx}>
                  <Row>
                    <div>
                      <h3 class="category-name">{category.category_name}</h3>
                      <div class="category-items">
                      {
                        category.items.map((item, idx) => {
                          return (
                            <div class="item" key={idx} >
                              <Button onClick={()=>this.props.editItem(item)} variant="dark" id="edit-item-btn">
                                <img class='item-image' src={item.imageUrl} alt={item.name} />
                              </Button>
                              <p>${item.price}</p>
                              <Button href={item.itemInStoreUrl} variant="link">Go to {item.brand} store</Button>
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
          <SideMenu showOffcanvas={this.props.showOffcanvas} getItems={this.props.getItems} handleClose={this.props.handleClose} categories={this.props.categories} createCategory={this.props.createCategory} itemCurrentlyBeingEdited={this.props.itemCurrentlyBeingEdited} editItem={this.props.editItem}  deleteItemFromState={this.props.deleteItemFromState} is_purchased={this.props.is_purchased} />
        </div>
      </div>
    )
  }
}

export default ItemsWishList;
