import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FlapStack } from './FlapStack'
import { Presets } from './Presets'

const splitChars = v => v.split('').map(c => c.toUpperCase())

export const FlapDisplay = ({
  value,
  chars,
  words,
  render,
  ...restProps
}) => {
  const [derivedProps, setDerivedProps] = useState({})
  const [stack, setStack] = useState([])
  const [digits, setDigits] = useState([])

  useEffect(() => {
    setDerivedProps({
      animationDuration: restProps.timing + 'ms',
      fontSize: restProps.height + 'px',
      lineHeight: restProps.height + 'px',
      ...restProps
    })
  }, [...restProps])

  useEffect(() => {
    if (words) {
      setStack(words)
    } else {
      setStack(splitChars(chars))
    }
  }, [chars, words])

  useEffect(() => {
    setDigits(words ? [value] : splitChars(value))
  }, [value])

  const children = digits.map((digit, i) => (
    <FlapStack
      key={i}
      stack={stack}
      value={digit}
      {...derivedProps}
    />
  ))

  return (
    <div>
      {render ? render({ ...derivedProps, children }) : children}
    </div>
  )
}

FlapDisplay.defaultProps = {
  chars: Presets.NUM,
  timing: 150,
  width: 64,
  height: 100,
  color: '#eee',
  background: '#333',
  textAlign: 'center',
  margin: '0 0 0 1px',
  border: '1px solid #666',
  borderRadius: '4px',
  hingeWidth: 2
}

FlapDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  chars: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
  timing: PropTypes.number,
  animationDuration: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  background: PropTypes.string,
  textAlign: PropTypes.string,
  margin: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  hingeWidth: PropTypes.number,
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string
}
