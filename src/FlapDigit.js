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

export const FlapDigit = ({ value, prevValue, width, height, ...restProps }) => {
  return (
    <InnerDigit width={width} height={height} {...restProps}>
      <Flap {...restProps}>{value}</Flap>
      <Flap bottom {...restProps}>{prevValue}</Flap>
      <Flap key={`top-${prevValue}`} animated {...restProps}>{prevValue}</Flap>
      <Flap key={`bottom-${value}`} bottom animated {...restProps}>{value}</Flap>
    </InnerDigit>
  )
}

FlapDigit.defaultProps = {
  value: '',
  prevValue: ''
}

FlapDigit.propTypes = {
  value: PropTypes.string,
  prevValue: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  animationTiming: PropTypes.number.isRequired
}
