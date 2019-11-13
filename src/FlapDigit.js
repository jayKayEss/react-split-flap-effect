import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
console.log('STYLEZZZ', styles)

const FlapDigit = ({ value }) => {
  return (
    <div className={styles.digit}>
      <div className={`${styles.flap} ${styles.top}`}>
        9
      </div>
      <div className={`${styles.flap} ${styles.bottom}`}>
        <div>9</div>
      </div>
      <div key={`upper-${value}`} className={`${styles.flap} ${styles.top} ${styles.animated}`}>
        <div>{value}</div>
      </div>
      <div key={`lower-${value}`} className={`${styles.flap} ${styles.bottom} ${styles.animated}`}>
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
