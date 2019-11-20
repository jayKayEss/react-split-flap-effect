import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

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

export const Flap = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  animation-fill-mode: forwards;
  transform-origin: center;
  color: ${props => props.color};
  background: ${props => props.background};
  border-radius: ${props => props.borderRadius};
  animation-name: ${props => props.animated ? (props.bottom ? flapDownBottom : flapDownTop) : null};
  animation-duration: ${props => props.animationDuration};
  animation-timing-function: ${props => props.bottom ? 'ease-out' : 'ease-in'};
  z-index: ${props => props.animated ? '2' : '1'};
  clip: ${props => {
    const halfHeight = parseInt(props.height / 2)
    const flapOffset = props.bottom ? props.height - halfHeight : halfHeight
    return props.bottom
      ? `rect(${flapOffset}px, ${props.width}px, ${props.height}px, 0)`
      : `rect(0, ${props.width}px, ${flapOffset}px, 0)`
    }
  };
`

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
