import React, { useState, useEffect, useRef } from 'react'
import FlapDisplay from 'react-flapper'

const styles = {
  margin: '25px'
}

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const App = () => {
  const min = 100000
  const max = 999999

  const [value, setValue] = useState(randomNum(min, max))
  // const [value, setValue] = useState('000000')

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(randomNum(min, max))
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
