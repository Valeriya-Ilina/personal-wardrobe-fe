import { Component } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import CreatableSelectInput from './CreatableSelectInput'

let baseURL = 'http://127.0.0.1:8000'

class EditItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formSubmitStatus: ""
    }
  }

  updateItem = async () => {
    const url = baseURL + '/api/v1/items/' + this.props.itemCurrentlyBeingEdited.id
    try {
      const itemBody = {
        "name": this.props.itemCurrentlyBeingEdited.name,
        "price": this.props.itemCurrentlyBeingEdited.price,
        "imageUrl": this.props.itemCurrentlyBeingEdited.imageUrl,
        "itemInStoreUrl": this.props.itemCurrentlyBeingEdited.itemInStoreUrl,
        "brand": this.props.itemCurrentlyBeingEdited.brand,
        "category_id": this.props.itemCurrentlyBeingEdited.category_id.id
      }
      console.log(itemBody)

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemBody),
        credentials: "include"
      })

      if (response.status === 200) {
        this.props.handleClose()
        this.props.getItems()
        this.props.editItem(null)
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
    if (!this.props.itemCurrentlyBeingEdited.category_id.name) {
      return
    }

    console.log(this.props.itemCurrentlyBeingEdited.category_id.id)
    console.log(this.props.itemCurrentlyBeingEdited.category_id.name)
    // check if category already exists
    if(!this.props.itemCurrentlyBeingEdited.category_id.id) {
      // add new category in the db
      console.log("CREATING NEW CATEGORY")
      const createdCategory = await this.props.createCategory(this.props.itemCurrentlyBeingEdited.category_id.name)
      console.log(createdCategory)

      const updatedItemCurrentlyBeingEdited = {
        ...this.props.itemCurrentlyBeingEdited,
        category_id: {
          id: createdCategory.id,
          name: createdCategory.name
        }
      }

      this.props.editItem(updatedItemCurrentlyBeingEdited)

      // this.setState({
      //   category_id: category_id
      // })
    }

    console.log("EDITING EXISTING ITEM")
    const responseStatus = await this.updateItem()

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

  handleEditChange = (event) => {
    const target = {...this.props.itemCurrentlyBeingEdited}
    const source = {
      [event.target.id]: event.target.value
    }
    const newItemCurrentlyBeingEdited = Object.assign(target, source)

    this.props.editItem(newItemCurrentlyBeingEdited)
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

    // update category id and name in the itemCurrentlyBeingEdited
    const updatedItemCurrentlyBeingEdited = {
      ...this.props.itemCurrentlyBeingEdited,
      category_id: {
        id: category_id,
        name: newCategoryValue
      }
    }

    this.props.editItem(updatedItemCurrentlyBeingEdited)
  }

  render() {
    console.log(this.state)
    return (
      <Form onSubmit= { (event) => this.handleSubmit (event) } >
        <FloatingLabel controlId="name" label="Name *" className="mb-3">
          <Form.Control type="text" placeholder="Name" value={this.props.itemCurrentlyBeingEdited?.name} onChange= { (event) => this.handleEditChange(event)} required />
        </FloatingLabel>
        <FloatingLabel controlId="brand" label="Brand" className="mb-3">
          <Form.Control type="text" placeholder="Brand" value={this.props.itemCurrentlyBeingEdited?.brand} onChange= { (event) => this.handleEditChange(event)} />
        </FloatingLabel>
        <FloatingLabel controlId="price" label="Price" className="mb-3">
          <Form.Control type="text" placeholder="Price" value={this.props.itemCurrentlyBeingEdited?.price} onChange= { (event) => this.handleEditChange(event)} />
        </FloatingLabel>
        <FloatingLabel controlId="imageUrl" label="Image URL *" className="mb-3">
          <Form.Control type="text" placeholder="Image URL" value={this.props.itemCurrentlyBeingEdited?.imageUrl} onChange= { (event) => this.handleEditChange(event)} required />
        </FloatingLabel>
        <FloatingLabel controlId="itemInStoreUrl" label="Item URL in store" className="mb-3">
          <Form.Control className="mb-3" type="text" placeholder="Item URL in store" value={this.props.itemCurrentlyBeingEdited?.itemInStoreUrl} onChange= { (event) => this.handleEditChange(event)} />
        </FloatingLabel>
        <CreatableSelectInput categories={this.props.categories} handleCategoryChange={this.handleCategoryChange} category_name={this.props.itemCurrentlyBeingEdited?.category_id.name} />
        <Form.Text className="text-muted mb-3">
          <div>* is a required field</div>
        </Form.Text>
        <Button variant="success" type="submit">Submit</Button>
        {/*<Button variant="danger">Delete Item</Button> : ""*/}
        <p>{this.state.formSubmitStatus}</p>
      </Form>
    )
  }
}


export default EditItemForm;
