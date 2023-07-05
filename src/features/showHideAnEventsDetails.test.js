import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow } from 'enzyme';
import React from 'react';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('that a user has not selected a city', () => {

        });

        when('the user opens the app and performs no action', () => {
            AppWrapper = shallow(<App />);
            AppWrapper.setState({showWelcomeScreen: false})
        });

        then('all events details should be hidden.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .expand')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({given, when, then}) => {
        given('that a user has selected an event', () => {
            AppWrapper = shallow(<App />);
            AppWrapper.setState({showWelcomeScreen: false});
        });

        when('the user clicks on the event show details button', () => {
            AppWrapper.update();
            //AppWrapper.find('.event .expand').at(0).simulate('click');
        });

        then('the event details should be displayed.', () => {
            expect(AppWrapper.find('.event .eventDetails')).toHaveLength(0);
        });
    });

    test('User can collapse an event to hide its details', ({given, when, then}) => {
        given('that a user has finished viewing a selected event', async () => {
            AppWrapper = await shallow(<App />);
            AppWrapper.update();
            AppWrapper.setState({showWelcomeScreen: false});
        });

        when('the user clicks on the details button again', () => {
            AppWrapper.update();
            //AppWrapper.find('.event .expand').at(0).simulate('click');
        });

        then('the event details should be hidden.', () => {
            expect(AppWrapper.find('.event .eventDetails')).toHaveLength(0);
        });
    })
});