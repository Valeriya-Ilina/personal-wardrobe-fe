import { Component } from 'react'
import { Rnd } from 'react-rnd'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};


class ImageInBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 100,
      height: 100,
      x: 10,
      y: 10
    }
  }

  render() {
    return (
      <Rnd
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        lockAspectRatio={true}
        bounds='parent'
        minWidth='10px'
        minHeight='10px'
        className='item'
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
      >
        <img className="image-in-box" src={this.props.outfitItem.item_id.imageUrl}/>
      </Rnd>
    )
  }
}

export default ImageInBox;
