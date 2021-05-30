import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';


class CreatableSelectInput extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (newValue, actionMeta) => {
    this.props.handleCategoryChange(newValue?.value.toLowerCase())
  }

  render() {
    const options = this.props.categories.map(element => {
      const option = {
        value: element.name,
        label: element.name
      }
      return option
    })
    console.log(this.props.category_name)

    // get index of category from options array of objects, so we can use to render value
    const findIndex = options.findIndex(option => {
      console.log(option.label)
      return option.label === this.props.category_name
    })
    console.log(findIndex)

    console.log(this.state)
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        options={options}
        placeholder="Enter or select Category... *"
        className="mb-3 creatable-select"
        id="category"
        value={options[findIndex]}
      />
    )
  }
}


export default CreatableSelectInput;
