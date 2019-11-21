import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FlapStack } from './FlapStack'
import { Presets } from './Presets'

const Modes = {
  Numeric: 'num',
  Alphanumeric: 'alpha',
  Words: 'words'
}

const splitChars = v => String(v).split('').map(c => c.toUpperCase())

const padValue = (v, length, padding, padStart) => {
  const trimmed = v.slice(0, length)
  return padStart
    ? String(trimmed).padStart(length, padding)
    : String(trimmed).padEnd(length, padding)
}

export const FlapDisplay = ({
  id,
  className,
  css,
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
  const [mode, setMode] = useState(Modes.Numeric)
  const [digits, setDigits] = useState([])
  const [children, setChildren] = useState([])

  useEffect(() => {
    if (words) {
      setStack(words)
      setMode(Modes.Words)
    } else {
      setStack(splitChars(chars))
      setMode(chars.match(/[a-z]/i) ? Modes.Alphanumeric : Modes.Numeric)
    }
  }, [chars, words])

  useEffect(() => {
    if (words) {
      setDigits([value])
    } else {
      const usePadStart = padStart || !!value.match(/^[0-9]*$/)
      setDigits(splitChars(padValue(value, length, padding, usePadStart)))
    }
  }, [value, chars, words, length, padding, padStart])

  useEffect(() => {
    setChildren(digits.map((digit, i) => (
      <FlapStack
        key={i}
        stack={stack}
        value={digit}
        mode={mode}
        {...restProps}
      />
    )))
  }, [digits, ...Object.values(restProps)])

  return (
    <div id={id} className={className} css={css}>
      {render ? render({ ...restProps, children }) : children}
    </div>
  )
}

FlapDisplay.defaultProps = {
  chars: Presets.NUM,
  padding: ' ',
  timing: 30,
  hinge: true
}

FlapDisplay.propTypes = {
  id: PropTypes.string,
  css: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  chars: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
  length: PropTypes.number,
  padding: PropTypes.string,
  padStart: PropTypes.bool,
  timing: PropTypes.number,
  hinge: PropTypes.bool
}
