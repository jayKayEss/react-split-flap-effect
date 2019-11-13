import React, { useState, useEffect, useRef } from 'react'
import FlapDisplay, { FlapDigit } from 'react-flapper'

const styles = {
  margin: '25px'
}

const App = () => {
  const [value, setValue] = useState(0)
  const valueRef = useRef(value)
  valueRef.current = value

  useEffect(() => {
    const timer = setInterval(() => {
      const value = valueRef.current
      if (value < 9) {
        setValue(value + 1)
      } else {
        setValue(0)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div style={styles}>
      <FlapDigit value={value.toString()} />
    </div>
  )
}

export default App
