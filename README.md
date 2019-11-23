# react-split-flap-effect

> Split-flap display for React

[![NPM](https://img.shields.io/npm/v/react-split-flap-effect.svg)](https://www.npmjs.com/package/react-split-flap-effect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-split-flap-effect
;; or
yarn add react-split-flap-effect
```

## Usage

```jsx
import { FlapDisplay, Presets } from 'react-split-flap-effect'

const App = () => {
  return (
    <FlapDisplay
      chars={Presets.ALPHANUM}
      length={12}
      value={'Some string...'}
    />
  )
}
```

## License

MIT © [jayKayEss](https://github.com/jayKayEss)
