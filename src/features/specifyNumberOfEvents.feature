Feature: Specify Number of Events
  Scenario: When user has not specified a number, 32 is the default number
    Given user has just opened the app
    And user has not changed the number of events (noe)
    When user views the events list
    Then the noe input field should display 32 by default
    And the noe in the list should be 32 by default

  Scenario: User can change the noe they want to see
    Given user has just opened the app
    When user changes the value of noe input field
    Then the noe in the list will change accordingly