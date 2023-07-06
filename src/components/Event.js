import React, { useState } from "react";

const Event = ({ firstEvent }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleDetails = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <li>

    <div className="event">
      <div>
      {firstEvent ? (
        <div>
          <h1 className="summary">{firstEvent.summary}</h1>
          <p className="event-start">
            {firstEvent.start.dateTime}
          </p>
          <p className="event-location">
            {firstEvent.location}
          </p>
        </div>
      ) : null}
      </div>

      <div>
      {!collapsed && (
        <div data-testid="event-details" className="event-details">
          <h2 className="about">About event:</h2>
          <a
            className="link"
            href={firstEvent.htmlLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            See details on Google Calendar
          </a>
          <p className="description">{firstEvent.description}</p>
        </div>
      )}
      </div>

      <button
        data-testid="details-button"
        className="details-button"
        onClick={toggleDetails}
      >
        {collapsed ? "show details" : "hide details"} 
      </button>
      
    </div>

    </li>
  );
};

export default Event;
