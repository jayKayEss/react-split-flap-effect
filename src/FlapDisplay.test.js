/* eslint-env jest */
import { FlapDisplay } from './FlapDisplay'
import { shallow, mount } from 'enzyme'
import { FlapStack } from './FlapStack'

describe('<FlapDisplay/>', () => {
  let props

  beforeEach(() => {
    props = {
      value: 'A',
      length: 2,
      chars: ' A',
      hinge: true,
      timing: 30
    }
  })

  it('applies a custom className', () => {
    const el = shallow(<FlapDisplay {...props} className='classNameSentinel' />)
    expect(el.exists('div.classNameSentinel')).toBeTruthy()
  })

  it('applies a custom id', () => {
    const el = shallow(<FlapDisplay {...props} id='IdSentinel' />)
    expect(el.exists('#IdSentinel')).toBeTruthy()
  })

  it('passes the css prop', () => {
    const cssSentinel = { foo: 'bar' }
    const el = shallow(<FlapDisplay {...props} css={cssSentinel} />)
    expect(el.find('div').prop('css')).toEqual(cssSentinel)
  })

  describe('using padding options', () => {
    it('pads numbers at start', () => {
      const el = mount(<FlapDisplay {...props} value='1' />)
      expect(el.find(FlapStack).first().prop('value')).toEqual(' ')
    })

    it('pads words at end', () => {
      const el = mount(<FlapDisplay {...props} value='X' />)
      expect(el.find(FlapStack).first().prop('value')).toEqual('X')
    })

    it('respects padMode prop', () => {
      const el = mount(<FlapDisplay {...props} value='X' padMode='start' />)
      expect(el.find(FlapStack).first().prop('value')).toEqual(' ')
    })

    it('respects padChar prop', () => {
      const el = mount(<FlapDisplay {...props} value='1' padChar='0' />)
      expect(el.find(FlapStack).first().prop('value')).toEqual('0')
    })
  })

  describe('using custom render func', () => {
    it('calls the render func', () => {
      const Render = jest.fn(() => null)
      mount(<FlapDisplay {...props} render={Render} />)
      expect(Render).toHaveBeenCalled()
    })

    it('passes props to the render func', () => {
      const Render = jest.fn(() => null)
      mount(<FlapDisplay {...props} render={Render} />)
      const args = { ...Render.mock.calls[0][0] }
      delete args.children
      expect(args).toEqual({
        className: undefined,
        css: undefined,
        id: undefined,
        hinge: true,
        timing: 30
      })
    })

    it('passes children to the render func', () => {
      const Render = jest.fn(() => null)
      mount(<FlapDisplay {...props} render={Render} />)
      const args = Render.mock.calls.pop()
      expect(args[0].children.length).toEqual(2)
    })
  })

  describe('child components', () => {
    describe('alpha mode', () => {
      let el
      let digits

      beforeEach(() => {
        el = mount(<FlapDisplay {...props} />)
        digits = el.find(FlapStack)
      })

      it('renders the correct number of digits', () => {
        expect(digits.length).toEqual(2)
      })

      it('splits chars into a stack', () => {
        expect(digits.first().prop('stack')).toEqual([' ', 'A'])
      })

      it('sets the mode param', () => {
        expect(digits.first().prop('mode')).toEqual('alpha')
      })

      it('sets the values', () => {
        expect(digits.first().prop('value')).toEqual('A')
        expect(digits.last().prop('value')).toEqual(' ')
      })

      it('passes additional props', () => {
        expect(digits.first().prop('hinge')).toBeTruthy()
        expect(digits.first().prop('timing')).toEqual(30)
      })
    })

    describe('num mode', () => {
      const chars = ' 0123456789'
      let el
      let digits

      beforeEach(() => {
        el = mount(<FlapDisplay {...props} chars={chars} value='1' />)
        digits = el.find(FlapStack)
      })

      it('renders the correct number of digits', () => {
        expect(digits.length).toEqual(2)
      })

      it('splits chars into a stack', () => {
        expect(digits.first().prop('stack')).toEqual(chars.split(''))
      })

      it('sets the mode param', () => {
        expect(digits.first().prop('mode')).toEqual('num')
      })

      it('sets the values', () => {
        expect(digits.first().prop('value')).toEqual(' ')
        expect(digits.last().prop('value')).toEqual('1')
      })

      it('passes additional props', () => {
        expect(digits.first().prop('hinge')).toBeTruthy()
        expect(digits.first().prop('timing')).toEqual(30)
      })
    })

    describe('words mode', () => {
      const words = ['this', 'that']
      let el
      let digits

      beforeEach(() => {
        el = mount(<FlapDisplay {...props} words={words} value='this' />)
        digits = el.find(FlapStack)
      })

      it('renders the correct number of digits', () => {
        expect(digits.length).toEqual(1)
      })

      it('passes words as the stack', () => {
        expect(digits.first().prop('stack')).toEqual(words)
      })

      it('sets the values', () => {
        expect(digits.first().prop('value')).toEqual('this')
      })

      it('passes additional props', () => {
        expect(digits.first().prop('hinge')).toBeTruthy()
        expect(digits.first().prop('timing')).toEqual(30)
      })
    })
  })
})
