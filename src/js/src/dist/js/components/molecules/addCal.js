import React from 'react';
import buildUrl from 'build-url';
import { getCalStartDate, getCalEndDate } from '../../helpers/displayEvent';
import { isHidden } from '../../helpers/common';

var buildGoogleLink = function buildGoogleLink(myObj) {
  var gDateStart = getCalStartDate(myObj);
  var gDateStop = getCalEndDate(myObj);
  var href = buildUrl('https://calendar.google.com/calendar/event', {
    queryParams: {
      action: 'TEMPLATE',
      dates: "".concat(gDateStart, "/").concat(gDateStop),
      details: myObj.description_text.replace(/[\r\n]/g, "<br />"),
      location: myObj.location,
      sprop: 'website:events.cornell.edu',
      text: myObj.title
    }
  });
  return href;
};

var buildGoogleStr = function buildGoogleStr(myObj) {
  var href = buildGoogleLink(myObj);
  return /*#__PURE__*/React.createElement("a", {
    className: "fa fa-google google",
    href: href,
    title: "Save to Google Calendar",
    rel: "noreferrer noopener",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Add ", myObj.title, " to Google Calendar"));
};

var buildiCal = function buildiCal(myObj) {
  return /*#__PURE__*/React.createElement("a", {
    className: "fa fa-calendar apple",
    href: myObj.localist_ics_url,
    title: "Save to iCal",
    rel: "noreferrer noopener",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Add ", myObj.title, " to iCal"));
};

var buildOutlookCal = function buildOutlookCal(myObj) {
  return /*#__PURE__*/React.createElement("a", {
    className: "fa fa-clock-o microsoft",
    href: myObj.localist_ics_url,
    title: "Save to Outlook",
    rel: "noreferrer noopener",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Add ", myObj.title, " to Outlook"));
};
/**
 * @param {obj} props.event The localist event object
 * @return {jsx} The rendered template.
 */


var AddCal = function AddCal(props) {
  var event = props.event,
      hideaddcal = props.hideaddcal;

  if (isHidden(hideaddcal)) {
    return '';
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "event-subscribe"
  }, "add to calendar ", buildGoogleStr(event), " ", buildiCal(event), buildOutlookCal(event));
};

export default AddCal;
export { buildGoogleStr, buildiCal, buildOutlookCal, buildGoogleLink };