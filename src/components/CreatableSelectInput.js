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

    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
        placeholder="Enter or select Category... *"
        className="mb-3 creatable-select"
        id="category"
      />
    )
  }
}


export default CreatableSelectInput;
