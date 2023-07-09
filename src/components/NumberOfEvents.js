import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <div className="search-overline">Specify number of events</div>
      <label htmlFor="number-of-events-input"></label>
      <input
        type="text"
        data-testid="number-of-events-input"
        id="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
