# DevTrec (Meet App)

## Project description

DevTrec is a progressive web application that helps users to stay informed about upcoming web development events near or in their city.
The app will be built using test/behaviour-driven development techniques and will be designed as a serverless PWA. DevTrec will use the Google Calendar API to fetch and show upcoming events. Serverless functions will be hosted on AWS.

## Key features

With the Meet APP, the user is able to
- filter events by city name
- specify the number of events being shown
- show/hide event details
- use the app when offline
- add an app alias to the home screen (mobile / desktop)
- view a chart showing the number of upcoming events by city

## Languages, Libraries

- React
  - JSX
  - JavaScript
- HTML
- CSS

## TDD and BDD

### User Stories / Scenarios

As a user, I should be able to filter events by city, so I can see the list of events that take place in that city.
```
Feature 1: Filter events by city name

Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.
Given user hasn’t searched for any city 
When the user opens the app 
Then the user should see a list of all upcoming events
--
Scenario 2: User should see a list of suggestions when they search for a city. 
Given the main page is open 
When user starts typing in the city textbox 
Then the user should see a list of cities (suggestions) that match what they’ve typed
--
Scenario 3: User can select a city from the suggested list. 
Given the user was typing “Berlin” in the city textbox And the list of suggested cities is showing 
When the user selects a city (e.g., “Berlin, Germany”) from the list 
Then their city should be changed to that city (i.e., “Berlin, Germany”) And the list of suggestions should disappear And the user should receive a list of upcoming events in that city
```
As a user, I should be able to show or hide the details of an event so I can see more or less information about said event.
```
Feature 2: Show/Hide an event’s details

Scenario 1: An event element is collapsed by default.
Given the user has opened the main page
When the user browses a city and sees a list of events 
Then the event elements should be collapsed by default
--
Scenario 2: A user can expand an event element to see its details.
Given a list of events has been rendered to the user
When the user clicks on the “show details” button of an event
Then the element should expand and show all event details
--
Scenario 3: A user can collapse an event to hide its details.
Given the user has chosen and opened an event
When the user a list of events in a chosen city has been rendered
When the user clicks on the “hide details” button of said event
Then the element should collapse and hide all event details
```
As a user, I should be able to specify the number of events shown, so I can narrow down or extend the number of shown events.
```
Feature 3: Specify number of events

Scenario 1: When user hasn’t specified a number, 32 is the default number.
Given the user has opened the main page
When the user chooses a city and does not specify the number of events to be displayed 
Then the default number of displayed events will be 32
--
Scenario 2: User can change the number of events they want to see.
Given the user has opened the main page
When the user chooses a city and does specify the number of events they wish to see 
Then the user should see the number of chosen events
```
As a user, I should be able to use data cached in local memory so that I can access the app even when I am offline.
```
Feature 4: Use the app when offline

Scenario 1: Show cached data when there’s no internet connection.
Given the user has lost internet connection 
When the user opens the app 
Then the user is served cached data of previously loaded events
--
Scenario 2: Show error when user changes the settings (city, time range).
Given the user has opened the app while being offline
When the user tries to change the settings in this state
Then the app should return an error to the user
```
As a user I should be able to view a chart which displays the number of upcoming events in each city
```
Feature 5: Data Visualization

Scenario 1: Show a chart with the number of upcoming events in each city.
Given the user has opened the main page
When the user clicks on a city
Then they should be served a chart with the number of events in that city 
```