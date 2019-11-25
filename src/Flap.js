import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import classnames from 'classnames'

export const Flap = ({ bottom, animated, final, hinge, children }) => {
  const classes = classnames(styles.flap, {
    [styles.bottom]: bottom,
    [styles.top]: !bottom,
    [styles.animated]: animated,
    [styles.final]: final
  })
  return (
    <div className={classes}>
      {children}
      {hinge && <div className={styles.hinge} data-kind='hinge' />}
    </div>
  )
}

Flap.defaultProps = {
  bottom: false,
  animated: false,
  final: false,
  hinge: false
}

Flap.propTypes = {
  bottom: PropTypes.bool,
  animated: PropTypes.bool,
  final: PropTypes.bool,
  hinge: PropTypes.bool
}
