import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import FlapDigit from './FlapDigit'

// Current index, previous index
// (-1 to render a blank character)
const InitialCursor = [0, -1]

const FlapStack = ({ preset, value }) => {
  const [stack, setStack] = useState([])
  const [cursor, setCursor] = useState(InitialCursor)

  const stackRef = useRef(stack)
  stackRef.current = stack

  const cursorRef = useRef(cursor)
  cursorRef.current = cursor

  useEffect(() => {
    setStack(preset.split(''))
    setCursor(InitialCursor)
  }, [preset])

  useEffect(() => {
    const timer = setInterval(() => {
      const cursor = cursorRef.current[0]
      const stack = stackRef.current

      if (stack[cursor] === value) {
        clearInterval(timer)
      } else if (cursor >= stack.length - 1) {
        setCursor([0, cursor])
      } else {
        setCursor([cursor + 1, cursor])
      }
    }, 210)

    return () => clearInterval(timer)
  }, [preset, value])

  const [currCursor, prevCursor] = cursor
  return <FlapDigit value={stack[currCursor]} prevValue={stack[prevCursor]} />
}

FlapStack.defaultProps = {

}

FlapStack.propTypes = {
  preset: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default FlapStack
