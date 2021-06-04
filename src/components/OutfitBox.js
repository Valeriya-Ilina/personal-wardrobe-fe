import { Component } from 'react'
import ImageInBox from './ImageInBox'

class OutfitBox extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //
    // }
  }

  render() {
    return (
      <div className="outfit-box">
        {
          this.props.selectedOutfitItems.map(outfitItem => {
            return (
                <ImageInBox outfitItem={outfitItem} />
            )
          })
        }

      </div>
    )
  }
}

export default OutfitBox;
