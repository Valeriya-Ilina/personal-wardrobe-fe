import { Component } from 'react'
import { ToggleButton } from 'react-bootstrap'

class SelectableImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coordinateX: 10,
      coordinateY: 10,
      image_width: 200,
      image_height: 200
    }
  }

  selectImage = () => {
    if (this.props.checked === false) {
      const selectedOutfitItem = {
        item_id: this.props.item.id,
        outfit_id: this.props.idOfOutfitToBeEdited,
        coordinateX: this.state.coordinateX,
        coordinateY: this.state.coordinateY,
        image_width: this.state.image_width,
        image_height: this.state.image_height
      }

      this.props.addSelectedOutfitItem(selectedOutfitItem)
    }
    // if user unselects the item
    else {
      console.log('deleting ', this.props.item)
      console.log('from ', this.props.selectedOutfitItems)
      const foundItemOutfit = this.props.selectedOutfitItems.find(outfitItem => this.props.item.id === outfitItem.item_id.id)
      console.log('we found ', foundItemOutfit, 'to remove')
      this.props.removeSelectedOutfitItem(foundItemOutfit)
    }
  }

  render() {
    // console.log(this.props.idOfOutfitToBeEdited)
    return(
      <>
        <ToggleButton
          className="outfit-item-select-btn mb-2"
          id={`toggleCheck-${this.props.categoryIndex}-${this.props.itemIndex}`}
          type="checkbox"
          variant="outline-primary"
          checked={this.props.checked}
          // value="1" not sure if it's needed

        >
          <img onClick={this.selectImage} src={this.props.item.imageUrl} className="item-image-in-outfit" key={`${this.props.categoryIndex}-${this.props.itemIndex}`} alt={this.props.item.name} />
        </ToggleButton>
      </>
    )
  }
}

export default SelectableImage;
