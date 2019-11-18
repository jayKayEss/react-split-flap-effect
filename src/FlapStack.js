import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { FlapDigit } from './FlapDigit'

// Set these three values as one state var
// to avoid in-between render states
const InitialCursor = {
  current: 0,
  previous: -1,
  target: 0
}

export const FlapStack = ({ stack, value, timing, ...restProps }) => {
  const [cursor, setCursor] = useState(InitialCursor)

  const stackRef = useRef(stack)
  stackRef.current = stack

  const cursorRef = useRef(cursor)
  cursorRef.current = cursor

  useEffect(() => {
    setCursor(InitialCursor)
  }, [stack])

  useEffect(() => {
    const { current, previous } = cursor
    const target = Math.max(stack.indexOf(value), 0)
    setCursor({ current, previous, target })

    const timer = setInterval(() => {
      const { current, target } = cursorRef.current
      const stack = stackRef.current

      if (current === target) {
        clearInterval(timer)
      } else if (current >= stack.length - 1) {
        setCursor({
          current: 0,
          previous: current,
          target
        })
      } else {
        setCursor({
          current: current + 1,
          previous: current,
          target
        })
      }
    }, timing)

    return () => clearInterval(timer)
  }, [stack, value])

  const { current, previous } = cursor
  return (
    <FlapDigit
      value={stack[current]}
      prevValue={stack[previous]}
      {...restProps}
    />
  )
}

FlapStack.defaultProps = {

}

FlapStack.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  timing: PropTypes.number
}
