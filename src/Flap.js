import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import classnames from 'classnames'

console.log('STYLESSSS', styles)

export const Flap = ({ above, bottom, animated, final, children }) => {
  const classes = classnames('flap', styles.flap, {
    [styles.bottom]: bottom,
    [styles.top]: !bottom,
    [styles.animated]: animated,
    [styles.final]: final
  })
  return (
    <div className={classes}>{children}</div>
  )
}

Flap.defaultProps = {
  above: false,
  bottom: false,
  animated: false,
  final: false
}

Flap.propTypes = {
  above: PropTypes.bool,
  bottom: PropTypes.bool,
  animated: PropTypes.bool,
  final: PropTypes.bool
}
