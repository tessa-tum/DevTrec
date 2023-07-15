import { render, screen } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

// unit testing

describe("<NumberOfEvents /> component", () => {
  test("render text input", () => {
    render(<NumberOfEvents setCurrentNOE={() => {}} />);
    const number = screen.getByTestId("number-of-events-input");
    expect(number).toBeInTheDocument();
  });

  test("default value of the input field is 32", () => {
    render(<NumberOfEvents setCurrentNOE={() => {}} />);
    const number = screen.getByTestId("number-of-events-input");
    expect(number).toBeInTheDocument();
    expect(number).toHaveValue("32");
  });

  test("value of input field changes when user types in it", async () => {
    const user = userEvent.setup();
    render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
    const number = screen.getByTestId("number-of-events-input");
    expect(number).toBeInTheDocument();
    expect(number).toHaveValue("32");
    await user.type(number, "{backspace}{backspace}14");
    expect(number).toHaveValue("14");
  });
});
