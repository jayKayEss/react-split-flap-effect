import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const flapDownTop = keyframes`
  from {
    transform: rotateX(0deg)
  }

  50%, to {
    transform: rotateX(90deg)
  }
`

const flapDownBottom = keyframes`
  from, 50% {
    transform: rotateX(90deg)
  }

  80% {
    transform: rotateX(20deg)
  }

  60%, to {
    transform: rotateX(0deg)
  }
`

const Outer = styled.div(
  {
    position: 'absolute',
    height: 'calc(50% - 1px)',
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
    animationTimingFunction: props.bottom ? 'ease-out' : 'ease-in',
    transformOrigin: props.bottom ? 'top' : 'bottom',
    zIndex: props.animated ? '1' : '-1'
  })
)

const Inner = styled.div(
  {
    width: '100%',
    position: 'absolute'
  },
  props => ({
    top: props.bottom ? 'calc(-100% - 1px)' : '0'
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
  backgroundColor: '#eee',
  animationDuration: '150ms'
}

Flap.propTypes = {
  bottom: PropTypes.bool,
  animated: PropTypes.bool,
  backgroundColor: PropTypes.string,
  animationDuration: PropTypes.string
}

export default Flap
