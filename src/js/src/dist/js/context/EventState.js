import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import EventsContext from "./EventsContext";
import moment from "moment";

var EventsState = function EventsState(_ref) {
  var children = _ref.children;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      events = _useState2[0],
      setEvents = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      filteredEvents = _useState4[0],
      setFilteredEvents = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showDialog = _useState6[0],
      setShowDialog = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      eventSelected = _useState8[0],
      setEventSelected = _useState8[1];

  var _useState9 = useState({
    start: moment().startOf("month"),
    end: moment().endOf("month")
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      displayedDateRange = _useState10[0],
      setDisplayedDateRange = _useState10[1];

  return /*#__PURE__*/React.createElement(EventsContext.Provider, {
    value: {
      events: events,
      setEvents: setEvents,
      filteredEvents: filteredEvents,
      setFilteredEvents: setFilteredEvents,
      showDialog: showDialog,
      setShowDialog: setShowDialog,
      eventSelected: eventSelected,
      setEventSelected: setEventSelected,
      displayedDateRange: displayedDateRange,
      setDisplayedDateRange: setDisplayedDateRange
    }
  }, children);
};

export default EventsState;