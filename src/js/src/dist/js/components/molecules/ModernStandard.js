import React from 'react';
import { getEventTime, getClassItem } from '../../helpers/displayEvent';
import AddCal from './addCal';
import { EventImg } from './partials';
import Truncate from '../atoms/Truncate';
import Time from '../atoms/Time';
export var ModernStandardInner = function ModernStandardInner(props) {
  var event = props.event,
      hideimages = props.hideimages,
      hidetime = props.hidetime;
  /**
   *
   * @param {obj} eventTypes An array of events.
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

  var eventTime = getEventTime(event);
  var classList = getClassItem(event);
  return /*#__PURE__*/React.createElement("div", {
    className: classList
  }, /*#__PURE__*/React.createElement("div", {
    className: "events"
  }, /*#__PURE__*/React.createElement("a", {
    href: event.localist_url,
    className: "group-link-wrapper field-group-link"
  }, hidetime ? '' : /*#__PURE__*/React.createElement(Time, {
    event: event
  }), /*#__PURE__*/React.createElement("div", {
    className: "field title"
  }, /*#__PURE__*/React.createElement("h3", null, event.title)), /*#__PURE__*/React.createElement("div", {
    className: "field meta"
  }, /*#__PURE__*/React.createElement("p", null, hidetime ? '' : eventTime, event.location_name ? ", ".concat(event.location_name) : '', tagStr(event.filters.event_types))), /*#__PURE__*/React.createElement("div", {
    className: "field field-name-summary summary"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(EventImg, {
    photoUrl: event.photo_url,
    title: event.title,
    hideimages: hideimages,
    photoCrop: "big"
  }), /*#__PURE__*/React.createElement(Truncate, Object.assign({}, props, {
    readMore: "read more"
  }))))), /*#__PURE__*/React.createElement(AddCal, props)));
};
ModernStandardInner.defaultProps = {
  hidetime: false
};

var ModernStandard = function ModernStandard(props) {
  var events = props.events,
      listClassArray = props.listClassArray,
      wrapperClassArray = props.wrapperClassArray;
  var wrapperClassList = wrapperClassArray.join(' ');
  var listClassList = listClassArray.join(' ');
  return /*#__PURE__*/React.createElement("section", {
    className: "events-modern-standard modern",
    title: "Events List"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cwd-component cwd-card-grid ".concat(wrapperClassList)
  }, /*#__PURE__*/React.createElement("div", {
    className: listClassList
  }, events.length > 0 ? events.map(function (event) {
    return /*#__PURE__*/React.createElement(ModernStandardInner, Object.assign({
      key: event.event.id,
      event: event.event
    }, props));
  }) : /*#__PURE__*/React.createElement("p", null, "There are no upcoming events.")))));
};

ModernStandard.defaultProps = {
  events: [],
  hideaddcal: 'false',
  truncatedescription: '250',
  hideimages: 'false',
  wrapperClassArray: [],
  listClassArray: [],
  hidedescription: 'false'
};
export default ModernStandard;