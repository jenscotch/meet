// src/__tests__/App.test.js

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import Event from '../Event';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
        AppWrapper.setState({showWelcomeScreen: false})
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
      });
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
    test('render Event', () => {
        expect(AppWrapper.find(Event)).toHaveLength(0);
    });
    test('render number of events', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

describe('App /> integration', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = mount(<App />);
    });
    afterAll(() => {
        AppWrapper.unmount();
    });

    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });
    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppLocationsState).toEqual(AppWrapper.find(CitySearch).props().locations);
        AppWrapper.unmount();
    });
    test('get list of events matching the city selected by the user', async () => {
        //const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        const shownEvents = eventsToShow.slice(0, 32);
        expect(AppWrapper.state('events')).toEqual(shownEvents);
        //AppWrapper.unmount();
    });
    test('get list of all events when user selects "See all cities"', async () => {
        //const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        const shownEvents = allEvents.slice(0, 32);
        expect(AppWrapper.state('events')).toEqual(shownEvents);
        //AppWrapper.unmount();
    });
    test('number of events changes', () => {
        const AppWrapper = mount(<App />);
        const eventCount = AppWrapper.state("eventCount");
        expect(eventCount).toEqual(AppWrapper.find(NumberOfEvents).props().query);
        AppWrapper.unmount();
    });
    test('get list of events that matches the number of events selected by user', async () => {
        //const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const numberOfEvents = NumberOfEventsWrapper.state("query");
        const event = { target: { value: numberOfEvents } };
        await NumberOfEventsWrapper.instance().handleInputChanged(event);
        expect(AppWrapper.state("eventCount")).toEqual(numberOfEvents);
        //expect(AppWrapper.state("query")).toBe();
        //AppWrapper.unmount();
    });
});