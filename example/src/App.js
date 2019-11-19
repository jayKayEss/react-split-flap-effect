/* eslint-disable react/jsx-fragments */
import React, { useEffect, useState } from 'react'
import { FlapDisplay } from 'react-flapper'

const styles = {
  margin: '25px'
}

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const Rando = (props) => {
  const min = 100000
  const max = 999999

  const [value, setValue] = useState(randomNum(min, max))

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
      <FlapDisplay
        value={value.toString()}
        {...props}
      />
    </div>
  )
}

const words = [
  '',
  'Washington',
  'Baltimore',
  'Philadelphia',
  'Newark',
  'New York',
  'New Haven',
  'Providence',
  'Boston'
]

const randWord = () => words[Math.floor(Math.random() * (words.length - 1)) + 1]

const RandWords = (props) => {
  const [value, setValue] = useState(randWord())

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(randWord())
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div style={styles}>
      <FlapDisplay
        value={value}
        words={words}
        {...props}
      />
    </div>
  )
}

const InnerDisplay = ({ children, fontSize, lineHeight, background }) => {
  const placeholderStyle = {
    color: background,
    fontSize,
    lineHeight,
    display: 'inline-block',
    verticalAlign: 'top'
  }

  return (
    <React.Fragment>
      <div style={placeholderStyle}>$</div>
      {children[0]}
      {children[1]}
      {children[2]}
      <div style={placeholderStyle}>.</div>
      {children[4]}
      {children[5]}
      {children[6]}
    </React.Fragment>
  )
}

const App = () => (
  <React.Fragment>
    {/* <Rando timing={500} /> */}
    {/* <Rando timing={300} /> */}
    {/* <Rando timing={150} animationDuration={500} /> */}
    <Rando render={InnerDisplay} />
    <RandWords width={600} fontSize='80px' lineHeight='90px' />
  </React.Fragment>
)

export default App
