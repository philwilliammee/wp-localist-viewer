import React, { useRef, useEffect, useContext } from "react";
import addClass from "dom-helpers/addClass";
import removeClass from "dom-helpers/removeClass";
import getWidth from "dom-helpers/width";
import scrollbarSize from "dom-helpers/scrollbarSize";
import * as dates from "react-big-calendar/lib/utils/dates";
import { navigate } from "react-big-calendar/lib/utils/constants";
import { inRange } from "react-big-calendar/lib/utils/eventLevels";
import EventContext from "../../../../context/EventsContext"; // Override the default Agenda
// import Agenda from "react-big-calendar/lib/Agenda"

function AgendaList(_ref) {
  var selected = _ref.selected,
      getters = _ref.getters,
      accessors = _ref.accessors,
      localizer = _ref.localizer,
      components = _ref.components,
      length = _ref.length,
      date = _ref.date,
      events = _ref.events;
  var headerRef = useRef(null);
  var dateColRef = useRef(null);
  var timeColRef = useRef(null);
  var contentRef = useRef(null);
  var tbodyRef = useRef(null);

  var _useContext = useContext(EventContext),
      setShowDialog = _useContext.setShowDialog,
      eventSelected = _useContext.eventSelected,
      setEventSelected = _useContext.setEventSelected;

  useEffect(function () {
    _adjustHeader();
  });

  var renderDay = function renderDay(day, events, dayKey) {
    var Event = components.event;
    events = events.filter(function (e) {
      return inRange(e, dates.startOf(day, "day"), dates.endOf(day, "day"), accessors);
    });
    return events.map(function (event, idx) {
      var title = accessors.title(event);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: dayKey + "_" + idx
      }, /*#__PURE__*/React.createElement("section", {
        className: "events-modern-compact modern",
        title: "Events List"
      }, /*#__PURE__*/React.createElement("div", {
        className: "events-main-body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cwd-component cwd-card-grid"
      }, Event ? /*#__PURE__*/React.createElement(Event, {
        calendarEvent: event,
        hideaddcal: "true",
        truncatedescription: "500",
        hidedescription: "false",
        hideimages: "true",
        hidetime: false,
        setShowDialog: setShowDialog,
        eventSelected: eventSelected,
        setEventSelected: setEventSelected
      }) : title))));
    }, []);
  };

  var _adjustHeader = function _adjustHeader() {
    if (!tbodyRef.current) return;
    var header = headerRef.current;
    var firstRow = tbodyRef.current.firstChild;
    if (!firstRow) return;
    var isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
    var _widths = [];
    var widths = _widths;
    _widths = [getWidth(firstRow.children[0]), getWidth(firstRow.children[1])];

    if (widths[0] !== _widths[0] || widths[1] !== _widths[1]) {
      dateColRef.current.style.width = _widths[0] + "px";
      timeColRef.current.style.width = _widths[1] + "px";
    }

    if (isOverflowing) {
      addClass(header, "rbc-header-overflowing");
      header.style.marginRight = scrollbarSize() + "px";
    } else {
      removeClass(header, "rbc-header-overflowing");
    }
  };

  var messages = localizer.messages;
  var end = dates.add(date, length, "day");
  var range = dates.range(date, end, "day");
  events = events.filter(function (event) {
    return inRange(event, date, end, accessors);
  });
  events.sort(function (a, b) {
    return +accessors.start(a) - +accessors.start(b);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "rbc-agenda-view"
  }, events.length !== 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, range.map(function (day, idx) {
    return renderDay(day, events, idx);
  })) : /*#__PURE__*/React.createElement("span", {
    className: "rbc-agenda-empty"
  }, messages.noEventsInRange));
}

AgendaList.defaultProps = {
  length: 30
};

AgendaList.range = function (start, _ref2) {
  var _ref2$length = _ref2.length,
      length = _ref2$length === void 0 ? AgendaList.defaultProps.length : _ref2$length;
  var end = dates.add(start, length, "day");
  return {
    start: start,
    end: end
  };
};

AgendaList.navigate = function (date, action, _ref3) {
  var _ref3$length = _ref3.length,
      length = _ref3$length === void 0 ? AgendaList.defaultProps.length : _ref3$length;

  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -length, "day");

    case navigate.NEXT:
      return dates.add(date, length, "day");

    default:
      return date;
  }
};

AgendaList.title = function (start, _ref4) {
  var _ref4$length = _ref4.length,
      length = _ref4$length === void 0 ? AgendaList.defaultProps.length : _ref4$length,
      localizer = _ref4.localizer;
  var end = dates.add(start, length, "day");
  return localizer.format({
    start: start,
    end: end
  }, "agendaHeaderFormat");
};

export default AgendaList;