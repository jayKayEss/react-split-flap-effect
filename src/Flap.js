import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const flapDownTop = keyframes`
  from {
    transform: rotateX(0deg)
  }

  to {
    transform: rotateX(90deg)
  }
`

const flapDownBottom = keyframes`
  from {
    transform: rotateX(90deg)
  }

  to {
    transform: rotateX(0deg)
  }
`

const Outer = styled.div(
  {
    position: 'absolute',
    height: '50%',
    width: '100%',
    overflow: 'hidden',
    textAlign: 'center',
    animationFillMode: 'forwards'
  },
  props => ({
    backgroundColor: props.backgroundColor,
    animationDuration: props.animationDuration,
    top: props.bottom ? '50%' : '0',
    animationName: props.animated ? (
      props.bottom ? flapDownBottom : flapDownTop
    ) : null,
    transformOrigin: props.bottom ? 'top' : 'bottom'
  })
)

const Inner = styled.div(
  {
    width: '100%',
    position: 'absolute'
  },
  props => ({
    top: props.bottom ? '-100%' : '0'
  })
)

const Flap = ({ children, ...restProps }) => (
  <Outer {...restProps}>
    <Inner {...restProps}>
      {children}
    </Inner>
  </Outer>
)

Flap.defaultProps = {
  bottom: false,
  animated: false,
  backgroundColor: '#fff',
  animationDuration: '100ms'
}

Flap.propTypes = {
  bottom: PropTypes.bool,
  animated: PropTypes.bool,
  backgroundColor: PropTypes.string,
  animationDuration: PropTypes.string
}

export default Flap