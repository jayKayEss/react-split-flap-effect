import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FlapStack from './FlapStack'

export const Presets = {
  NUM: ' 0123456789',
  ALPHANUM: ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

const FlapDisplay = ({ value, chars }) => {
  const [digits, setDigits] = useState([])

  useEffect(() => {
    const newDigits = value.split('').map(c => c.toUpperCase())
    setDigits(newDigits)
  }, [value])

  return (
    <div>
      {digits.map((digit, i) => (
        <FlapStack key={i} preset={chars} value={digit} />
      ))}
    </div>
  )
}

FlapDisplay.defaultProps = {
  chars: Presets.NUM
}

FlapDisplay.propTypes = {
  value: PropTypes.string.isRequired
}

export default FlapDisplay
