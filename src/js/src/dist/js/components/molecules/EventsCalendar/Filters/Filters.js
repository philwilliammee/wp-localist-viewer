import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useContext, useState } from "react";
import EventsContext from "../../../../context/EventsContext";
import CheckBox from "../../../atoms/forms/CheckBox";
import "./Filters.scss";
import { isNested } from "../../../../helpers/common";
import moment from "moment";
/**
 * @todo optimize this it has a lot of re-renders
 * onEach page key change filters reset.
 * departments may be a good one.
 * Some oddities with date range.
 */

var Filters = function Filters() {
  var _useContext = useContext(EventsContext),
      events = _useContext.events,
      setFilteredEvents = _useContext.setFilteredEvents,
      displayedDateRange = _useContext.displayedDateRange;

  var _useState = useState(new Map()),
      _useState2 = _slicedToArray(_useState, 2),
      checkedItems = _useState2[0],
      setCheckedItems = _useState2[1];

  var eventTypesFull = [];
  var eventKeywordsFull = [];
  var eventGroupNamesFull = [];

  if (!events && events.length > 0) {
    return "";
  }

  events.forEach(function (event) {
    if (moment(event.event.first_date).isBetween(displayedDateRange.start, displayedDateRange.end) || moment(event.event.first_date).isSame(displayedDateRange.start)) {
      // some events don't have types
      if (isNested(event, "event", "filters", "event_types")) {
        event.event.filters.event_types.forEach(function (type) {
          eventTypesFull.push(type.name);
        });
      }

      if (isNested(event, "event", "keywords")) {
        event.event.keywords.forEach(function (keyword) {
          eventKeywordsFull.push(keyword);
        });
      } // eventKeywordsFull.push(event.event.experience);


      if (isNested(event, "event", "group_name")) {
        eventGroupNamesFull.push(event.event.group_name);
      }
    }
  });

  var eventTypes = _toConsumableArray(new Set(eventTypesFull)).sort();

  var eventKeywords = _toConsumableArray(new Set(eventKeywordsFull)).sort();

  var eventGroupNames = _toConsumableArray(new Set(eventGroupNamesFull)).sort();

  var handleChange = function handleChange(e) {
    var item = e.target.name;
    var isChecked = e.target.checked;
    setCheckedItems(new Map(checkedItems.set(item, isChecked)));
    filterEvents();
  }; // Working but needs to set and get filtered events.


  var filterEvents = function filterEvents() {
    var filteredEvents = _toConsumableArray(events).filter(function (event) {
      if (checkedItems.get(event.event.group_name)) {
        return true;
      }

      if (isNested(event, "event", "filters", "event_types")) {
        var foundEventTypesName = event.event.filters.event_types.find(function (type) {
          return checkedItems.get(type.name);
        });

        if (foundEventTypesName) {
          return true;
        }
      }

      var foundKeyword = event.event.keywords.find(function (element) {
        return checkedItems.get(element);
      });
      return false || foundKeyword;
    });

    if (filteredEvents.length) {
      setFilteredEvents(filteredEvents);
    } else {
      setFilteredEvents(_toConsumableArray(events));
    }
  };

  var handleResetFilters = function handleResetFilters() {
    checkedItems.forEach(function (value, key, map) {
      return map.set(key, false);
    });
    setFilteredEvents(_toConsumableArray(events));
  };

  return /*#__PURE__*/React.createElement("div", {
    id: "calendarFilters"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("h4", null, "Narrow Your Results")), /*#__PURE__*/React.createElement("div", {
    className: "filter-groups padded"
  }, /*#__PURE__*/React.createElement("h5", null, "Group Name"), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("ul", null, eventGroupNames.map(function (type, id) {
    return /*#__PURE__*/React.createElement("li", {
      key: type
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement(CheckBox, {
      name: type,
      checked: checkedItems.get(type),
      onChange: handleChange
    }), " " + type.replace("CTI ", "")));
  }))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h5", null, "Types"), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("ul", null, eventTypes.map(function (type, id) {
    return /*#__PURE__*/React.createElement("li", {
      key: type
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement(CheckBox, {
      name: type,
      checked: checkedItems.get(type),
      onChange: handleChange
    }), " " + type));
  }))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h5", null, "Keywords"), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("ul", null, eventKeywords.map(function (type, id) {
    return /*#__PURE__*/React.createElement("li", {
      key: type
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement(CheckBox, {
      name: type,
      checked: checkedItems.get(type),
      onChange: handleChange
    }), " " + type));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "reset"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      handleResetFilters();
    }
  }, "Reset Filters")));
};

export default Filters;