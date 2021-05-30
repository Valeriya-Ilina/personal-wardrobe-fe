import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';


class CreatableSelectInput extends Component {

  handleChange = (newValue) => {
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

    // get index of category from options array of objects, so we can use it to render value
    const findIndex = options.findIndex(option => {
      return option.label === this.props.category_name
    })

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
