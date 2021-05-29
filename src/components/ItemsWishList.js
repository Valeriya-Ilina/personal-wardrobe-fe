import { Component } from 'react'
import { Button, Offcanvas, Form, FloatingLabel } from 'react-bootstrap';
import CreatableSelectInput from './CreatableSelectInput'

let baseURL = 'http://127.0.0.1:8000'

class ItemsWishList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOffcanvas: false,
      name: "",
      brand: "",
      price: "",
      itemInStoreUrl: "",
      imageUrl: "",
      category_name: "",
      category_id: "",
      formSubmitStatus: ""
    }
  }

  componentDidMount() {
    this.props.getItems()
  }

  createItem = async () => {
    const url = baseURL + '/api/v1/items/'
    try {
      const itemBody = {
        "name": this.state.name,
        "is_purchased": false,
        "price": this.state.price,
        "imageUrl": this.state.imageUrl,
        "itemInStoreUrl": this.state.itemInStoreUrl,
        "brand": this.state.brand,
        "category_id": this.state.category_id
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemBody),
        credentials: "include"
      })

      if (response.status === 201) {
        this.props.getItems()
        return response.status
      }
    }
    catch (err) {
      console.log('Error => ', err)
    }
  }

  handleChange = (event) => {
    this.setState ({
      [event.target.id]: event.target.value
    })
  }

  handleCategoryChange = (newCategoryValue) => {
    if (newCategoryValue === undefined) {
      newCategoryValue = ""
    }

    // find category_id in categories
    let category_id = this.props.categories.find(category => {
      return category.name.toLowerCase() === newCategoryValue
    })?.id

    if (category_id === undefined) {
      category_id = ""
    }

    this.setState({
      category_id: category_id,
      category_name: newCategoryValue
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    // do not submit form if category is not entered (TODO: add a required field in form validation)
    if (!this.state.category_name) {
      return
    }

    // check if category already exists
    if(!this.state.category_id) {
      // add new category in the db
      console.log("CREATING NEW CATEGORY")
      await this.props.createCategory(this.state.category_name)
    }
    // continue adding new item using existing category
    const responseStatus = await this.createItem()

    console.log("NOW CREATING A NEW ITEM")
    // close side bar if item was created
    if (responseStatus === 201) {
      this.handleClose()
    }
    else {
      this.setState({
        formSubmitStatus: "Error. Something went wrong"
      })
    }
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
                  <Form onSubmit= { (event) => this.handleSubmit (event) } >
                    <FloatingLabel controlId="name" label="Name *" className="mb-3">
                      <Form.Control type="text" placeholder="Name" onChange= { (event) => this.handleChange(event)} required />
                    </FloatingLabel>
                    <FloatingLabel controlId="brand" label="Brand" className="mb-3">
                      <Form.Control type="text" placeholder="Brand" onChange= { (event) => this.handleChange(event)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="price" label="Price" className="mb-3">
                      <Form.Control type="text" placeholder="Price" onChange= { (event) => this.handleChange(event)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="imageUrl" label="Image URL *" className="mb-3">
                      <Form.Control type="text" placeholder="Image URL" onChange= { (event) => this.handleChange(event)} required />
                    </FloatingLabel>
                    <FloatingLabel controlId="itemInStoreUrl" label="Item URL in store" className="mb-3">
                      <Form.Control className="mb-3" type="text" placeholder="Item URL in store" onChange= { (event) => this.handleChange(event)} />
                    </FloatingLabel>
                    <CreatableSelectInput categories={this.props.categories} handleCategoryChange={this.handleCategoryChange}/>
                    <Form.Text className="text-muted mb-3">
                      <div>* is a required field</div>
                    </Form.Text>
                    <Button variant="primary" type="submit">Submit</Button>
                    <p>{this.state.formSubmitStatus}</p>
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
