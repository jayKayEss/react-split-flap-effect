const { configure, mount, render, shallow } = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16')

configure({ adapter: new EnzymeAdapter() })
global.shallow = shallow
global.mount = mount
global.render = render
global.React = require('react')
