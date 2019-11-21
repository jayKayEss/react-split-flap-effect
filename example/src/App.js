/* eslint-disable react/jsx-fragments */
import React, { useEffect, useState, useRef } from 'react'
import { FlapDisplay, Presets } from 'react-flapper'
import 'react-flapper/extras/themes.css'
import './index.css'

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

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

const Modes = {
  Numeric: 0,
  Alphanumeric: 1,
  Words: 2
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
  const [theme, setTheme] = useState('')
  const [length, setLength] = useState(6)
  const [timing, setTiming] = useState(30)
  const [value, setValue] = useState(randomValue(mode, length))
  const [hinge, setHinge] = useState(true)

  const modeRef = useRef(mode)
  modeRef.current = mode

  const lengthRef = useRef(length)
  lengthRef.current = length

  useEffect(() => {
    setLength(mode === Modes.Alphanumeric ? 12 : 6)
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
      <div>
        <FlapDisplay
          className={`demoFlapper ${theme}`}
          value={value}
          chars={mode === Modes.Numeric ? Presets.NUM : Presets.ALPHANUM}
          words={mode === Modes.Words ? Words : undefined}
          length={length}
          timing={timing}
          hinge={hinge}
        />
      </div>
      <form>
        <fieldset>
          Mode:
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
          <label>
            Theme:
            <select name='theme' value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value=''>Default</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Options</legend>
          <label>
            Length <input type='number' name='length' value={length} min='1' onChange={e => setLength(Number(e.target.value))} />
          </label>
          <label>
            <input type='checkbox' name='hinge' checked={hinge} onChange={e => setHinge(e.target.checked)} /> Hinge
          </label>
        </fieldset>
      </form>
    </div>
  )
}
