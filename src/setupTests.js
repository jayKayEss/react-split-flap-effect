const { configure, mount, render, shallow } = require('enzyme')
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17')

configure({ adapter: new EnzymeAdapter() })
global.shallow = shallow
global.mount = mount
global.render = render
global.React = require('react')
