import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FlapStack from './FlapStack'

export const Presets = {
  NUM: '0123456789',
  ALPHANUM: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

const FlapDisplay = ({ value }) => {
  const [digits, setDigits] = useState([])

  useEffect(() => {
    const newDigits = value.split('').map(c => c.toUpperCase())
    setDigits(newDigits)
  }, [value])

  console.log('RENDER DISPLAY', value, digits)
  return (
    <div>
      {digits.map((digit, i) => (
        <FlapStack key={i} preset={Presets.NUM} value={digit} />
      ))}
    </div>
  )
}

FlapDisplay.defaultProps = {
  chars: Presets.ALPHANUM
}

FlapDisplay.propTypes = {
  value: PropTypes.string.isRequired
}

export default FlapDisplay
