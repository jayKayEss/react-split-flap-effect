import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Flap } from './Flap'

const InnerDigit = styled.div(
  {
    position: 'relative',
    display: 'inline-block',
    boxSizing: 'border-box'
  },
  props => ({
    width: props.width + 'px',
    height: props.height + 'px',
    fontSize: props.fontSize,
    lineHeight: props.lineHeight,
    textAlign: props.textAlign,
    background: props.background,
    margin: props.margin,
    border: props.border,
    borderRadius: props.borderRadius
  })
)

const Bar = styled.div(
  {
    width: '100%',
    position: 'absolute',
    zIndex: 3,
    boxSizing: 'border-box'
  },
  props => ({
    height: props.hingeWidth + 'px',
    top: `calc(50% - ${props.hingeWidth}px / 2)`,
    background: props.background
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
  fontSize: PropTypes.string.isRequired,
  lineHeight: PropTypes.string.isRequired,
  textAlign: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  hingeWidth: PropTypes.number.isRequired
}
