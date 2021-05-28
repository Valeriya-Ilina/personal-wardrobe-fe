import { Component } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';

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
            wishListItems.map(item => {
              return (
                <div>
                  <img class='item' src={item.url} />
                  <p>${item.price}</p>
                  <a href={item.url}>Go to store</a>

                </div>
              )
            })
          }
          <Button><img src="https://icons-for-free.com/iconfiles/png/512/circle+create+new+plus+sign+icon-1320085936892806512.png" class='add-item-btn'/></Button>
        </div>


        <div>
          {
            <>
              <Button variant="primary" onClick={this.handleShow} className="me-2">end</Button>
              <Offcanvas show={this.state.showOffcanvas} onHide={this.handleClose} key='end' placement='end' name='end'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  Some text as placeholder. In real life you can have the elements you
                  have chosen. Like, text, images, lists, etc.
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
