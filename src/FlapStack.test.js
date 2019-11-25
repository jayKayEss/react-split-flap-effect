/* eslint-env jest */
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { FlapStack } from './FlapStack'
import { FlapDigit } from './FlapDigit'

describe('<FlapStack/>', () => {
  let props
  let el
  let digit

  beforeEach(() => {
    props = {
      stack: [' ', 'A', 'Z'],
      value: 'Z',
      timing: 30
    }

    jest.useFakeTimers()

    el = mount(<FlapStack {...props} />)
    digit = el.find(FlapDigit)
  })

  it('renders a <FlapDigit/>', () => {
    expect(el.exists(FlapDigit)).toBeTruthy()
  })

  it('renders the digit in the initial position', () => {
    expect(digit.prop('value')).toEqual(' ')
    expect(digit.prop('prevValue')).toEqual('')
    expect(digit.prop('final')).not.toBeTruthy()
  })

  it('sets a timeout', () => {
    act(() => {
      jest.runAllTimers()
    })
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), props.timing)
  })

  it('advances the digit to the next position', () => {
    act(() => {
      jest.advanceTimersByTime(props.timing)
    })
    digit = el.update().find(FlapDigit)
    expect(digit.prop('value')).toEqual('A')
    expect(digit.prop('prevValue')).toEqual(' ')
    expect(digit.prop('final')).not.toBeTruthy()
  })

  it('advances the digit to the final position', () => {
    act(() => {
      jest.runAllTimers()
    })
    digit = el.update().find(FlapDigit)
    expect(digit.prop('value')).toEqual('Z')
    expect(digit.prop('prevValue')).toEqual('A')
    expect(digit.prop('final')).toBeTruthy()
  })

  it('passes all props down', () => {
    el = mount(<FlapStack {...props} foo='bar' />)
    digit = el.find(FlapDigit)
    expect(digit.prop('foo')).toEqual('bar')
  })
})
