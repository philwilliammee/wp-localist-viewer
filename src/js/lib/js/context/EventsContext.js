import React from "react";

const EventsContext = React.createContext({
  events: [],
  setEvents: props => {},
  filteredEvents: [],
  setFilteredEvents: props => {},
  showDialog: false,
  setShowDialog: props => {},
  eventSelected: {},
  setEventSelected: props => {},
  displayedDateRange: {},
  setDisplayedDateRange: props => {}
});

export default EventsContext;
