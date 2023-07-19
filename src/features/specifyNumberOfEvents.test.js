/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/render-result-naming-convention */
// acceptance tests for app feature 3: specify the number of events

import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");
defineFeature(feature, (test) => {
  test("When user has not specified a number, 32 is the default number", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppDOM;

    given("user has just opened the app", () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    and("user has not changed the number of events (noe)", () => {});

    let EventListItems;

    when("user views the events list", async () => {
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then("the noe input field should display 32 by default", () => {
      const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
      const numberOfEventsInput =
        within(NumberOfEventsDOM).queryByRole("textbox");

      expect(numberOfEventsInput.value).toBe("32");
    });

    and("the noe in the list should be 32 by default", () => {
      expect(EventListItems.length).toBe(32);
    });
  });

  test("User can change the noe they want to see", ({ given, when, then }) => {
    let AppDOM;

    given("user has just opened the app", () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when("user changes the value of noe input field", async () => {
      const user = userEvent.setup();
      const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
      const numberOfEventsInput =
        within(NumberOfEventsDOM).queryByRole("textbox");

      await user.type(numberOfEventsInput, "{backspace}{backspace}20");
      expect(numberOfEventsInput.value).toBe("20");
    });

    then("the noe in the list will change accordingly", async () => {
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");

        expect(EventListItems.length).toBe(20);
      });
    });
  });
});
