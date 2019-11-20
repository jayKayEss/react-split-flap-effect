import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import classnames from 'classnames'

export const Flap = ({ above, bottom, animated, children }) => {
  const classes = classnames('flap', styles.flap, {
    [styles.above]: animated, // change this
    [styles.bottom]: bottom,
    [styles.top]: !bottom,
    [styles.animated]: animated
  })
  return (
    <div className={classes}>{children}</div>
  )
}

Flap.defaultProps = {
  above: false,
  bottom: false,
  animated: false
}

Flap.propTypes = {
  above: PropTypes.bool,
  bottom: PropTypes.bool,
  animated: PropTypes.bool
}
