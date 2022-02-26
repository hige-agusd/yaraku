import React from 'react';
import { shallow } from "enzyme"
import App from './App';

describe('Books Table test suite', () => {
    it('should render the Table component', () => {
        const component = shallow(<App />);
        expect(component).toHaveLength(1);
    })
})