import React from "react";

const EventsContext = React.createContext({
  events: [],
  setEvents: () => {},
  filteredEvents: [],
  setFilteredEvents: () => {},
  showDialog: false,
  setShowDialog: () => {},
  eventSelected: {},
  setEventSelected: () => {},
});

export default EventsContext;
