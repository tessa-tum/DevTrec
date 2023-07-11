// acceptance tests for app feature 1: filter events by city

import { render, within, waitFor } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  // scenario 1
  test("When user has not searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user has not searched for any city", () => {});

    let AppComponent;

    when("user opens the app", () => {
      AppComponent = render(<App />);
    });

    then("user should see the list of upcoming events", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");

        expect(EventListItems.length).toBe(32);
      });
    });
  });

  // scenario 2
  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;

    given("the main page is open", () => {
      AppComponent = render(<App />);
    });

    let CitySearchDOM;

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector("#city-search");
      const citySearchInput = within(CitySearchDOM).queryByRole("textbox");

      await user.type(citySearchInput, "Berlin");
    });

    then(
      "user should receive a list of cities (suggestions) that match what they have typed",
      async () => {
        await waitFor(() => {
          const suggestionListItems =
            within(CitySearchDOM).queryAllByRole("listitem");

          expect(suggestionListItems).toHaveLength(2);
        });
      }
    );
  });

  // scenario 3
  test("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;

    given("user was typing “Berlin” in the city textbox", async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector("#city-search");
      citySearchInput = within(CitySearchDOM).queryByRole("textbox");

      await user.type(citySearchInput, "Berlin");
    });

    let suggestionListItems;

    and("the list of suggested cities is showing", () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });

    when(
      "user selects a city (e.g., “Berlin, Germany”) from the list",
      async () => {
        const user = userEvent.setup();

        await user.click(suggestionListItems[0]);
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(citySearchInput.value).toBe("Berlin, Germany");
      }
    );

    and(
      "user should receive a list of upcoming events in that city",
      async () => {
        const EventListDOM = AppDOM.querySelector("#event-list");
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );

        expect(EventListItems).toHaveLength(berlinEvents.length);
      }
    );
  });
});
