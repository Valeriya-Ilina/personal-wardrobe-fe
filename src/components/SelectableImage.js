import { Component } from 'react'
import { ToggleButton } from 'react-bootstrap'

class SelectableImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false
    }
  }

  selectImage = (event) => {
    this.setState({
      checked: event.target.checked
    })
  }

  render() {
    // console.log(this.state)
    return(
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
    )
  }
}

export default SelectableImage;
