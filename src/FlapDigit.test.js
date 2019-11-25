/* eslint-env jest */
import { mount } from 'enzyme'
import { FlapDigit } from './FlapDigit'
import { Flap } from './Flap'

describe('<FlapDigit/>', () => {
  let props
  let el

  beforeEach(() => {
    props = {
      value: 'A',
      prevValue: ' ',
      final: false,
      mode: 'alpha'
    }

    el = mount(<FlapDigit {...props} />)
  })

  describe('child div', () => {
    let div

    beforeEach(() => {
      div = el.children().first()
    })

    it('exists', () => {
      expect(div.type()).toEqual('div')
    })

    it('has a data-kind attribute', () => {
      expect(div.prop('data-kind')).toEqual('digit')
    })

    it('has a data-mode attribute', () => {
      expect(div.prop('data-mode')).toEqual('alpha')
    })
  })

  describe('child <Flap/>s', () => {
    let flaps

    beforeEach(() => {
      flaps = el.find(Flap)
    })

    it('has three children', () => {
      expect(flaps.length).toEqual(3)
    })

    it('configures the first <Flap/>', () => {
      const flap = flaps.at(0)
      expect(flap.text()).toEqual(props.value)
      expect(flap.prop('bottom')).not.toBeTruthy()
      expect(flap.prop('animated')).not.toBeTruthy()
      expect(flap.prop('final')).not.toBeTruthy()
    })

    it('configures the second <Flap/>', () => {
      const flap = flaps.at(1)
      expect(flap.text()).toEqual(props.prevValue)
      expect(flap.prop('bottom')).toBeTruthy()
      expect(flap.prop('animated')).not.toBeTruthy()
      expect(flap.prop('final')).not.toBeTruthy()
    })

    it('configures the third <Flap/>', () => {
      const flap = flaps.at(2)
      expect(flap.text()).toEqual(props.prevValue)
      expect(flap.prop('bottom')).not.toBeTruthy()
      expect(flap.prop('animated')).toBeTruthy()
      expect(flap.prop('final')).not.toBeTruthy()
    })
  })

  describe('in final mode', () => {
    beforeEach(() => {
      el = mount(<FlapDigit {...props} final />)
    })

    describe('child <Flap/>s', () => {
      let flaps

      beforeEach(() => {
        flaps = el.find(Flap)
      })

      it('has four children', () => {
        expect(flaps.length).toEqual(4)
      })

      it('configures the first <Flap/>', () => {
        const flap = flaps.at(0)
        expect(flap.text()).toEqual(props.value)
        expect(flap.prop('bottom')).not.toBeTruthy()
        expect(flap.prop('animated')).not.toBeTruthy()
        expect(flap.prop('final')).not.toBeTruthy()
      })

      it('configures the second <Flap/>', () => {
        const flap = flaps.at(1)
        expect(flap.text()).toEqual(props.prevValue)
        expect(flap.prop('bottom')).toBeTruthy()
        expect(flap.prop('animated')).not.toBeTruthy()
        expect(flap.prop('final')).not.toBeTruthy()
      })

      it('configures the third <Flap/>', () => {
        const flap = flaps.at(2)
        expect(flap.text()).toEqual(props.prevValue)
        expect(flap.key()).toEqual(`top-${props.prevValue}`)
        expect(flap.prop('bottom')).not.toBeTruthy()
        expect(flap.prop('animated')).toBeTruthy()
        expect(flap.prop('final')).toBeTruthy()
      })

      it('configures the fourth <Flap/>', () => {
        const flap = flaps.at(3)
        expect(flap.text()).toEqual(props.value)
        expect(flap.key()).toEqual(`bottom-${props.value}`)
        expect(flap.prop('bottom')).toBeTruthy()
        expect(flap.prop('animated')).toBeTruthy()
        expect(flap.prop('final')).toBeTruthy()
      })
    })
  })

  it('passes props down', () => {
    el = mount(<FlapDigit {...props} foo='bar' />)
    el.find(Flap).forEach((flap) => {
      expect(flap.prop('foo')).toEqual('bar')
    })
  })
})
