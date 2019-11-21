import PropTypes from 'prop-types'
import React from 'react'
import { Flap } from './Flap'
import styles from './styles.css'
import classnames from 'classnames'

export const FlapDigit = ({ className, value, prevValue, final, mode, ...restProps }) => {
  const classes = classnames(className, styles.digit)

  return (
    <div className={classes} data-kind='digit' data-mode={mode}>
      <Flap {...restProps}>{value}</Flap>
      <Flap bottom {...restProps}>{prevValue}</Flap>
      <Flap key={`top-${prevValue}`} animated final={final} {...restProps}>{prevValue}</Flap>
      {final && <Flap key={`bottom-${value}`} bottom animated final {...restProps}>{value}</Flap>}
      <div className={styles.bar} />
    </div>
  )
}

FlapDigit.defaultProps = {
  value: '',
  prevValue: '',
  final: false,
  mode: null
}

FlapDigit.propTypes = {
  mode: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  prevValue: PropTypes.string,
  final: PropTypes.bool
}
