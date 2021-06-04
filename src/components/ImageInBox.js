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

    this.state = {
      x: '',
      y: '',
      width: '',
      height: '',
    }
  }

  componentDidMount() {
    this.setState({
      x: this.props.outfitItem.coordinateX,
      y: this.props.outfitItem.coordinateY,
      width: this.props.outfitItem.image_width,
      height: this.props.outfitItem.image_height,
    })
  }

  componentWillUpdate(nextProps) {
    console.log(this.props.outfitItem)
    // this.updateItemSizePosition(this.props.outfitItem.id)
    if (nextProps.idOfOutfitToBeEdited !== this.props.idOfOutfitToBeEdited) {
      this.setState({
        x: this.props.outfitItem.coordinateX,
        y: this.props.outfitItem.coordinateY,
        width: this.props.outfitItem.image_width,
        height: this.props.outfitItem.image_height
      });
    }
  }

  componentDidUpdate() {
    this.updateItemSizePosition(this.props.outfitItem.id)
  }

  updateItemSizePosition = async (id) => {
    const url = baseURL + '/api/v1/outfit-collections/' + id

    // sanitize data to remove last 2 chars ('px') if needed, e.g. '100px' => '100'
    let image_width = this.state.width
    console.log(image_width)
    image_width = image_width.toString().indexOf('px') !== -1 ? this.state.width.slice(0, -2) : this.state.width
    console.log(image_width)
    let image_height = this.state.height
    image_height = image_height.toString().indexOf('px') !== -1 ? this.state.height.slice(0, -2) : this.state.height

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          "coordinateX": this.state.x,
          "coordinateY": this.state.y,
          "image_width": image_width,
          "image_height": image_height
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.status === 200) {
        console.log('image position and size updated')
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
  }

  render() {
    console.log(this.state)
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
