import { Component } from 'react'
import SelectableImage from './SelectableImage'

class SelectableCategory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <>
        {
          // map through the list of categories
          this.props.categoriesWithItems.map((categoryWithItems, categoryIndex) => {
            return (
              <div key={categoryIndex}>
                <h5>{categoryWithItems.category_name}</h5>
                {
                  // map through the list of items in each category
                  categoryWithItems.items.sort((a, b) => a.id - b.id).map((item, itemIndex) => {
                    return (
                      <SelectableImage
                      key={itemIndex}
                       checked={!!this.props.selectedOutfitItems.find(oi => oi.item_id.id === item.id)}
                       item={item}
                       idOfOutfitToBeEdited={this.props.idOfOutfitToBeEdited}
                       categoryIndex={categoryIndex}
                       itemIndex={itemIndex}
                       selectedOutfitItems={this.props.selectedOutfitItems}
                       addSelectedOutfitItem={this.props.addSelectedOutfitItem}
                       removeSelectedOutfitItem={this.props.removeSelectedOutfitItem}/>
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
