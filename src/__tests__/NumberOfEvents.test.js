import { render, screen } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe("<NumberOfEvents /> component", () => {

  test("render text input", () => {
    render(<NumberOfEvents />);
    const numberInput = screen.getByTestId("number-input");
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveClass("events-number");
  });

  test("default value of the input field is 32", () => {
    render(<NumberOfEvents />);
    const numberInput = screen.getByTestId("number-input");
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveValue(32);
  });

  test("value of input field changes when user types in it", async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents />);
    const numberInput = screen.getByTestId("number-input");
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveValue(32);
    await user.type(numberInput, "{backspace}{backspace}14");
    expect(numberInput).toHaveValue(14);
  });
});
