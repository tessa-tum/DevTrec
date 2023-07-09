import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { getEvents } from "../api";

// unit testing

describe("<Event /> component", () => {
  let allEvents = [];
  let event = {};

  beforeAll(async () => {
    allEvents = await getEvents();
    event = allEvents[0];
  });

  test("render event title", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test("render event start time", () => {
    render(<Event event={event} />);
    expect(screen.getByTestId("event-start")).toBeInTheDocument();
  });

  test("render event location", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.location)).toBeInTheDocument();
  });

  test("render show details button", () => {
    render(<Event />);
    expect(screen.getByTestId("details-button")).toBeInTheDocument();
  });

  test("event details hidden by default", () => {
    render(<Event />);
    expect(screen.getByTestId("details-button")).toBeInTheDocument();
    expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
  });

  test("show details when clicked", async () => {
    const user = userEvent.setup();
    render(<Event event={event} />);
    expect(screen.getByTestId("details-button")).toBeInTheDocument();
    expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
    await user.click(screen.getByTestId("details-button"));
    expect(screen.getByTestId("event-details")).toBeInTheDocument();
  });

  test("hide details when clicked", async () => {
    const user = userEvent.setup();
    render(<Event event={event} />);
    expect(screen.getByTestId("details-button")).toBeInTheDocument();
    await user.click(screen.getByTestId("details-button"));
    expect(screen.getByTestId("event-details")).toBeInTheDocument();
    await user.click(screen.getByTestId("details-button"));
    expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
  });
});
