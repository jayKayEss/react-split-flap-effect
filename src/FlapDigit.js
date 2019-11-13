import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const FlapDigit = ({ value }) => {
  return <div class={styles.digit}>{value}</div>
}

FlapDigit.defaultProps = {
  value: ''
}

FlapDigit.propTypes = {
  value: PropTypes.string
}

export default FlapDigit
