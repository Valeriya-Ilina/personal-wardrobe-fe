import { Component } from 'react'
import { Button, Offcanvas, Form, FloatingLabel } from 'react-bootstrap';
import CreatableSelectInput from './CreatableSelectInput'

class ItemsWishList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOffcanvas: false
    }
  }

  componentDidMount() {
    this.props.getItems()
  }

  // Offcanvas methods (side menu)
  setShow = (boolean) => {
    this.setState({
      showOffcanvas: boolean
    })
  }

  handleClose = () => {
    this.setShow(false)
  }

  handleShow = () => {
    this.setShow(true)
  }


  render() {
    const wishListItems = this.props.items.filter(item => !item.is_purchased)
    console.log(wishListItems)
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

                </div>
              )
            })
          }
          <Button onClick={this.handleShow}><img src="https://icons-for-free.com/iconfiles/png/512/circle+create+new+plus+sign+icon-1320085936892806512.png" class='add-item-btn'/></Button>
        </div>


        <div>
          {
            <>
              <Offcanvas show={this.state.showOffcanvas} onHide={this.handleClose} key='end' placement='end' name='end'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Add New Item</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form>
                    <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                      <Form.Control type="email" placeholder="Name" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Brand" className="mb-3">
                      <Form.Control type="text" placeholder="Brand" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
                      <Form.Control type="text" placeholder="Price" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Image URL" className="mb-3">
                      <Form.Control type="text" placeholder="Image URL" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Item URL in store" className="mb-3">
                      <Form.Control type="text" placeholder="Item URL in store" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Enter or select Category..." className="mb-3">
                      <Form.Control type="text" list="datalistOptions" placeholder="Item URL in store" />
                      <datalist id="datalistOptions">
                        {
                          this.props.categories.map(category => {
                            return (
                              <option key={category.id} value={category.name} />
                            )
                          })
                        }
                      </datalist>
                    </FloatingLabel>
                    <CreatableSelectInput categories={this.props.categories} handleCategoryChange={this.handleCategoryChange}/>
                    <Button variant="primary" type="submit">Submit</Button>
                  </Form>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          }
        </div>


      </>
    )
  }
}

export default ItemsWishList;
