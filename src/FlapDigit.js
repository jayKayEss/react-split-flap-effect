import PropTypes from 'prop-types'
import React from 'react'
import { Flap } from './Flap'
import styles from './styles.css'

export const FlapDigit = ({ value, prevValue, final, ...restProps }) => {
  return (
    <div className={`${styles.digit} digit`}>
      <Flap {...restProps}>{value}</Flap>
      <Flap bottom {...restProps}>{prevValue}</Flap>
      <Flap animated final={final} {...restProps}>{prevValue}</Flap>
      {final && <Flap bottom animated final {...restProps}>{value}</Flap>}
      <div className={`${styles.bar} bar`} />
    </div>
  )
}

FlapDigit.defaultProps = {
  value: '',
  prevValue: '',
  final: false
}

FlapDigit.propTypes = {
  value: PropTypes.string,
  prevValue: PropTypes.string,
  final: PropTypes.bool
}
