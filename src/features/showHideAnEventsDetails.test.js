/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
// acceptance tests for app feature 2: show/hide event details

import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  //scenario 1
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppComponent;

    given("user has just opened the app", () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListItems;

    when("user views the events list", async () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then("all events details should be hidden", async () => {
      await waitFor(() => {
        EventListItems.forEach((eventListItem) => {
          expect(
            eventListItem.querySelector(".event-details")
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  //scenario 2
  test("User can expand an event to see its details", ({
    given,
    when,
    then,
    and,
  }) => {
    let AppComponent;

    given("user has just opened the app", () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListItems;

    when("user clicks on the details button of one of the events", async () => {
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      let detailsBtn;

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        detailsBtn = within(EventListItems[0]).queryByText("show details");
      });
      await user.click(detailsBtn);
    });

    then("the events details should be shown", async () => {
      const details = EventListItems[0].querySelector(".event-details");

      expect(details).toBeInTheDocument();
    });

    and(
      "the events details button title will be adjusted to (hide details)",
      () => {
        const detailsBtn = within(EventListItems[0]).queryByText(
          "hide details"
        );

        expect(detailsBtn.textContent).toBe("hide details");
      }
    );
  });

  // scenario 3
  test("User can collapse an event to hide its details.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppDOM;
    let EventListItems;
    let detailsBtn;

    given("the events details are shown", async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        detailsBtn = within(EventListItems[0]).queryByText("show details");
      });
      await user.click(detailsBtn);
      expect(
        EventListItems[0].querySelector(".event-details")
      ).toBeInTheDocument();
    });

    and("the events details button title is (hide details)", () => {
      expect(detailsBtn.textContent).toBe("hide details");
    });

    when("user clicks on details button of that event", async () => {
      const user = userEvent.setup();

      await user.click(detailsBtn);
    });

    then("the events details should be hidden", () => {
      expect(
        EventListItems[0].querySelector(".event-details")
      ).not.toBeInTheDocument();
    });

    and(
      "the events details button title will be adjusted to (show details)",
      () => {
        expect(detailsBtn.textContent).toBe("show details");
      }
    );
  });
});
