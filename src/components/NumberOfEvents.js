import { useState } from "react";

const NumberOfEvents = () => {
  const [numberInput, setNumberInput] = useState(32);

  // handle input change
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberInput(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        data-testid="number-input"
        className="events-number"
        value={numberInput}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;