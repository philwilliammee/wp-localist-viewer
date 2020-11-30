import React from 'react';
import { getTruncDesc, getEventDateCompact, getClassItem } from '../../helpers/displayEvent';
import AddCal from './addCal';
import { EventTitle, EventDate, EventLocation, EventThumbnail, EventDescription } from './partials';

var CompactInner = function CompactInner(props) {
  var event = props.event,
      hideaddcal = props.hideaddcal,
      truncatedescription = props.truncatedescription,
      hidedescription = props.hidedescription,
      hideimages = props.hideimages;
  var classList = getClassItem(event);
  return /*#__PURE__*/React.createElement("div", {
    className: "views-row ".concat(classList)
  }, /*#__PURE__*/React.createElement(EventThumbnail, {
    photoUrl: event.photo_url,
    title: event.title,
    hideimages: hideimages,
    photoCrop: "big"
  }), /*#__PURE__*/React.createElement("div", {
    className: "event-node node"
  }, /*#__PURE__*/React.createElement("div", {
    className: "events"
  }, /*#__PURE__*/React.createElement(EventTitle, {
    title: event.title,
    url: event.localist_url
  }), /*#__PURE__*/React.createElement(EventLocation, {
    locationName: event.location_name
  }), /*#__PURE__*/React.createElement(EventDate, {
    date: getEventDateCompact(event)
  }), /*#__PURE__*/React.createElement(EventDescription, {
    description: getTruncDesc(event, truncatedescription),
    title: event.title,
    url: event.localist_url,
    hidedescription: hidedescription
  }), /*#__PURE__*/React.createElement(AddCal, {
    hideaddcal: hideaddcal,
    event: event
  }))));
};

var Compact = function Compact(props) {
  var events = props.events,
      filterby = props.filterby,
      listClassArray = props.listClassArray,
      wrapperClassArray = props.wrapperClassArray;
  var wrapperClassList = wrapperClassArray.join(' ');
  var listClassList = listClassArray.join(' ');
  return /*#__PURE__*/React.createElement("section", {
    className: "standard compact",
    title: "Events List"
  }, /*#__PURE__*/React.createElement("div", {
    className: "events-main-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "events-listing compact ".concat(wrapperClassList)
  }, /*#__PURE__*/React.createElement("div", {
    className: "events-list view-content ".concat(listClassList)
  }, events.length > 0 ? events.map(function (event) {
    return /*#__PURE__*/React.createElement(CompactInner, Object.assign({
      key: event.event.id,
      event: event.event,
      filterby: filterby
    }, props));
  }) : /*#__PURE__*/React.createElement("p", null, "There are no upcoming events.")))));
};

Compact.defaultProps = {
  events: [],
  hideaddcal: 'false',
  truncatedescription: '150',
  hidedescription: 'false',
  hideimages: 'false'
};
export default Compact;