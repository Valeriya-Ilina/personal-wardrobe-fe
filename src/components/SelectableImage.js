import { Component } from 'react'
import { ToggleButton } from 'react-bootstrap'

class SelectableImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
      coordinateX: 10,
      coordinateY: 10,
      image_width: 200,
      image_height: 200
    }
  }

  componentWillMount() {
    this.setState({
      checked: !!this.props.selectedOutfitItems.find(outfitItem => this.props.item.id === outfitItem.item_id.id)
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.idOfOutfitToBeEdited !== this.props.idOfOutfitToBeEdited) {
      this.setState({
        checked: !!nextProps.selectedOutfitItems.find(outfitItem => this.props.item.id === outfitItem.item_id.id)
      });
    }
  }


  selectImage = (event) => {
    // if user selects the item
    if (this.state.checked === false) {
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
      const foundItemOutfit = this.props.selectedOutfitItems.find(itemOutfit => this.props.item.id = itemOutfit.id )
      const itemOutfitId = foundItemOutfit.id
      this.props.removeSelectedOutfitItem(itemOutfitId)
    }

    this.setState({
      checked: event.target.checked
    })
  }

  render() {
    // console.log(this.props.idOfOutfitToBeEdited)
    return(
      <>
        <ToggleButton
          className="mb-2"
          id={`toggleCheck-${this.props.categoryIndex}-${this.props.itemIndex}`}
          type="checkbox"
          variant="outline-primary"
          checked={this.state.checked}
          // value="1" not sure if it's needed
          onChange={(event) => this.selectImage(event)}
        >
          <img src={this.props.item.imageUrl} className="item-image-in-outfit" key={`${this.props.categoryIndex}-${this.props.itemIndex}`} alt={this.props.item.name} />
        </ToggleButton>
      </>
    )
  }
}

export default SelectableImage;
