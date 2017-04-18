const React = require('react')
const assign = require('object-assign')

class DelayedInput extends React.PureComponent {
  constructor (props) {
    super(props)

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      value: props.value || '',
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value})
    }
  }

  onBlur (event) {
    this.props.onBlur && this.props.onBlur(event)
    this.props.onChange && this.props.onChange(this.state.value)
  }

  onChange (event) {
    this.setState({value: event.target.value})
  }

  render () {
    const props = assign({}, this.props, {
      onBlur: this.onBlur,
      onChange: this.onChange,
      value: this.state.value,
    })

    return React.createElement('input', props)
  }
}

DelayedInput.displayName = 'DelayedInput'

module.exports = DelayedInput
