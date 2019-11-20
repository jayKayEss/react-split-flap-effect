import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FlapStack } from './FlapStack'
import { Presets } from './Presets'

const splitChars = v => String(v).split('').map(c => c.toUpperCase())

const padValue = (v, length, padding, padStart) => padStart
  ? String(v).padStart(length, padding)
  : String(v).padEnd(length, padding)

export const FlapDisplay = ({
  value,
  chars,
  words,
  length,
  padding,
  padStart,
  render,
  ...restProps
}) => {
  const [stack, setStack] = useState([])
  const [digits, setDigits] = useState([])

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

  const derivedProps = {
    ...restProps,
    wordMode: !!words
  }

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
  length: 6,
  padding: ' ',
  timing: 30
}

FlapDisplay.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  chars: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
  length: PropTypes.number,
  padding: PropTypes.string,
  padStart: PropTypes.bool,
  timing: PropTypes.number
}
