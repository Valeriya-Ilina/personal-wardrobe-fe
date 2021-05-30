import { Component } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import CreatableSelectInput from './CreatableSelectInput'

let baseURL = 'http://127.0.0.1:8000'

class NewItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      brand: "",
      price: "",
      imageUrl: "",
      imageInStoreUrl: "",
      category_name: "",
      category_id: "",
      formSubmitStatus: "",
    }
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
      const createdCategory = await this.props.createCategory(this.state.category_name)
      const category_id = createdCategory.id
      this.setState({
        category_id: category_id
      })
    }

    // continue adding new item using existing category
    console.log("CREATING A NEW ITEM")
    const responseStatus = await this.createItem()

    // close side bar if item was created (201) or edited (200) successfully
    if (responseStatus === 200 || responseStatus === 201) {
      this.props.handleClose()
    }
    else {
      this.setState({
        formSubmitStatus: "Error. Something went wrong"
      })
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

  render() {
    console.log(this.state)
    return (
      <Form onSubmit= { (event) => this.handleSubmit (event) } >
        <FloatingLabel controlId="name" label="Name *" className="mb-3">
          <Form.Control type="text" placeholder="Name" value={this.state.name} onChange= { (event) => this.handleChange(event)} required />
        </FloatingLabel>
        <FloatingLabel controlId="brand" label="Brand" className="mb-3">
          <Form.Control type="text" placeholder="Brand" value={this.state.brand} onChange= { (event) => this.handleChange(event)} />
        </FloatingLabel>
        <FloatingLabel controlId="price" label="Price" className="mb-3">
          <Form.Control type="text" placeholder="Price" value={this.state.price} onChange= { (event) => this.handleChange(event)} />
        </FloatingLabel>
        <FloatingLabel controlId="imageUrl" label="Image URL *" className="mb-3">
          <Form.Control type="text" placeholder="Image URL" value={this.state.imageUrl} onChange= { (event) => this.handleChange(event)} required />
        </FloatingLabel>
        <FloatingLabel controlId="itemInStoreUrl" label="Item URL in store" className="mb-3">
          <Form.Control className="mb-3" type="text" placeholder="Item URL in store" value={this.state.itemInStoreUrl} onChange= { (event) => this.handleChange(event)} />
        </FloatingLabel>
        <CreatableSelectInput categories={this.props.categories} handleCategoryChange={this.handleCategoryChange} category_name={this.state.category_name}/>
        <Form.Text className="text-muted mb-3">
          <div>* is a required field</div>
        </Form.Text>
        <Button variant="success" type="submit">Submit</Button>
        <p>{this.state.formSubmitStatus}</p>
      </Form>
    )
  }
}

export default NewItemForm;
