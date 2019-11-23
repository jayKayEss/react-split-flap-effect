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
    <div className='page-container'>
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
        <div className='row'>
          <div className='full'><h2>Demo mode</h2></div>
          <div className='full col-md-50'>
            <input type='radio' name='mode' id='mode:numeric' value={Modes.Numeric} checked={mode === Modes.Numeric} onChange={() => setMode(Modes.Numeric)} />
            <label for='mode:numeric'>Numeric</label>
            <input type='radio' name='mode' id='mode:alpha' value={Modes.Alphanumeric} checked={mode === Modes.Alphanumeric} onChange={() => setMode(Modes.Alphanumeric)} />
            <label for='mode:alpha'>Alphanumeric</label>
            <input type='radio' name='mode' id='mode:words' value={Modes.Words} checked={mode === Modes.Words} onChange={() => setMode(Modes.Words)} />
            <label for='mode:words'>Words</label>
          </div>
          <div className='full col-md-50'>
            <input type='checkbox' id='autoplay' name='autoplay' checked={autoplay} onChange={e => setAutoplay(e.target.checked)} />
            <label for='autoplay'>Update automatically</label>
          </div>
        </div>
        <div className='row'>
          <div className='full'><h2>CSS</h2></div>
          <div className='full col-md-50'>
            <label for='theme'>Theme</label>
            <select id='theme' name='theme' value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value=''>Default</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
            </select>
          </div>
          <div className='full col-md-50'>
            <label for='colorScheme'>Color scheme</label>
            <select id='colorScheme' name='colorScheme' value={colorScheme} onChange={(e) => setColorScheme(e.target.value)}>
              <option value=''>Default</option>
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
              <option value='lightBordered'>Light Bordered</option>
              <option value='darkBordered'>Dark Bordered</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='full'><h2>Props</h2></div>
          <div className='row'>
            <label className='col25'><code>className</code></label>
            <div className='col75'>
              <input type='text' name='className' disabled value={`${theme} ${colorScheme}`} />
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>value</code></label>
            <div className='col75'>
              <input type='text' name='value' value={value} disabled={autoplay} onChange={e => setValue(e.target.value)} />
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>chars</code></label>
            <div className='col75'>
              <input type='text' name='chars' value={chars} disabled={mode === Modes.Words} onChange={e => setChars(e.target.value)} />
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>words</code></label>
            <div className='col75'>
              <input type='text' name='words' value={JSON.stringify(words)} disabled={mode !== Modes.Words} onChange={e => setWords(JSON.parse(e.target.value))} />
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>length</code></label>
            <div className='col75'>
              <input type='number' name='length' value={length} min='1' disabled={mode === Modes.Words} onChange={e => setLength(Math.max(Number(e.target.value), 1))} />
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>timing</code></label>
            <div className='col75'>
              <input type='number' name='timing' value={timing} min='1' onChange={e => setTiming(Math.max(Number(e.target.value), 1))} />
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>padding</code></label>
            <div className='col75'>
              <input type='text' name='padding' value={padding} size='1' disabled={mode === Modes.Words} onChange={e => setPadding(String(e.target.value).slice(0, 1))} />
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>padMode</code></label>
            <div className='col75'>
              <select name='padMode' value={padMode} disabled={mode === Modes.Words} onChange={(e) => setPadMode(e.target.value)}>
                <option value='auto'>Automatic</option>
                <option value='start'>Start (right align)</option>
                <option value='end'>End (left align)</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <label className='col25'><code>hinge</code></label>
            <div className='col75'>
              <input type='checkbox' id='hinge' name='hinge' checked={hinge} onChange={e => setHinge(e.target.checked)} />
              <label for='hinge'>Show hinge</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
