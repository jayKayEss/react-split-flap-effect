import PropTypes from 'prop-types'
import React from 'react'
import { Flap } from './Flap'
import styles from './styles.css'

export const FlapDigit = ({ value, prevValue, ...restProps }) => {
  return (
    <div className={`${styles.digit} digit`}>
      <Flap {...restProps}>{value}</Flap>
      <Flap bottom {...restProps}>{prevValue}</Flap>
      <Flap key={`top-${prevValue}`} animated {...restProps}>{prevValue}</Flap>
      <Flap key={`bottom-${value}`} bottom animated {...restProps}>{value}</Flap>
      <div className={`${styles.bar} bar`} />
    </div>
  )
}

FlapDigit.defaultProps = {
  value: '',
  prevValue: ''
}

FlapDigit.propTypes = {
  value: PropTypes.string,
  prevValue: PropTypes.string
}
