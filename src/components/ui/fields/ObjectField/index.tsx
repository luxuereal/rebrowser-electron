import {ObjectComponent} from 'simple-react-form'

export default class ObjectField extends ObjectComponent {
  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return this.props.errorMessage ? (
      <p className="mt-2 text-sm text-red-600">{this.props.errorMessage}</p>
    ) : null
  }

  render() {
    return (
      <div className="space-y-2">
        {this.props.label && (
          <label className="block text-sm font-medium text-gray-700">{this.props.label}</label>
        )}
        {this.renderErrorMessage()}
        {this.getChildrenComponents()}
      </div>
    )
  }
}
