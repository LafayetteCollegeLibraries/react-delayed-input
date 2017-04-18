react-delayed-input
===================

A small React input component designed to put off triggering `onChange`
until the element is blurred.

usage
-----

`DelayedInput` takes the same props as `input`. If present, an `onBlur`
handler will be triggered before the `onChange` handler.

example
-------

```jsx
import React from 'react'
import DelayedInput from '@lafayette-college-libraries/react-delayed-input'

export default class DateComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value || ''
    }
  }

  render () {
    return (
      <div>
        <p key="display">{this.state.value}</p>
        <DelayedInput
          onChange={value => this.setState({value})}
          type="date"
          value={this.state.value}
        />
      </div>
    )
  }
}
```

license
-------

GPL-3.0
