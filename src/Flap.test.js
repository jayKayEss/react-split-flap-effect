/* eslint-env jest */
import { mount } from 'enzyme'
import { Flap } from './Flap'

jest.mock('./styles.css', () => ({
  bottom: 'bottom',
  top: 'top',
  animated: 'animated',
  final: 'final',
  hinge: 'hinge'
}))

describe('<Flap/>', () => {
  let props
  let text
  let el
  let div

  beforeEach(() => {
    props = {
      bottom: false,
      animated: false,
      final: false,
      hinge: false
    }

    text = 'X'
  })

  describe('when all props are false', () => {
    beforeEach(() => {
      el = mount(<Flap {...props}>{text}</Flap>)
      div = el.children().first()
    })

    it('has appropriate class names', () => {
      expect(div.hasClass('bottom')).not.toBeTruthy()
      expect(div.hasClass('top')).toBeTruthy()
      expect(div.hasClass('animated')).not.toBeTruthy()
      expect(div.hasClass('final')).not.toBeTruthy()
    })

    it('contains the text', () => {
      expect(el.text()).toEqual(text)
    })

    it('does not include hinge', () => {
      expect(el.exists('[data-kind="hinge"]')).not.toBeTruthy()
    })
  })

  describe('when bottom is true', () => {
    beforeEach(() => {
      el = mount(<Flap {...props} bottom>{text}</Flap>)
      div = el.children().first()
    })

    it('has the bottom class name', () => {
      expect(div.hasClass('bottom')).toBeTruthy()
    })

    it('does not have the top class name', () => {
      expect(div.hasClass('top')).not.toBeTruthy()
    })
  })

  describe('when animated is true', () => {
    beforeEach(() => {
      el = mount(<Flap {...props} animated>{text}</Flap>)
      div = el.children().first()
    })

    it('has the animated class name', () => {
      expect(div.hasClass('animated')).toBeTruthy()
    })
  })

  describe('when final is true', () => {
    beforeEach(() => {
      el = mount(<Flap {...props} final>{text}</Flap>)
      div = el.children().first()
    })

    it('has the final class name', () => {
      expect(div.hasClass('final')).toBeTruthy()
    })
  })

  describe('when hinge is true', () => {
    let hinge

    beforeEach(() => {
      el = mount(<Flap {...props} hinge>{text}</Flap>)
      hinge = el.find('[data-kind="hinge"]')
    })

    it('includes hinge', () => {
      expect(el.exists('[data-kind="hinge"]')).toBeTruthy()
    })

    it('sets class name on hinge', () => {
      expect(hinge.hasClass('hinge')).toBeTruthy()
    })
  })
})
