import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';


describe('<Event /> component', () => {
    let EventWrapper;
    const event = mockData[0];
    beforeAll(() => {
        EventWrapper = shallow(<Event event={event} />);
        });

    test('render location', () => {
        expect(EventWrapper.find('.eventLocation')).toHaveLength(1);
    });
    test('render header details', () => {
        expect(EventWrapper.find('.eventHeader')).toHaveLength(1);
    });
    test('render event start time', () => {
        const eventStart = EventWrapper.find('.eventStart');
        expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
    });
    test('selecting button should expand event details', () => {
        expect(EventWrapper.find('.details')).toHaveLength(0);
        EventWrapper.setState({ collapsed: true });
        const button = EventWrapper.find('.expand');
        button.simulate('click');
        expect(EventWrapper.find('.link')).toHaveLength(1);
        expect(EventWrapper.find('.description')).toHaveLength(1);
        expect(EventWrapper.state('collapsed')).toBe(false);
    });
    test('selecting button should hide event details', () => {
        expect(EventWrapper.find('.details')).toHaveLength(1);
        EventWrapper.setState({ collapsed: false });
        const button = EventWrapper.find('.expand');
        button.simulate('click');
        expect(EventWrapper.find('.link')).toHaveLength(0);
        expect(EventWrapper.find('.description')).toHaveLength(0);
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
  });


  