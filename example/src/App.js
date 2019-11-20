/* eslint-disable react/jsx-fragments */
import React, { useEffect, useState, useRef } from 'react'
import { FlapDisplay, Presets } from 'react-flapper'
import styles from './index.css'

// const styles = {
//   margin: '25px'
// }

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// const Rando = (props) => {
//   const min = 100000
//   const max = 999999

//   const [value, setValue] = useState(randomNum(min, max))

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setValue(randomNum(min, max))
//     }, 3000)

//     return () => {
//       clearTimeout(timer)
//     }
//   }, [])

//   return (
//     <div style={styles}>
//       <FlapDisplay
//         value={value.toString()}
//         {...props}
//       />
//     </div>
//   )
// }

const Words = [
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

// const randWord = () => words[Math.floor(Math.random() * (words.length - 1)) + 1]

// const RandWords = (props) => {
//   const [value, setValue] = useState(randWord())

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setValue(randWord())
//     }, 3000)

//     return () => {
//       clearTimeout(timer)
//     }
//   }, [])

//   return (
//     <div style={styles}>
//       <FlapDisplay
//         value={value}
//         words={words}
//         {...props}
//       />
//     </div>
//   )
// }

// const InnerDisplay = ({ children, fontSize, lineHeight, background }) => {
//   const placeholderStyle = {
//     color: background,
//     fontSize,
//     lineHeight,
//     display: 'inline-block',
//     verticalAlign: 'top'
//   }

//   return (
//     <React.Fragment>
//       <div style={placeholderStyle}>$</div>
//       {children[0]}
//       {children[1]}
//       {children[2]}
//       <div style={placeholderStyle}>.</div>
//       {children[4]}
//       {children[5]}
//       {children[6]}
//     </React.Fragment>
//   )
// }

// const App = () => (
//   <React.Fragment>
//     {/* <Rando timing={500} /> */}
//     {/* <Rando timing={300} /> */}
//     {/* <Rando timing={150} animationDuration={500} /> */}
//     <Rando render={InnerDisplay} />
//     <RandWords width={600} fontSize='80px' lineHeight='90px' />
//   </React.Fragment>
// )

// export default App

const Modes = {
  Numeric: 0,
  Alphanumeric: 1,
  Words: 2
}

const Widths = {
  [Modes.Numeric]: 50,
  [Modes.Alphanumeric]: 56,
  [Modes.Words]: 400
}

const randomValue = (mode, length) => {
  if (mode === Modes.Numeric) {
    return String(randomNum(0, 10 ** length - 1))
  } else {
    return Words[Math.floor(Math.random() * (Words.length - 1)) + 1]
  }
}

export const App = () => {
  const [mode, setMode] = useState(Modes.Numeric)
  const [length, setLength] = useState(6)
  const [timing, setTiming] = useState(30)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(64)
  const [value, setValue] = useState(randomValue(mode, length))

  const modeRef = useRef(mode)
  modeRef.current = mode

  const lengthRef = useRef(length)
  lengthRef.current = length

  useEffect(() => {
    setLength(mode === Modes.Alphanumeric ? 12 : 6)
    setWidth(Widths[mode])
    setHeight(64)
    setValue(randomValue(mode, length))

    const timing = mode === Modes.Alphanumeric ? 6000 : 3000
    const timer = setInterval(() => {
      setValue(randomValue(modeRef.current, lengthRef.current))
    }, timing)

    return () => {
      clearTimeout(timer)
    }
  }, [mode])

  return (
    <div>
      <div className='demoFlapper'>
        <FlapDisplay
          className='demoFlapperDigit'
          value={value}
          chars={mode === Modes.Numeric ? Presets.NUM : Presets.ALPHANUM}
          words={mode === Modes.Words ? Words : undefined}
          length={length}
          timing={timing}
          width={width}
          height={height}
        />
      </div>
      <form>
        <fieldset>
          <legend>Mode</legend>
          <label>
            <input type='radio' name='mode' value={Modes.Numeric} checked={mode === Modes.Numeric} onChange={() => setMode(Modes.Numeric)} />
            Numeric
          </label>
          <label>
            <input type='radio' name='mode' value={Modes.Alphanumeric} checked={mode === Modes.Alphanumeric} onChange={() => setMode(Modes.Alphanumeric)} />
            Alphanumeric
          </label>
          <label>
            <input type='radio' name='mode' value={Modes.Words} checked={mode === Modes.Words} onChange={() => setMode(Modes.Words)} />
            Words
          </label>
        </fieldset>
        <fieldset>
          <legend>Required Options</legend>
          <label>
            Length <input type='number' name='length' value={length} min='1' onChange={e => setLength(parseInt(e.target.value))} />
          </label>
          <label>
            Width <input type='number' name='width' value={width} min='1' onChange={e => setWidth(parseInt(e.target.value))} />
          </label>
          <label>
            Height <input type='number' name='height' value={height} min='1' onChange={e => setHeight(parseInt(e.target.value))} />
          </label>
        </fieldset>
      </form>
    </div>
  )
}
