import axios from "axios";
import moment from "moment";

/**
 * Sets params and returns axios Promise.
 * options: https://developer.localist.com/doc/api#event-list
 */
export default (props) => {
  const {
    depts,
    entries,
    group,
    keyword,
    daysahead,
    apikey,
    calendarurl,
    page,
    start,
    end,
  } = props;

  const params = {
    apikey,
    distinct: true,
    pp: entries,
    page,
    direction: daysahead.startsWith("-") ? "desc" : "asc",
  };

  // Supports multiple departments with CSV string.
  if (depts && depts !== "0") {
    params.type = [];
    depts.split(",").forEach((item) => {
      params.type.push(item.trim());
    });
  }

  if (group && group !== "0") {
    params.group_id = group;
  }

  // @todo add support for multiple keywords
  if (keyword && keyword !== "") {
    params.keyword = keyword;
  }

  // Archive support
  if (daysahead.startsWith("-")) {
    params.start = moment()
      .add(parseInt(daysahead), "days")
      .format("YYYY-MM-DD");
    params.end = moment().format("YYYY-MM-DD");
  } else if (start && end) {
    params.start = start;
    params.end = end;
  } else {
    params.days = daysahead;
  }

  return axios.get(calendarurl, { params });
};
