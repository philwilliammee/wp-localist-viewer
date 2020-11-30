import moment from "moment";
import truncate from "truncate";
/**
 * @file A collection of functions for working with event objects.
 */

export var getEventEnd = function getEventEnd(event) {
  return event.event_instances[0].event_instance.end;
};
/**
 * Get event start date.
 * @param {obj} event A localist event obj
 * @return {string} Date string.
 */

export var getEventStart = function getEventStart(event) {
  return event.event_instances[0].event_instance.start;
};
/**
 * Gets time from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The 12 hour string: "1:00 p.m".
 */

var getTimefromDateTime = function getTimefromDateTime(dateTime) {
  var time = moment(dateTime).format("h:mm a");
  return time;
};
/**
 * Gets full month day  from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The abbreviated month and day "Jan 1".
 */


var getMonthDayfromDateTime = function getMonthDayfromDateTime(dateTime) {
  var monthDay = moment(dateTime).format("MMMM D");
  return monthDay;
};
/**
 * Gets day  from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The abbreviated day "1".
 */


var getDayfromDateTime = function getDayfromDateTime(dateTime) {
  var day = moment(dateTime).format("D");
  return day;
};
/**
 * Get event last end date.
 * @param {obj} event A localist event obj
 * @return {string} Date string.
 */


export var getEventEndDate = function getEventEndDate(event) {
  var endDateTime = event.last_date;
  return endDateTime;
};
/**
 * A plain date string.
 * @param {mixed} date A date string or date object.
 * @return {string} Date string.
 */

var stripDate = function stripDate(date) {
  var cd = moment(date).format("YYYYMMDD");
  return cd;
};
/**
 * Used by calendars
 * @param {obj} event A localist event obj.
 * @return {string} Date string.
 */


export var getCalStartDate = function getCalStartDate(event) {
  var sd = getEventStart(event);
  var cd = stripDate(sd);
  return cd;
};
/**
 *  Used by calendars
 * @param {obj} event A localist event obj.
 * @return {string} Date string.
 */

export var getCalEndDate = function getCalEndDate(event) {
  var ed = getEventEndDate(event);
  var sd = stripDate(ed);
  return sd;
};
/**
 * The logic for determining the type of date string.
 *
 * @param {obj} event The localist event.
 * @param {string} format Either compact or standard.
 *
 * @return {string} The date string.
 */

export var getDisplayDate = function getDisplayDate(event, format) {
  var dateTime = getEventStart(event);
  var eventDate = format === "compact" ? moment(dateTime).format("MMM D") : moment(dateTime).format("M/DD/YYYY");
  return eventDate;
};
/**
 *
 * @param {obj} event The localist event.
 * @return {string} The event start date.
 */

export var getEventDate = function getEventDate(event) {
  var startDateTime = getEventStart(event);
  var eventSrtartDate = getMonthDayfromDateTime(startDateTime);
  return eventSrtartDate;
};
/**
 * Truncates the description text.
 *   Does not support html.
 *
 * @param {obj} event the event object.
 * @param {string} excerptLength The length of the excerpt.
 *
 * @return {string} The truncated description string
 */

export var getTruncDesc = function getTruncDesc(event, excerptLength) {
  if (!event) {
    return "";
  }

  var description = event.description_text;

  if (excerptLength) {
    description = truncate(event.description_text, excerptLength);
  }

  return description;
};
/**
 *
 * @param {obj} event The localist event.
 * @return {string} The day of the event.
 */

export var getDay = function getDay(event) {
  var startDateTime = getEventStart(event);
  var date = getDayfromDateTime(startDateTime);
  return date;
};
export var getEventEndTime = function getEventEndTime(event) {
  var endTime = getEventEnd(event);
  var time = "";

  if (typeof endTime !== "undefined" && endTime !== null) {
    time = getTimefromDateTime(endTime);
  }

  return time;
};
export var isAllDay = function isAllDay(event) {
  if (event.event_instances[0].event_instance.all_day) {
    return true;
  }

  return false;
};
/**
 * Checks if event is all day and returns appropriate start time.
 * @param {obj} event The event obj.
 * @return {string} the eventTime string.
 */

export var getEventTime = function getEventTime(event) {
  var eventTime = "";

  if (isAllDay(event)) {
    eventTime = "all day";
  } else {
    var startDate = getEventStart(event);
    eventTime = getTimefromDateTime(startDate);
  }

  return eventTime;
};
/**
 * Checks if event is all day and returns appropriate start time.
 * @param {obj} event The event obj.
 * @return {string} the eventTime string.
 */

export var getEventFullTime = function getEventFullTime(event) {
  var eventTime = "";

  if (isAllDay(event)) {
    eventTime = "all day";
  } else {
    var startDate = getEventStart(event);
    var stopTime = getEventEndTime(event);
    stopTime = stopTime ? " - ".concat(stopTime) : "";
    eventTime = getTimefromDateTime(startDate) + stopTime;
  }

  return eventTime;
};
/**
 *
 * @param {obj} event The localist event
 * @return {string} The group name.
 */

