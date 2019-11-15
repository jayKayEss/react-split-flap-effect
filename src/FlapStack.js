import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import FlapDigit from './FlapDigit'

const FlapStack = ({ preset, value }) => {
  const [stack, setStack] = useState([])
  const [cursor, setCursor] = useState(1)

  const stackRef = useRef(stack)
  stackRef.current = stack

  const cursorRef = useRef(cursor)
  cursorRef.current = cursor

  useEffect(() => {
    console.log('EFFECT [stack]')
    setStack(preset.split(''))
    setCursor(0)
  }, [preset])

  useEffect(() => {
    console.log('EFFECT STACK')
    const timer = setInterval(() => {
      const cursor = cursorRef.current
      const stack = stackRef.current
      console.log('TIMER TICK', cursor, value, stackRef)

      if (stack[cursor] === value) {
        clearInterval(timer)
      } else if (cursor >= stack.length - 1) {
        setCursor(0)
      } else {
        setCursor(cursor + 1)
      }
    }, 210)

    return () => clearInterval(timer)
  }, [preset, value])

  const prevCursor = cursor > 0 ? cursor - 1 : stack.length - 1
  console.log('RENDER STACK', cursor, prevCursor, stack)
  return <FlapDigit value={stack[cursor]} prevValue={stack[prevCursor]} />
}

FlapStack.defaultProps = {

}

FlapStack.propTypes = {
  preset: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default FlapStack
