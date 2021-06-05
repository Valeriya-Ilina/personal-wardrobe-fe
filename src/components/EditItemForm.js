import { Component } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import CreatableSelectInput from './CreatableSelectInput'

const baseURL = process.env.REACT_APP_BASEURL

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
        "category_id": this.props.itemCurrentlyBeingEdited.category_id.id,
        "is_purchased": this.props.itemCurrentlyBeingEdited.is_purchased
      }

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

    // check if category already exists
    if(!this.props.itemCurrentlyBeingEdited.category_id.id) {
      // add new category in the db
      console.log("CREATING NEW CATEGORY")
      const createdCategory = await this.props.createCategory(this.props.itemCurrentlyBeingEdited.category_id.name)

      const updatedItemCurrentlyBeingEdited = {
        ...this.props.itemCurrentlyBeingEdited,
        category_id: {
          id: createdCategory.id,
          name: createdCategory.name
        }
      }

      this.props.editItem(updatedItemCurrentlyBeingEdited)
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

  deleteItem = async (id) => {
    console.log("DELETING ITEM with id " + id)
    const url = baseURL + '/api/v1/items/' + id
    try {
      const response = await fetch( url, {
        method: 'DELETE',
        credentials: "include"
      })
      if (response.status===200){
        this.props.handleClose()
        this.props.deleteItemFromState(id)
      }
    }
    catch(err){
      console.log('Error =>', err)
    }
  }

  handleEditChange = (event) => {
    const target = { ...this.props.itemCurrentlyBeingEdited }
    const source = { [event.target.id]: event.target.value }
    const newItemCurrentlyBeingEdited = Object.assign(target, source)

    // handle "Purchased" checkbox changes
    if(event.target.id === 'is_purchased') {
      // if "checked" - make true, else - make false
      if (event.target.checked) {
        newItemCurrentlyBeingEdited.is_purchased = true
      }
      else {
        newItemCurrentlyBeingEdited.is_purchased = false
      }
    }

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
        <Form.Check
          type="checkbox"
          id="is_purchased"
          label="Purchased"
          defaultChecked={this.props.itemCurrentlyBeingEdited?.is_purchased}
          onChange= { (event) => this.handleEditChange(event) }
        />
        <Form.Text className="text-muted">
          <div className="mb-3">* is a required field</div>
        </Form.Text>
        <Button variant="success" type="submit" className="mb-3">Submit</Button>
        <Button onClick={ ()=>this.deleteItem(this.props.itemCurrentlyBeingEdited?.id) } variant="danger" className="delete-item-btn mb-3">Delete Item</Button>
        <p>{this.state.formSubmitStatus}</p>
      </Form>
    )
  }
}


export default EditItemForm;
