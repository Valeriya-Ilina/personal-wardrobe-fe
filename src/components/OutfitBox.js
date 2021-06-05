import { Component } from 'react'
import { Button } from 'react-bootstrap'
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
      <>
        <div className="outfit-box">

          {
            this.props.selectedOutfitItems.length > 0 && this.props.selectedOutfitItems.map(outfitItem => {
              return (
                  <ImageInBox idOfOutfitToBeEdited={this.props.idOfOutfitToBeEdited} outfitItem={outfitItem} editSelectedOutfitItem={this.props.editSelectedOutfitItem} />
              )
            })
          }

        </div>
      </>
    )
  }
}

export default OutfitBox;
