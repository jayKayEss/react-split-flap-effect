import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Flap from './Flap'
import styled from '@emotion/styled'

function usePrevious (value) {
  const ref = useRef()

  useEffect(() => {
    console.log('VALUE IS CHANGING', ref.current, value)
    ref.current = value
  }, [value])

  console.log('RETURNING PREV VALUE', ref.current, value)
  return ref.current
}

const InnerDigit = styled.div(
  {
    position: 'relative',
    textAlign: 'center'
  },
  props => ({
    width: props.width,
    height: props.height,
    lineHeight: props.height,
    fontSize: props.height
  })
)

const FlapDigit = ({ value, width, height, timing, ...restProps }) => {
  const [phase2, setPhase2] = useState(false)
  const [prevValue, setPrevValue] = useState('')

  const durationTop = `${timing}ms`
  const durationBottom = `${parseInt(timing * 0.8)}ms`

  useEffect(() => {
    setPhase2(false)

    const timer = setTimeout(() => {
      setPhase2(true)
    }, timing)

    return () => {
      setPrevValue(value)
      clearTimeout(timer)
    }
  }, [value])

  return (
    <InnerDigit width={width} height={height}>
      <Flap>{value}</Flap>
      <Flap bottom>{prevValue}</Flap>
      <Flap key={`top-${prevValue}`} animated animationDuration={durationTop} {...restProps}>{prevValue}</Flap>
      {phase2 && <Flap key={`bottom-${value}`} bottom animated animationDuration={durationBottom} {...restProps}>{value}</Flap>}
    </InnerDigit>
  )
}

FlapDigit.defaultProps = {
  value: '',
  width: '64px',
  height: '100px',
  timing: 150
}

FlapDigit.propTypes = {
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  timing: PropTypes.number
}

export default FlapDigit
