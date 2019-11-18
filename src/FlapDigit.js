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
    width: props.width + 'px',
    height: props.height + 'px',
    lineHeight: props.height + 'px',
    fontSize: props.height + 'px'
  })
)

const Bar = styled.div(
  {
    height: '2px',
    width: '100%',
    position: 'absolute',
    top: 'calc(50% - 1px)',
    zIndex: 3
  },
  props => ({
    backgroundColor: props.backgroundColor
  })
)

export const FlapDigit = ({ value, prevValue, ...restProps }) => {
  return (
    <InnerDigit {...restProps}>
      <Flap {...restProps}>{value}</Flap>
      <Flap bottom {...restProps}>{prevValue}</Flap>
      <Flap key={`top-${prevValue}`} animated {...restProps}>{prevValue}</Flap>
      <Flap key={`bottom-${value}`} bottom animated {...restProps}>{value}</Flap>
      <Bar {...restProps} />
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  animationTiming: PropTypes.number.isRequired
}
