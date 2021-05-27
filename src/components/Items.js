import { Component } from 'react'

class Items extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("Purchased?" + this.props.purchased)
    return(
        <div>
          {
            this.props.purchased ?
            <h1>Wardrobe items</h1> :
            <h1>Wish list items</h1>
          }

        </div>
    )
  }
}

export default Items;
