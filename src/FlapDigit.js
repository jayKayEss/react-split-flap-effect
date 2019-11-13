import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
console.log('STYLEZZZ', styles)

const FlapDigit = ({ value }) => {
  return (
    <div className={styles.digit}>
      <div key={`upper-${value}`} className={`${styles.flapTop} ${styles.animated}`}>
        <div>{value}</div>
      </div>
      <div key={`lower-${value}`} className={`${styles.flapBottom} ${styles.animated}`}>
        <div>{value}</div>
      </div>
    </div>
  )
}

FlapDigit.defaultProps = {
  value: ''
}

FlapDigit.propTypes = {
  value: PropTypes.string
}

export default FlapDigit
