import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FlapStack } from './FlapStack'
import { Presets } from './Presets'

const splitChars = v => v.split('').map(c => c.toUpperCase())

export const FlapDisplay = ({
  value,
  chars,
  timing,
  animationTiming,
  ...restProps
}) => {
  const [stack, setStack] = useState([])
  const [digits, setDigits] = useState([])

  useEffect(() => {
    setStack(splitChars(chars))
  }, [chars])

  useEffect(() => {
    setDigits(splitChars(value))
  }, [value])

  return (
    <div>
      {digits.map((digit, i) => (
        <FlapStack
          key={i}
          stack={stack}
          value={digit}
          timing={timing}
          animationTiming={animationTiming || timing}
          {...restProps}
        />
      ))}
    </div>
  )
}

FlapDisplay.defaultProps = {
  chars: Presets.NUM,
  timing: 150,
  width: '64px',
  height: '100px',
  color: 'black',
  backgroundColor: 'white'
}

FlapDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  chars: PropTypes.string,
  timing: PropTypes.number,
  animationTiming: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
}
