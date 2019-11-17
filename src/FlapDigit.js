import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Flap } from './Flap'

const InnerDigit = styled.div(
  {
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center'
  },
  props => ({
    width: props.width,
    height: props.height,
    lineHeight: props.height,
    fontSize: props.height
  })
)

export const FlapDigit = ({ value, prevValue, width, height, timing, ...restProps }) => {
  return (
    <InnerDigit width={width} height={height}>
      <Flap>{value}</Flap>
      <Flap bottom>{prevValue}</Flap>
      <Flap key={`top-${prevValue}`} animated {...restProps}>{prevValue}</Flap>
      <Flap key={`bottom-${value}`} bottom animated {...restProps}>{value}</Flap>
    </InnerDigit>
  )
}

FlapDigit.defaultProps = {
  value: '',
  prevValue: '',
  width: '64px',
  height: '100px',
  timing: 150
}

FlapDigit.propTypes = {
  value: PropTypes.string,
  prevValue: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  timing: PropTypes.number
}
