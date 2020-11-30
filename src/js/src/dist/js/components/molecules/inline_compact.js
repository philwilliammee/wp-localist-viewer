import React from 'react';
import { getAbbrMonth, getDay, getEventTime, getEventEndTime, getClassItem } from '../../helpers/displayEvent';

var InlineCompactInner = function InlineCompactInner(props) {
  var event = props.event;
  var eventTime = getEventTime(event);
  var endTime = getEventEndTime(event);

  var renderEventLocation = function renderEventLocation(locationName) {
    if (!locationName) {
      return '';
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "event-location"
    }, /*#__PURE__*/React.createElement("span", {
      className: "fa fa-map-marker"
    }), locationName);
  };

  var classList = getClassItem(event);
  return /*#__PURE__*/React.createElement("div", {
    className: "views-row ".concat(classList)
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-2 event-month-and-day"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "event-month"
  }, getAbbrMonth(event)), /*#__PURE__*/React.createElement("span", {
    className: "event-day"
  }, getDay(event)))), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-8 event-title-and-location"
  }, /*#__PURE__*/React.createElement("div", {
    className: "event-title"
  }, /*#__PURE__*/React.createElement("a", {
    href: event.localist_url,
    hrefLang: "en"
  }, event.title)), /*#__PURE__*/React.createElement("div", {
    className: "event-times"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fa fa-clock-o"
  }), eventTime, endTime ? " - ".concat(endTime) : ''), renderEventLocation(event.location_name)))));
};

var InlineCompact = function InlineCompact(props) {
  var events = props.events,
      listclass = props.listclass,
      wrapperclass = props.wrapperclass;
  return /*#__PURE__*/React.createElement("section", {
    className: "modern",
    id: "eventsInlineCompact",
    title: "Events List"
  }, /*#__PURE__*/React.createElement("div", {
    className: "events-main-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cwd-component compact events-listing ".concat(wrapperclass)
  }, /*#__PURE__*/React.createElement("div", {
    className: "events-list view-content ".concat(listclass)
  }, events.length > 0 ? events.map(function (event) {
    return /*#__PURE__*/React.createElement(InlineCompactInner, {
      key: event.event.id,
      event: event.event
    });
  }) : /*#__PURE__*/React.createElement("p", null, "There are no upcoming events.")))));
};

InlineCompact.defaultProps = {
  events: [],
  wrapperclass: '',
  listclass: ''
};
export default InlineCompact;