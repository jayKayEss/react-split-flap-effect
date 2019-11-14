import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import FlapDigit from './FlapDigit'

const FlapStack = ({ preset, value }) => {
  const [stack, setStack] = useState([])
  const [cursor, setCursor] = useState(0)

  // const stackRef = useRef(stack)
  const cursorRef = useRef(cursor)
  cursorRef.current = cursor

  useEffect(() => {
    setStack(preset.split(''))
    setCursor(0)
  }, [preset])

  useEffect(() => {
    const timer = setInterval(() => {
      const cursor = cursorRef.current

      if (stack[cursor] === value) {
        clearInterval(timer)
      } else if (cursor >= stack.length - 1) {
        setCursor(0)
      } else {
        setCursor(cursor + 1)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [value])

  return <FlapDigit value={stack[cursor]} />
}

FlapStack.defaultProps = {

}

FlapStack.propTypes = {
  preset: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default FlapStack
