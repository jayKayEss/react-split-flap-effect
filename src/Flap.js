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

export const Flap = styled.div(
  {
    position: 'absolute',
    height: '100%',
    width: '100%',
    animationFillMode: 'forwards',
    transformOrigin: 'center'
  },
  props => {
    const halfHeight = parseInt(props.height / 2)
    const flapOffset = props.bottom ? props.height - halfHeight : halfHeight
    return {
      color: props.color,
      background: props.background,
      borderRadius: props.borderRadius,
      animationDuration: props.animationDuration,
      clip: props.bottom
        ? `rect(${flapOffset}px, ${props.width}px, ${props.height}px, 0)`
        : `rect(0, ${props.width}px, ${flapOffset}px, 0);`,
      animationName: props.animated ? (
        props.bottom ? flapDownBottom : flapDownTop
      ) : null,
      animationDurationFunction: props.bottom ? 'ease-out' : 'ease-in',
      zIndex: props.animated ? '2' : '1'
    }
  }
)

Flap.defaultProps = {
  bottom: false,
  animated: false
}

Flap.propTypes = {
  bottom: PropTypes.bool,
  animated: PropTypes.bool,
  background: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  animationDuration: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired
}
