import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import postcssPresetEnv from 'postcss-preset-env'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      globals: { 'styled-components': 'styled' }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals: { 'styled-components': 'styled' }
    }
  ],
  external: ['styled-components'],
  plugins: [
    external(),
    postcss({
      modules: true,
      plugins: [
        postcssPresetEnv({
          features: {
            'nesting-rules': true
          }
        })
      ]
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers',
        'babel-plugin-styled-components'
      ]
    }),
    resolve(),
    commonjs()
  ]
}
