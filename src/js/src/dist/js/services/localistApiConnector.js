import axios from "axios";
import moment from "moment";
/**
 * Sets params and returns axios Promise.
 * options: https://developer.localist.com/doc/api#event-list
 */

export default (function (props) {
  var depts = props.depts,
      entries = props.entries,
      group = props.group,
      keyword = props.keyword,
      daysahead = props.daysahead,
      apikey = props.apikey,
      calendarurl = props.calendarurl,
      page = props.page,
      start = props.start,
      end = props.end;
  var params = {
    apikey: apikey,
    distinct: true,
    pp: entries,
    page: page,
    direction: daysahead.startsWith("-") ? "desc" : "asc"
  }; // Supports multiple departments with CSV string.

  if (depts && depts !== "0") {
    params.type = [];
    depts.split(",").forEach(function (item) {
      params.type.push(item.trim());
    });
  }

  if (group && group !== "0") {
    params.group_id = group;
  } // @todo add support for multiple keywords


  if (keyword && keyword !== "") {
    params.keyword = keyword;
  } // Archive support


  if (daysahead.startsWith("-")) {
    params.start = moment().add(parseInt(daysahead), "days").format("YYYY-MM-DD");
    params.end = moment().format("YYYY-MM-DD");
  } else if (start && end) {
    params.start = start;
    params.end = end;
  } else {
    params.days = daysahead;
  }

  return axios.get(calendarurl, {
    params: params
  });
});