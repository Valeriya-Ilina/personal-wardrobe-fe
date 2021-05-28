import { Component } from 'react'

class ItemsWishList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getItems()
  }

  render() {
    const wishListItems = this.props.items.filter(item => !item.is_purchased)
    console.log(wishListItems)
    return(
        <div>
          <h1>Wish list items</h1>
          {
            wishListItems.map(item => {
              return (
                <img class='item' src={item.url} />
              )
            })
          }
        </div>
    )
  }
}

export default ItemsWishList;
