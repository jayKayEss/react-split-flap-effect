# react-split-flap-effect

> Split-flap display for React

[![NPM](https://img.shields.io/npm/v/react-split-flap-effect.svg)](https://www.npmjs.com/package/react-split-flap-effect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description

This component recreates the look of "split-flap" (a/k/a Solari) displays that used to be common in train stations and on alarm clocks.

* [Demo](https://jaykayess.github.io/react-split-flap-effect/)
* [Real-life Solari display in action](https://www.youtube.com/watch?v=yCpI3WqhJvg)

## Install

```bash
npm install --save react-split-flap-effect
```
or
```bash
yarn add react-split-flap-effect
```

## Usage

```jsx
import { FlapDisplay, Presets } from 'react-split-flap-effect'

const App = () => {
  return (
    <FlapDisplay
      chars={Presets.ALPHANUM + ',!'}
      length={13}
      value={'Hello, World!'}
    />
  )
}
```

## Props

Prop | Type | Default | Usage
---- | ---- | ------- | -----
`id` | string | | Applies an `id` to the enclosing div
`css` | Object | | Style object to pass to [emotion](https://emotion.sh) or [styled-components](https://www.styled-components.com)
`className` | string | | Class names to apply to the enclosing div
`value` | string | _required_ | The value to display. Will be uppercased unless `words` is also supplied.
`chars` | string | `Presets.NUM` | Single string containing the list of valid characters to display. The package provides `Presets.NUM` and `Presets.ALPHANUM` as starting points. Append whatever punctionation you need to those strings. The presets include space as the first character, which is recommended so that you'll be able to display blank values.
`words` | Array[string] | | Optional array of strings to use as states for the flaps instead of single characters. When this is supplied, `chars` will be ignored, and `value` won't be split into individual characters.
`length` | int | _required_ | The number of digits to display
`padChar` | char | `' '` | The character to use to fill empty digits.
`padMode` | string | `'auto'` | Controls padding of values; `auto` will try to align numbers to the right and strings to the left; `start` will align values to the right and `end` will align values to the left.
`timing` | int | `30` | Milliseconds to use for the rapid change animation. Numbers from `10`-`50` work best here. (This value doesn't affect the final flap of the animation, which is fixed at `300ms`.)
`hinge` | bool | `true` | Controls whether to show the thin line through the center of flaps
`render` | func | | A functional component that can be used to customize rendering. The individual flap digit components will be passed as the component's children. This can be used to insert things between the digits (for instance, you might want to show fixed symbols like decimal points and commas between digits, rather than using an extra digit for these.)

## Themes

The package comes with a stylesheet in `extras/themes.css` with some pre-built themes. These themes will load a Google font called 'Share' that resembles real-life Solari displays.

Import the stylesheet and apply some combination of the following in the `className` prop:

Class name | Usage
---------- | -----
`S` | Custom font at `18px`
`M` | Custom font at `30px`
`L` | Custom font at `48px`
`XL` | Custom font at `78px`
`light` | Dark-gray text on a light-gray background
`lightBordered` | Light color theme plus a subtle border and margins between digits
`dark` | Light-gray text on a dark-gray background
`darkBordered` | Dark color theme plus a subtle border and margins between digits

## Custom styling

The split-flap display's appearance is controlled using CSS. This allows you to use whatever strategy you want (plain CSS, CSS modules, styled components, etc.) for styling and responsive design.

To create a custom style, add a custom `className` (or `id`) and override these rules. (Values shown are defaults just for clarity's sake—you can leave them out of your custom CSS if you're not changing them.) You can also take a look at `extras/themes.css` for examples.

```css
.myClassName [data-kind="digit"] {
  // set fonts and add borders, margins, backgrounds, etc. here
  color: white;
  background-color: black;
  font-family: sans-serif;
  line-height: 1em;
  width: 1.1ch;
  height: 1em;
  text-align: center;
}

.myClassName [data-kind="digit"][data-mode="words"] {
  // width override for single-word flaps
  width: 100%;
}

.myClassName [data-kind="digit"][data-mode="alpha"] {
  // width override for A-Z flaps
  width: 1.7ch;  
}

.myClassName [data-kind="hinge"] {
  // set the width of the hinge stripe
  height: 0.04em;
}
```

Be aware that if you change any `position`, `display` or `transform` properties in these rules, I can't guarantee what the animation'll look like. 😀

The default values above will work OK for Arial/Helvetica (the default sans-serif font on most clients.) But, in general it's better to choose a narrow or "condensed" font because these generally have skinnier capital letters, and less variation between letter widths.

If you choose a custom font, pay close attention to the `line-height` of your text. Because there's no consistent sizing between different typefaces, you'll need to manually adjust this to make the text appear centered vertically in the flaps.

## Caveats

I'm using the `clip-path` CSS property, which isn't well-supported on IE or Edge (Trident). On these clients the animation will look a little strange, but it shouldn't break the layout of your page or be unreadable.

Chrome in particular has some subpixel rendering issues that can cause the two halves of each letter to be slightly misaligned. You might also see some very minor screen tearing if you disable the hinge effect. Safari seems to deal better with these issues. (I also suspect the alignment issue might go away if you set fixed pixel widths on your digits, instead of the relative units I'm using for flexibility.)

## License

MIT © 2019 [Justin Kerr Sheckler](https://github.com/jayKayEss)
