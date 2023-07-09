import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <div className="event">
        <h2 className="summary">{event && event.summary}</h2>
        <p className="event-location">{event && event.location}</p>
        <p className="event-start" data-testid="event-start">
          {event && new Date(event.start.dateTime).toUTCString()}
        </p>

        {showDetails ? (
          <div data-testid="event-details" className="event-details">
            <h3 className="about">About event:</h3>
            <a
              className="link"
              href={event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              See details on Google Calendar
            </a>
            <p className="event-description">{event.description}</p>
          </div>
        ) : null}

        <button
          data-testid="details-button"
          className="details-button"
          onClick={() => {
            showDetails ? setShowDetails(false) : setShowDetails(true);
          }}
        >
          {showDetails ? "hide details" : "show details"}
        </button>
      </div>
    </li>
  );
};

export default Event;
