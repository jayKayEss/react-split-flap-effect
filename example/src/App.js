import React, { useState, useEffect, useRef } from 'react'
import FlapDisplay from 'react-flapper'

const styles = {
  margin: '25px'
}

const App = () => {
  const [value, setValue] = useState('000000')

  useEffect(() => {
    const timer = setInterval(() => {
      const min = 100000
      const max = 999999
      setValue(Math.floor(Math.random() * (max - min + 1) + min))
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div style={styles}>
      <FlapDisplay value={value.toString()} />
    </div>
  )
}

export default App
