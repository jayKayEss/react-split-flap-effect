import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { Flap } from './Flap'

// width: ${props => props.width + 'px'};
// height: ${props => props.height + 'px'};

const InnerDigit = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 1ch;
  height: 1em;
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  text-align: ${props => props.textAlign};
  background: ${props => props.background};
  margin: ${props => props.margin};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
`

const Bar = styled.div`
  width: 100%;
  position: absolute;
  z-index: 3;
  box-sizing: border-box;
  height: ${props => props.hingeWidth + 'px'};
  top: ${props => `calc(50% - ${props.hingeWidth}px / 2)`};
  background: ${props => props.background};
`

export const FlapDigit = ({ value, prevValue, ...restProps }) => {
  return (
    <InnerDigit className='innerDigit' {...restProps}>
      <Flap {...restProps}>{value}</Flap>
      <Flap bottom {...restProps}>{prevValue}</Flap>
      <Flap key={`top-${prevValue}`} animated {...restProps}>{prevValue}</Flap>
      <Flap key={`bottom-${value}`} bottom animated {...restProps}>{value}</Flap>
      {/* <Bar {...restProps} /> */}
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
