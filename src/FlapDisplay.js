import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FlapStack } from './FlapStack'
import { Presets } from './Presets'

const splitChars = v => String(v).split('').map(c => c.toUpperCase())

const padValue = (v, length, padding, padStart) => padStart
  ? String(v).padStart(length, padding)
  : String(v).padEnd(length, padding)

export const FlapDisplay = ({
  className,
  value,
  chars,
  words,
  length,
  padding,
  padStart,
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
  }, Object.values(restProps))

  useEffect(() => {
    if (words) {
      setStack(words)
    } else {
      setStack(splitChars(chars))
    }
  }, [chars, words])

  useEffect(() => {
    if (words) {
      setDigits([value])
    } else {
      const usePadStart = padStart || !!value.match(/^[0-9]*$/)
      setDigits(splitChars(padValue(value, length, padding, usePadStart)))
    }
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
    <div className={className}>
      {render ? render({ ...derivedProps, children }) : children}
    </div>
  )
}

FlapDisplay.defaultProps = {
  chars: Presets.NUM,
  length: 6,
  padding: ' ',
  timing: 50,
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
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  chars: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
  length: PropTypes.number,
  padding: PropTypes.string,
  padStart: PropTypes.bool,
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
