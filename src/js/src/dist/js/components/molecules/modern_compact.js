import React from 'react';
import { getEventTime, getClassItem } from '../../helpers/displayEvent';
import AddCal from './addCal';
import { EventThumbnail } from './partials';
import Truncate from '../atoms/Truncate';
import Time from '../atoms/Time';

var ModernCompactInner = function ModernCompactInner(props) {
  var event = props.event,
      hideimages = props.hideimages;
  var eventTime = getEventTime(event);
  var classList = getClassItem(event);
  return /*#__PURE__*/React.createElement("div", {
    className: classList
  }, /*#__PURE__*/React.createElement("div", {
    className: "events"
  }, /*#__PURE__*/React.createElement("a", {
    href: event.localist_url,
    className: "group-link-wrapper field-group-link"
  }, /*#__PURE__*/React.createElement(EventThumbnail, {
    photoUrl: event.photo_url,
    title: event.title,
    hideimages: hideimages,
    photoCrop: "big"
  }), /*#__PURE__*/React.createElement(Time, {
    event: event
  }), /*#__PURE__*/React.createElement("div", {
    className: "field title"
  }, /*#__PURE__*/React.createElement("h3", null, event.title)), /*#__PURE__*/React.createElement("div", {
    className: "field meta"
  }, /*#__PURE__*/React.createElement("p", null, eventTime, event.location_name ? ", ".concat(event.location_name) : '')), /*#__PURE__*/React.createElement("div", {
    className: "field field-name-summary summary"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Truncate, props)))), /*#__PURE__*/React.createElement(AddCal, props)));
};

var ModernCompact = function ModernCompact(props) {
  var events = props.events,
      listClassArray = props.listClassArray,
      wrapperClassArray = props.wrapperClassArray;
  var wrapperClassList = wrapperClassArray.join(' ');
  var listClassList = listClassArray.join(' ');
  return /*#__PURE__*/React.createElement("section", {
    className: "events-modern-compact modern",
    title: "Events List"
  }, /*#__PURE__*/React.createElement("div", {
    className: "events-main-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cwd-component cwd-card-grid ".concat(wrapperClassList)
  }, /*#__PURE__*/React.createElement("div", {
    className: listClassList
  }, events.length > 0 ? events.map(function (event) {
    return /*#__PURE__*/React.createElement(ModernCompactInner, Object.assign({
      key: event.event.id,
      event: event.event,
      display: event.display
    }, props));
  }) : /*#__PURE__*/React.createElement("p", null, "There are no upcomming events.")))));
};

ModernCompact.defaultProps = {
  events: [],
  truncatedescription: '150',
  wrapperclass: '',
  listclass: '',
  wrapperClassArray: [],
  listClassArray: []
};
export default ModernCompact;