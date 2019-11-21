import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import classnames from 'classnames'

export const Flap = ({ above, bottom, animated, final, hinge, children }) => {
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
