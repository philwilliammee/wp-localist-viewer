import React from 'react';
import { getAbbrMonth, getDay, getEventDate, getEventTime } from '../../helpers/displayEvent';

var Time = function Time(props) {
  var event = props.event;
  return /*#__PURE__*/React.createElement("time", {
    title: getEventDate(event),
    dateTime: getEventTime(event)
  }, /*#__PURE__*/React.createElement("span", {
    className: "month"
  }, getAbbrMonth(event)), /*#__PURE__*/React.createElement("span", {
    className: "day"
  }, getDay(event)));
};

export default Time;