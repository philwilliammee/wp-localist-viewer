import React from "react";
var EventsContext = React.createContext({
  events: [],
  setEvents: function setEvents() {},
  filteredEvents: [],
  setFilteredEvents: function setFilteredEvents() {},
  showDialog: false,
  setShowDialog: function setShowDialog() {},
  eventSelected: {},
  setEventSelected: function setEventSelected() {}
});
export default EventsContext;