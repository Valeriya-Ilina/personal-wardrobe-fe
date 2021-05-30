import { Component } from 'react'
import { Offcanvas } from 'react-bootstrap';
import NewItemForm from './NewItemForm'
import EditItemForm from './EditItemForm'

class SideMenu extends Component {

  render() {
    console.log(this.state)
    return(
      <>
        <Offcanvas show={this.props.showOffcanvas} onHide={this.props.handleClose} key='end' placement='end' name='end'>
          <Offcanvas.Header closeButton>
            {
              this.props.itemCurrentlyBeingEdited ?
              <Offcanvas.Title>Edit Item</Offcanvas.Title>
              :
              <Offcanvas.Title>Add New Item</Offcanvas.Title>
            }
          </Offcanvas.Header>
          <Offcanvas.Body>
            {
              this.props.itemCurrentlyBeingEdited ?
              <EditItemForm handleClose={this.props.handleClose} categories={this.props.categories} createCategory={this.props.createCategory} getItems={this.props.getItems} itemCurrentlyBeingEdited={this.props.itemCurrentlyBeingEdited} editItem={this.props.editItem} deleteItemFromState={this.props.deleteItemFromState}/>
              :
              <NewItemForm handleClose={this.props.handleClose} categories={this.props.categories} createCategory={this.props.createCategory} getItems={this.props.getItems} items={this.props.items} />
            }

          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  }
}

export default SideMenu;
