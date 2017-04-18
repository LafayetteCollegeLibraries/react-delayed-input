const React = require('react')
const assign = require('object-assign')
const Enzyme = require('enzyme')
const shallow = Enzyme.shallow

const DelayedInput = require('./')

const shallowEl = xtend => {
  return shallow(React.createElement(DelayedInput, assign({}, xtend)))
}

test('renders an input', () => {
  const $el = shallowEl()
  expect($el.name()).toBe('input')
})

test('does not trigger `onChange` during change event', () => {
  const onChange = () => {
    throw new Error('`onChange` should not have been called')
  }

  const $el = shallowEl({onChange})

  $el.simulate('change', {target: {value: 'some value'}})
})

test('triggers `onChange` with blur event', done => {
  const value = 'passed value'
  const onChange = value => {
    done()
  }

  const $el = shallowEl({onChange, value})
  $el.simulate('blur')
})

test('triggers `onBlur` with blur event', done => {
  const onBlur = () => {
    done()
  }

  const $el = shallowEl({onBlur})
  $el.simulate('blur')
})

test('updates value with change', () => {
  const initialValue = 'some value'
  const updatedValue = 'another but different one'

  const $el = shallowEl({value: initialValue})
  expect($el.state('value')).toBe(initialValue)

  $el.simulate('change', {target: {value: updatedValue}})

  // we need to give the `change` event a second to
  // actually make the change
  setTimeout(function () {
    expect($el.state('value')).toBe(updatedValue)
  }, 0)
})

test('updates the state value when the props change', () => {
  const initialValue = 'some value'
  const updatedValue = 'another but different one'

  const $el = shallowEl({value: initialValue})
  expect($el.state('value')).toBe(initialValue)

  $el.setProps({value: updatedValue})
  expect($el.state('value')).toBe(updatedValue)
})
