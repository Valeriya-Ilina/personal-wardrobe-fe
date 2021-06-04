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
      x: 10,
      y: 10,
      width: '200',
      height: '200',
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate called")
    this.updateItemSizePosition(this.props.outfitItem.id)
  }

  updateItemSizePosition = async (id) => {
    console.log(id)
    const url = baseURL + '/api/v1/outfit-collections/' + id

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          "coordinateX": this.state.x,
          "coordinateY": this.state.y,
          "image_width": this.state.width.slice(0, -2), // removes last 2 chars
          "image_height": this.state.height.slice(0, -2), // e.g. '100px' => '100'
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
