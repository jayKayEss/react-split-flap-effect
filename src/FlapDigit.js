import React from 'react'
import PropTypes from 'prop-types'
import Flap from './Flap'
import styled from '@emotion/styled'

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

const FlapDigit = ({ value, width, height }) => {
  return (
    <InnerDigit width={width} height={height}>
      <Flap>9</Flap>
      <Flap bottom>9</Flap>
      <Flap key={`top-${value}`} animated>{value}</Flap>
      <Flap key={`bottom-${value}`} bottom animated>{value}</Flap>
    </InnerDigit>
  )
}

FlapDigit.defaultProps = {
  value: '',
  width: '64px',
  height: '100px'
}

FlapDigit.propTypes = {
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default FlapDigit
