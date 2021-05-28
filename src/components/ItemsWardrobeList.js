import { Component } from 'react'

class ItemsWardrobeList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getItems()
  }

  render() {
    const wardrobeItems = this.props.items.filter(item => item.is_purchased)
    console.log(wardrobeItems)
    return(
        <div>
          <h1>Wardrobe items</h1>
          {
            wardrobeItems.map(item => {
              return (
                <img class='item' src={item.url} />
              )
            })
          }
        </div>
    )
  }
}

export default ItemsWardrobeList;
