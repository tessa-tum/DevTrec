Feature: Show/Hide an Events Details
  Scenario: An event element is collapsed by default
    Given user has just opened the app
    When user views the events list
    Then all events details should be hidden

  Scenario: User can expand an event to see its details
    Given user has just opened the app
    When user clicks on the details button of one of the events
    Then the events details should be shown
    And the events details button title will be adjusted to (hide details)

  Scenario: User can collapse an event to hide its details.
    Given the events details are shown
    And the events details button title is (hide details)
    When user clicks on details button of that event
    Then the events details should be hidden
    And the events details button title will be adjusted to (show details)