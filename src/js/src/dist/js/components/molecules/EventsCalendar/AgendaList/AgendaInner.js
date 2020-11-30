import React, { useContext } from "react";
import EventsContext from "../../../../context/EventsContext";
import { getEventTime, getClassItem } from "../../../../helpers/displayEvent";
import { EventImg } from "../../partials";
import Truncate from "../../../atoms/Truncate";
import Time from "../../../atoms/Time";

var AgendaListView = function AgendaListView(props) {
  var calendarEvent = props.calendarEvent,
      hideimages = props.hideimages,
      hidetime = props.hidetime,
      setShowDialog = props.setShowDialog,
      setEventSelected = props.setEventSelected;

  var _useContext = useContext(EventsContext),
      events = _useContext.events;

  var event = events.find(function (e) {
    return e.event.id === calendarEvent.id;
  }).event;

  if (!event) {
    return "";
  }
  /**
   *
   * @param {obj} eventTypes
   * @return {string} Html string
   */


  var tagStr = function tagStr(eventTypes) {
    var spanStr;

    if (eventTypes) {
      spanStr = eventTypes.map(function (element) {
        return /*#__PURE__*/React.createElement("span", {
          key: element.id,
          className: "inline-events-type"
        }, element.name);
      });
    }

    return spanStr;
  };

  var handleOnClick = function handleOnClick() {
    setEventSelected(event);
    setShowDialog(true);
  };

  var eventTime = getEventTime(event);
  var classList = getClassItem(event);
  return /*#__PURE__*/React.createElement("div", {
    className: classList
  }, /*#__PURE__*/React.createElement("div", {
    className: "events"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#".concat(event.id),
    className: "group-link-wrapper field-group-link",
    onClick: handleOnClick
  }, hidetime ? "" : /*#__PURE__*/React.createElement(Time, {
    event: event
  }), /*#__PURE__*/React.createElement("div", {
    className: "field title"
  }, /*#__PURE__*/React.createElement("h3", null, event.title)), /*#__PURE__*/React.createElement("div", {
    className: "field meta"
  }, /*#__PURE__*/React.createElement("p", null, hidetime ? "" : eventTime, event.location_name ? ", ".concat(event.location_name) : "", tagStr(event.filters.event_types))), /*#__PURE__*/React.createElement("div", {
    className: "field field-name-summary summary"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(EventImg, {
    photoUrl: event.photo_url,
    title: event.title,
    hideimages: hideimages,
    photoCrop: "big"
  }), /*#__PURE__*/React.createElement(Truncate, {
    event: event,
    hidedescription: "false",
    truncatedescription: "300",
    readMore: "read more"
  }))))));
};

AgendaListView.defaultProps = {
  hidetime: false
};
export default AgendaListView;