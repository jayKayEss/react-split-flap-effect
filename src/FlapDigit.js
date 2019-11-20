import PropTypes from 'prop-types'
import React from 'react'
import { Flap } from './Flap'
import styles from './styles.css'

export const FlapDigit = ({ digitClassName, value, prevValue, final, ...restProps }) => {
  return (
    <div className={`${digitClassName} ${styles.digit}`}>
      <Flap {...restProps}>{value}</Flap>
      <Flap bottom {...restProps}>{prevValue}</Flap>
      <Flap animated final={final} {...restProps}>{prevValue}</Flap>
      {final && <Flap bottom animated final {...restProps}>{value}</Flap>}
      <div className={styles.bar} />
    </div>
  )
}

FlapDigit.defaultProps = {
  value: '',
  prevValue: '',
  final: false
}

FlapDigit.propTypes = {
  digitClassName: PropTypes.string,
  value: PropTypes.string,
  prevValue: PropTypes.string,
  final: PropTypes.bool
}
