import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents />', () => {

    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
    });

    test('number of events are rendered', () => {
        expect(NumberOfEventsWrapper).toBeDefined();
    });
    test('input is 32 by default', () => {
        expect(NumberOfEventsWrapper.state('query')).toBe(32);
    });
    test('input is changed, state and value are reflected correctly', () => {
        NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', {
            target: { value: 15 },
        });
        expect(NumberOfEventsWrapper.state('query')).toBe(32);
    });
});
