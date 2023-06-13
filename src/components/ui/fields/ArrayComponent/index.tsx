import {ArrayComponent} from 'simple-react-form'
import without from 'lodash/without'
import {MinusCircleIcon, PlusIcon} from '@heroicons/react/24/outline'
import ObjectField from '../ObjectField'
import React from 'react'
import Button from '../../buttons/Button'
import InputContainer from '../InputContainer'

export default class ArrayField extends ArrayComponent {
  static defaultProps = {
    ...ArrayComponent.defaultProps,
    childrenClassName: `os-s-array os-s-array-1`,
    draggable: true,
    showRemoveButton: true,
    useAccordion: false,
    accordionLabel: '',
    showStyle: true,
  }

  getObjectField() {
    return ObjectField
  }

  removeItem(index) {
    const value = this.props.value || []
    const newArray = without(value, value[index])
    this.props.onChange(newArray)
  }

  renderRemoveButton(index) {
    if (!this.props.showRemoveButton) return
    if (this.props.disabled) return
    return (
      <div className="">
        <Button
          buttonType="button"
          danger
          onClick={() => this.removeItem(index)}>
          <MinusCircleIcon className="h-5" />
        </Button>
      </div>
    )
  }

  renderAddButton() {
    if (!this.props.showAddButton) return
    if (this.props.disabled) return
    return (
      <Button buttonType="button" primary onClick={() => this.addItem()}>
        <PlusIcon className="h-5" />
      </Button>
    )
  }

  // this function return the specific field
  renderChildrenItem({item, index, children}) {
    return (
      <div className="space-y-4" key={index}>
        {this.renderChildrenItemWithContext({index, children})}
        {this.renderRemoveButton(index)}
      </div>
    )
  }

  render() {
    return (
      <InputContainer>
        <div className="space-y-5">{this.renderChildren()}</div>
        <div className="my-3">{this.renderAddButton()}</div>
      </InputContainer>
    )
  }
}