export var getGroupName = function getGroupName(event) {
  var groupName = "";

  if (typeof event.group_name !== "undefined") {
    groupName = event.group_name;
  }

  return groupName;
};
/**
 *
 * @param {obj} event The localist event
 * @return {integer} The group Id.
 */

export var getGroupId = function getGroupId(event) {
  var groupId = 0;

  if (typeof event.group_name !== "undefined") {
    groupId = event.group_id;
  }

  return groupId;
};
/**
 * The event type ids.
 * @param {obj} event The event object.
 * @return {array} An array of event type ids.
 */

export var getTypeIds = function getTypeIds(event) {
  var types = [];

  if (typeof event.filters.event_types !== "undefined") {
    types = event.filters.event_types.map(function (type) {
      return type.id;
    });
  }

  return types;
};
/**
 * The events deartments id
 * @param {obj} event The event object.
 *
 * @return {array} The department id.
 */

export var getDepartmentIds = function getDepartmentIds(event) {
  var departments = [];

  if (typeof event.filters.departments !== "undefined") {
    departments = event.filters.departments.map(function (dept) {
      return dept.id;
    });
  }

  return departments;
};
/**
 * The events deartment id
 * @param {obj} event The event object.
 *
 * @return {integer} The department id.
 */

export var getDepartment = function getDepartment(event) {
  var department = "";

  if (typeof event.filters.departments !== "undefined") {
    department = event.filters.departments[0].id;
  }

  return department;
};
/**
 * An array of the filters event types.
 * @todo departments are an array get all of the departments.
 * @param {obj} event The localist Event.
 * @return {string} The filter text.
 */

export var getFiltersType = function getFiltersType(event) {
  return event.filters.event_types;
};
/**
 * Get an array of the filters departments.
 * @todo departments are an array get all of the departments.
 * @param {obj} event The localist Event.
 * @return {string} The filter text.
 */

export var getFiltersDepartments = function getFiltersDepartments(event) {
  return event.filters.departments;
};
/**
 * Gets the appropriate event type.
 * @todo add support for multiple filter types.
 * @param {obj} event The localist Event.
 * @param {string} prefCategory The preferred category filter.
 * @return {mixed} An array or a string if only one.
 */

export var getEventType = function getEventType(event, prefCategory) {
  var department = getDepartment(event);
  var groupName = getGroupName(event);
  var eventTypes = [];

  if (typeof event.filters.event_types !== "undefined") {
    eventTypes = getFiltersType(event);
  }

  if (prefCategory === "dept" && department !== 0) {
    eventTypes = getFiltersDepartments(event);
  }

  if (prefCategory === "group" && groupName !== "") {
    eventTypes = [groupName];
  }

  return eventTypes;
};
/**
 * Gets the appropriate event type.
 * @todo add support for multiple filter types.
 * @param {obj} event The localist Event.
 * @return {mixed} A string of event types or null
 */

export var getEventTypeString = function getEventTypeString(event, prefCategory) {
  if (typeof event.filters.event_types !== "undefined") {
    return event.filters.event_types.map(function (type) {
      return type.name;
    }).join(", ");
  }
};
/**
 * Gets the appropriate event type.
 * @todo add support for multiple filter types.
 * @param {obj} event The localist Event.
 * @return {mixed} A string of event types or null
 */

export var getEventDepartmentsString = function getEventDepartmentsString(event, prefCategory) {
  if (typeof event.filters.departments !== "undefined") {
    return event.filters.departments.map(function (type) {
      return type.name;
    }).join(", ");
  }
};
/**
 * Gets start date in compact format.
 * @param {event} event The event.
 * @return {string} The MMM D".
 */

export var getEventDateCompact = function getEventDateCompact(event) {
  var startDateTime = getEventStart(event);
  var eventDateCompact = moment(startDateTime).format("MMM D");
  return eventDateCompact;
};
/**
 * Gets start date in standard format.
 * @param {event} event The event.
 * @return {string} The MMMM YYYY".
 */

export var getMonthHeader = function getMonthHeader(event) {
  var startDateTime = getEventStart(event);
  var eventMonthHeader = moment(startDateTime).format("MMMM YYYY");
  return eventMonthHeader;
};
/**
 * Gets start date in standard format.
 * @param {event} event The event.
 * @return {string} The MMM".
 */

export var getAbbrMonth = function getAbbrMonth(event) {
  var startDateTime = getEventStart(event);
  var abbrMonth = moment(startDateTime).format("MMM");
  return abbrMonth;
};
/**
 * If event has a class array return it as a string.
 * @param {event} event The event.
 * @return {string}
 */

export var getClassItem = function getClassItem(event) {
  if ("itemClassArray" in event) {
    return event.itemClassArray.join(" ");
  }

  return "";
};