import { Component } from 'react'
import { Rnd } from 'react-rnd'

const baseURL = process.env.REACT_APP_BASEURL

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
  }

  render() {
    console.log(this.state)
    return (
      <Rnd
        style={style}
        size={{ width: this.props.outfitItem.image_width, height: this.props.outfitItem.image_height }}
        position={{ x: this.props.outfitItem.coordinateX, y: this.props.outfitItem.coordinateY }}
        lockAspectRatio={true}
        bounds='parent'
        minWidth='10px'
        minHeight='10px'
        className='item'
        onDragStop={(e, d) => {
          const itemSizePosition = {
            "coordinateX": d.x,
            "coordinateY": d.y,
            "image_width": this.props.outfitItem.image_width,
            "image_height": this.props.outfitItem.image_height
          }
          this.props.editSelectedOutfitItem(this.props.outfitItem.id, itemSizePosition)
        }}

        onResizeStop={(e, direction, ref, delta, position) => {
          // sanitize data to remove last 2 chars ('px') if needed, e.g. '100px' => '100'
          let image_width = this.props.outfitItem.image_width
          image_width = image_width.toString().indexOf('px') !== -1 ? this.props.outfitItem.image_width.slice(0, -2) : this.props.outfitItem.image_width
          let image_height = this.props.outfitItem.image_height
          image_height = image_height.toString().indexOf('px') !== -1 ? this.props.outfitItem.image_height.slice(0, -2) : this.props.outfitItem.image_height

          const itemSizePosition = {
            "coordinateX": this.props.outfitItem.coordinateX,
            "coordinateY": this.props.outfitItem.coordinateY,
            "image_width": image_width,
            "image_height": image_height
          }
          this.props.editSelectedOutfitItem(this.props.outfitItem.id, itemSizePosition)
        }}
      >
        <img className="image-in-box" src={this.props.outfitItem.item_id.imageUrl}/>
      </Rnd>
    )
  }
}

export default ImageInBox;
