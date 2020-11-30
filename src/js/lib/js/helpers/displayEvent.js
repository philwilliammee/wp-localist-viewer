import moment from "moment";
import truncate from "truncate";

/**
 * @file A collection of functions for working with event objects.
 */

export const getEventEnd = (event) => {
  return event.event_instances[0].event_instance.end;
};

/**
 * Get event start date.
 * @param {obj} event A localist event obj
 * @return {string} Date string.
 */
export const getEventStart = (event) => {
  return event.event_instances[0].event_instance.start;
};

/**
 * Gets time from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The 12 hour string: "1:00 p.m".
 */
const getTimefromDateTime = (dateTime) => {
  const time = moment(dateTime).format("h:mm a");
  return time;
};

/**
 * Gets full month day  from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The abbreviated month and day "Jan 1".
 */
const getMonthDayfromDateTime = (dateTime) => {
  const monthDay = moment(dateTime).format("MMMM D");
  return monthDay;
};

/**
 * Gets day  from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The abbreviated day "1".
 */
const getDayfromDateTime = (dateTime) => {
  const day = moment(dateTime).format("D");
  return day;
};

/**
 * Get event last end date.
 * @param {obj} event A localist event obj
 * @return {string} Date string.
 */
export const getEventEndDate = (event) => {
  const endDateTime = event.last_date;
  return endDateTime;
};

/**
 * A plain date string.
 * @param {mixed} date A date string or date object.
 * @return {string} Date string.
 */
const stripDate = (date) => {
  const cd = moment(date).format("YYYYMMDD");
  return cd;
};

/**
 * Used by calendars
 * @param {obj} event A localist event obj.
 * @return {string} Date string.
 */
export const getCalStartDate = (event) => {
  const sd = getEventStart(event);
  const cd = stripDate(sd);
  return cd;
};

/**
 *  Used by calendars
 * @param {obj} event A localist event obj.
 * @return {string} Date string.
 */
export const getCalEndDate = (event) => {
  const ed = getEventEndDate(event);
  const sd = stripDate(ed);
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
export const getDisplayDate = (event, format) => {
  const dateTime = getEventStart(event);
  const eventDate =
    format === "compact"
      ? moment(dateTime).format("MMM D")
      : moment(dateTime).format("M/DD/YYYY");
  return eventDate;
};

/**
 *
 * @param {obj} event The localist event.
 * @return {string} The event start date.
 */
export const getEventDate = (event) => {
  const startDateTime = getEventStart(event);
  const eventSrtartDate = getMonthDayfromDateTime(startDateTime);
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
export const getTruncDesc = (event, excerptLength) => {
  if (!event) {
    return "";
  }
  let description = event.description_text;
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
export const getDay = (event) => {
  const startDateTime = getEventStart(event);
  const date = getDayfromDateTime(startDateTime);
  return date;
};

export const getEventEndTime = (event) => {
  const endTime = getEventEnd(event);
  let time = "";
  if (typeof endTime !== "undefined" && endTime !== null) {
    time = getTimefromDateTime(endTime);
  }
  return time;
};

export const isAllDay = (event) => {
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
export const getEventTime = (event) => {
  let eventTime = "";
  if (isAllDay(event)) {
    eventTime = "all day";
  } else {
    const startDate = getEventStart(event);
    eventTime = getTimefromDateTime(startDate);
  }
  return eventTime;
};

/**
 * Checks if event is all day and returns appropriate start time.
 * @param {obj} event The event obj.
 * @return {string} the eventTime string.
 */
export const getEventFullTime = (event) => {
  let eventTime = "";
  if (isAllDay(event)) {
    eventTime = "all day";
  } else {
    const startDate = getEventStart(event);
    let stopTime = getEventEndTime(event);
    stopTime = stopTime ? ` - ${stopTime}` : "";
    eventTime = getTimefromDateTime(startDate) + stopTime;
  }
  return eventTime;
};

/**
 *
 * @param {obj} event The localist event
 * @return {string} The group name.
 */
export const getGroupName = (event) => {
  let groupName = "";
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
export const getGroupId = (event) => {
  let groupId = 0;
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
export const getTypeIds = (event) => {
  let types = [];
  if (typeof event.filters.event_types !== "undefined") {
    types = event.filters.event_types.map((type) => {
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
export const getDepartmentIds = (event) => {
  let departments = [];
  if (typeof event.filters.departments !== "undefined") {
    departments = event.filters.departments.map((dept) => {
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
export const getDepartment = (event) => {
  let department = "";
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
export const getFiltersType = (event) => {
  return event.filters.event_types;
};

/**
 * Get an array of the filters departments.
 * @todo departments are an array get all of the departments.
 * @param {obj} event The localist Event.
 * @return {string} The filter text.
 */
export const getFiltersDepartments = (event) => {
  return event.filters.departments;
};

/**
 * Gets the appropriate event type.
 * @todo add support for multiple filter types.
 * @param {obj} event The localist Event.
 * @param {string} prefCategory The preferred category filter.
 * @return {mixed} An array or a string if only one.
 */
export const getEventType = (event, prefCategory) => {
  const department = getDepartment(event);
  const groupName = getGroupName(event);
  let eventTypes = [];
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
export const getEventTypeString = (event, prefCategory) => {
  if (typeof event.filters.event_types !== "undefined") {
    return event.filters.event_types.map((type) => type.name).join(", ");
  }
};

/**
 * Gets the appropriate event type.
 * @todo add support for multiple filter types.
 * @param {obj} event The localist Event.
 * @return {mixed} A string of event types or null
 */
export const getEventDepartmentsString = (event, prefCategory) => {
  if (typeof event.filters.departments !== "undefined") {
    return event.filters.departments.map((type) => type.name).join(", ");
  }
};

/**
 * Gets start date in compact format.
 * @param {event} event The event.
 * @return {string} The MMM D".
 */
export const getEventDateCompact = (event) => {
  const startDateTime = getEventStart(event);
  const eventDateCompact = moment(startDateTime).format("MMM D");
  return eventDateCompact;
};

/**
 * Gets start date in standard format.
 * @param {event} event The event.
 * @return {string} The MMMM YYYY".
 */
export const getMonthHeader = (event) => {
  const startDateTime = getEventStart(event);
  const eventMonthHeader = moment(startDateTime).format("MMMM YYYY");
  return eventMonthHeader;
};

/**
 * Gets start date in standard format.
 * @param {event} event The event.
 * @return {string} The MMM".
 */
export const getAbbrMonth = (event) => {
  const startDateTime = getEventStart(event);
  const abbrMonth = moment(startDateTime).format("MMM");
  return abbrMonth;
};

/**
 * If event has a class array return it as a string.
 * @param {event} event The event.
 * @return {string}
 */
export const getClassItem = (event) => {
  if ("itemClassArray" in event) {
    return event.itemClassArray.join(" ");
  }
  return "";
};
