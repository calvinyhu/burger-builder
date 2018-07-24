import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';

// enzyme is now connected to react
configure({adapter: new Adapter()})

// Each test is independent of the other
describe('<NavigationItems />', () => {
    let wrapper

    // @beforeEach runs before each test
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })
    // afterEach();

    it('should render 2 <NavigationItem /> elements if not authenticated.', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render 4 <NavigationItem /> elements if authenticated.', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(4)
    })

    it('should render 4 <NavigationItem /> elements if authenticated.', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link='/checkout'>Checkout</NavigationItem>)).toEqual(true)
    })
})