import { Component } from 'react'
import SelectableImage from './SelectableImage'

class SelectableCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return(
      <>
        {
          // map through the list of categories
          this.props.categoriesWithItems.map((categoryWithItems, categoryIndex) => {
            return (
              <div key={categoryIndex}>
                <p>{categoryWithItems.category_name}</p>
                {
                  // map through the list of items in each category
                  categoryWithItems.items.map((item, itemIndex) => {
                    return (
                      <SelectableImage key={itemIndex} item={item} idOfOutfitToBeEdited={this.props.idOfOutfitToBeEdited} categoryIndex={categoryIndex} itemIndex={itemIndex} selectedOutfitItems={this.props.selectedOutfitItems} addSelectedOutfitItem={this.props.addSelectedOutfitItem} removeSelectedOutfitItem={this.props.removeSelectedOutfitItem}/>
                    )
                  })
                }
              </div>
            )
          })
        }
      </>
    )
  }
}

export default SelectableCategory;
