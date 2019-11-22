/* eslint-disable react/jsx-fragments */
import React, { useEffect, useState, useRef } from 'react'
import { FlapDisplay, Presets } from 'react-flapper'
import 'react-flapper/extras/themes.css'
import './index.css'

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

export const App = () => {
  const [mode, setMode] = useState(Modes.Numeric)
  const [autoplay, setAutoplay] = useState(true)
  const [theme, setTheme] = useState('')
  const [colorScheme, setColorScheme] = useState('')
  const [chars, setChars] = useState(Presets.NUM)
  const [words, setWords] = useState(Words)
  const [length, setLength] = useState(6)
  const [timing, setTiming] = useState(30)
  const [padding, setPadding] = useState(' ')
  const [padMode, setPadMode] = useState('auto')
  const [value, setValue] = useState('')
  const [hinge, setHinge] = useState(true)

  const modeRef = useRef(mode)
  modeRef.current = mode

  const lengthRef = useRef(length)
  lengthRef.current = length

  const wordsRef = useRef(words)
  wordsRef.current = words

  const randomNum = (min, max) => Math.floor((Math.random() ** 5) * (max - min + 1) + min)

  const randomValue = () => {
    const mode = modeRef.current
    const length = lengthRef.current
    const words = wordsRef.current

    if (mode === Modes.Numeric) {
      return String(randomNum(0, 10 ** length - 1))
    } else {
      return words[Math.floor(Math.random() * (words.length - 1)) + 1]
    }
  }

  useEffect(() => {
    setChars(mode === Modes.Numeric ? Presets.NUM : Presets.ALPHANUM)
    setLength(mode === Modes.Alphanumeric ? 12 : 6)
  }, [mode])

  useEffect(() => {
    if (autoplay) {
      setValue(randomValue())
      const timing = mode === Modes.Alphanumeric ? 6000 : 3000
      const timer = setInterval(() => {
        setValue(randomValue())
      }, timing)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [mode, autoplay])

  return (
    <div>
      <div>
        <FlapDisplay
          className={`demoFlapper ${theme} ${colorScheme}`}
          value={value}
          chars={chars}
          words={mode === Modes.Words ? words : undefined}
          length={length}
          timing={timing}
          hinge={hinge}
          padding={padding}
          padMode={padMode}
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>Demo mode</legend>
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
            <input type='checkbox' name='autoplay' checked={autoplay} onChange={e => setAutoplay(e.target.checked)} /> Update automatically
          </label>
        </fieldset>
        <fieldset>
          <legend>CSS</legend>
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
          &nbsp;
          <label>
            Color scheme:
            <select name='colorScheme' value={colorScheme} onChange={(e) => setColorScheme(e.target.value)}>
              <option value=''>Default</option>
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
              <option value='lightBordered'>Light Bordered</option>
              <option value='darkBordered'>Dark Bordered</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Options</legend>
          <div>
            <label>
              Class name <input type='text' name='className' disabled value={`${theme} ${colorScheme}`} />
            </label>
          </div>
          <div>
            <label>
              Value <input type='text' name='value' value={value} disabled={autoplay} onChange={e => setValue(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Chars <input type='text' name='chars' value={chars} disabled={mode === Modes.Words} onChange={e => setChars(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Words <input type='text' name='words' value={Array(words).join(', ')} disabled={mode !== Modes.Words} onChange={e => setWords(String(e.target.value).split(/\s*,\s*/))} />
            </label>
          </div>
          <div>
            <label>
              Length <input type='number' name='length' value={length} min='1' disabled={mode === Modes.Words} onChange={e => setLength(Math.max(Number(e.target.value), 1))} />
            </label>
          </div>
          <div>
            <label>
              Timing <input type='number' name='timing' value={timing} min='1' onChange={e => setTiming(Math.max(Number(e.target.value), 1))} />
            </label>
          </div>
          <div>
            <label>
              Padding <input type='text' name='padding' value={padding} size='1' disabled={mode === Modes.Words} onChange={e => setPadding(String(e.target.value).slice(0, 1))} />
            </label>
          </div>
          <label>
            Pad mode:
            <select name='padMode' value={padMode} disabled={mode === Modes.Words} onChange={(e) => setPadMode(e.target.value)}>
              <option value='auto'>Automatic</option>
              <option value='start'>Start (right align)</option>
              <option value='end'>End (left align)</option>
            </select>
          </label>
          <div>
            <label>
              <input type='checkbox' name='hinge' checked={hinge} onChange={e => setHinge(e.target.checked)} /> Hinge
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
