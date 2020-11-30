import _regeneratorRuntime from "@babel/runtime/regenerator";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useContext, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import AgendaInner from "./AgendaList/AgendaInner";
import CalendarToolbar from "./CalendarToolBar";
import moment from "moment";
import localistApiConnector from "../../../services/localistApiConnector";
import { getEventStart, getEventEnd, isAllDay } from "../../../helpers/displayEvent";
import AgendaList from "./AgendaList/AgendaList";
import EventsContext from "../../../context/EventsContext";
import EventModal from "../../atoms/ModalDialog";
import "./calendar.css"; // react-big-calendar/lib/css/react-big-calendar.css

import EventDetails from "../EventDetails";
import Filters from "./Filters";
import Grid from "../../atoms/Grid";
var localizer = momentLocalizer(moment);

var EventsCalendar = function EventsCalendar(props) {
  var _useContext = useContext(EventsContext),
      setEvents = _useContext.setEvents,
      filteredEvents = _useContext.filteredEvents,
      setFilteredEvents = _useContext.setFilteredEvents,
      showDialog = _useContext.showDialog,
      setShowDialog = _useContext.setShowDialog,
      eventSelected = _useContext.eventSelected,
      setEventSelected = _useContext.setEventSelected,
      setDisplayedDateRange = _useContext.setDisplayedDateRange;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      key = _useState2[0],
      setKey = _useState2[1];

  var components = {
    toolbar: CalendarToolbar,
    list: {
      event: AgendaInner
    }
  }; // Do events get iterated in main app? Don't reiterate!

  var flatEvents = filteredEvents.map(function (event) {
    return {
      id: event.event.id,
      title: event.event.title,
      start: new Date(getEventStart(event.event)),
      end: new Date(getEventEnd(event.event)),
      allDay: isAllDay(event.event)
    };
  });

  var handleRangeChange = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dateRange) {
      var dateRangeStart, dateRangeEnd, start, end, res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dateRangeStart = dateRange.start ? dateRange.start : dateRange[0];
              dateRangeEnd = dateRange.end ? dateRange.end : dateRange[0];
              setDisplayedDateRange({
                start: moment(dateRangeStart),
                end: moment(dateRangeEnd)
              });
              start = moment(dateRangeStart).subtract(1, "month").startOf("month").format("YYYY-MM-DD hh:mm");
              end = moment(dateRangeEnd).add(1, "month").endOf("month").format("YYYY-MM-DD hh:mm");
              _context.next = 7;
              return localistApiConnector(_objectSpread(_objectSpread({}, props), {}, {
                start: start,
                end: end
              }));

            case 7:
              res = _context.sent;
              setEvents(res.data.events);
              setFilteredEvents(res.data.events);
              setKey(key + 1);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleRangeChange(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var handleEventSelect = function handleEventSelect(event) {
    setEventSelected(event);
    setShowDialog(true);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EventModal, {
    showDialog: showDialog,
    setShowDialog: setShowDialog,
    "aria-label": "Selected Event"
  }, eventSelected ? /*#__PURE__*/React.createElement(EventDetails, {
    event: eventSelected
  }) : ""), /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(Grid, {
    col: 3
  }, /*#__PURE__*/React.createElement(Filters, {
    key: key
  })), /*#__PURE__*/React.createElement(Grid, {
    col: 9
  }, /*#__PURE__*/React.createElement(Calendar, {
    events: flatEvents,
    views: {
      month: true,
      day: true,
      list: AgendaList
    },
    step: 240,
    showMultiDayTimes: true,
    components: components,
    localizer: localizer,
    defaultDate: new Date(moment().startOf("month")),
    defaultView: "month",
    style: {
      height: "calc(100vh - 300px)",
      minHeight: "500px"
    },
    onRangeChange: handleRangeChange,
    onSelectEvent: handleEventSelect //tooltipAccessor={(event)=>{return event.title}}

  }))));
};

export default EventsCalendar;