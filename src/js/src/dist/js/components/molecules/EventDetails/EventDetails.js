import React, { useContext } from "react";
import EventsContext from "../../../context/EventsContext";
import { getEventTypeString, getEventDate, getEventFullTime, getEventDepartmentsString } from "../../../helpers/displayEvent";
import AddCal from "../addCal";
import { EventImg } from "../partials";
import truncateUrl from "truncate-url";
import Grid from "../../atoms/Grid";
import "./EventStyle.scss";

var AgendaInner = function AgendaInner(props) {
  var event = props.event;

  var _useContext = useContext(EventsContext),
      events = _useContext.events; // Get the full event details


  event = events.find(function (e) {
    return e.event.id === event.id;
  }).event;

  if (!event) {
    return "";
  }

  var deptWebsite = event.custom_fields.dept_web_site ? event.custom_fields.dept_web_site : "";
  var eventType = getEventTypeString(event);
  return /*#__PURE__*/React.createElement("section", {
    className: "event-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cwd-component"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cwd-events-style"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field title"
  }, /*#__PURE__*/React.createElement("h3", null, event.title)), /*#__PURE__*/React.createElement("span", null, getEventDate(event), " @ ", getEventFullTime(event)), /*#__PURE__*/React.createElement("span", {
    className: "inline-events-type"
  }, event.location_name ? event.location_name : event.experience), /*#__PURE__*/React.createElement("div", {
    className: "field field-name-summary summary"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      float: "left",
      paddingRight: "15px"
    }
  }, /*#__PURE__*/React.createElement(EventImg, {
    photoUrl: event.photo_url,
    title: event.title,
    hideimages: "false",
    photoCrop: "big"
  })), /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: event.description
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cwd-more-info"
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(Grid, {
    col: 12
  }, /*#__PURE__*/React.createElement("h4", null, "Details")), /*#__PURE__*/React.createElement(Grid, {
    col: 6
  }, eventType ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h5", null, "Event Type"), /*#__PURE__*/React.createElement("p", null, eventType)) : "", /*#__PURE__*/React.createElement("h5", null, "Departments"), /*#__PURE__*/React.createElement("p", null, getEventDepartmentsString(event)), event.tags.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h5", null, "Tags"), /*#__PURE__*/React.createElement("p", null, event.tags.join(", "))) : "", /*#__PURE__*/React.createElement("h5", null, "Website"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: event.url
  }, truncateUrl(event.url, 60)))), /*#__PURE__*/React.createElement(Grid, {
    col: 6
  }, /*#__PURE__*/React.createElement("h5", null, "Group"), /*#__PURE__*/React.createElement("p", null, event.group_name), event.hashtag ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h5", null, "HashTag"), /*#__PURE__*/React.createElement("p", null, "#", event.hashtag)) : "", /*#__PURE__*/React.createElement("h5", null, "Contact E-Mail"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:".concat(event.custom_fields.contact_email)
  }, event.custom_fields.contact_email)), /*#__PURE__*/React.createElement("h5", null, "Contact Name"), /*#__PURE__*/React.createElement("p", null, event.custom_fields.contact_name), deptWebsite ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h5", null, "Dept. Web Site"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: deptWebsite
  }, truncateUrl(deptWebsite, 60)))) : ""))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(AddCal, {
    event: event,
    hideaddcal: "false"
  })))));
};

export default AgendaInner;