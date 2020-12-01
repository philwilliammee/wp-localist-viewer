import axios from "axios";
import moment from "moment";
import { gql } from "@apollo/client";

const GET_EVENTS = `
	query getEvents(
		$startDay: Int!
		$startMonth: Int!
		$startYear: Int!
		$endDay: Int!
		$endMonth: Int!
		$endYear: Int!
	) {
		events(
			where: {
				dateQuery: {
					after: { day: $startDay, month: $startMonth, year: $startYear }
					before: { day: $endDay, month: $endMonth, year: $endYear }
				}
			}
		) {
			nodes {
				date
				event {
					eventId
					title
					description
					location
					date
					isAllDay
					localistUrl
					startTime
					photoUrl
				}
			}
		}
	}
`;

/**
 * Sets params and returns axios Promise.
 * options: https://developer.localist.com/doc/api#event-list
 */
export default props => {
  const {
    // depts,
    // entries,
    // group,
    // keyword,
    // daysahead,
    // apikey,
    // calendarurl,
    // page,
    start,
    end
  } = props;

  // const params = {
  //   apikey,
  //   distinct: true,
  //   pp: entries,
  //   page,
  //   direction: daysahead.startsWith("-") ? "desc" : "asc"
  // };

  // Supports multiple departments with CSV string.
  // if (depts && depts !== "0") {
  //   params.type = [];
  //   depts.split(",").forEach(item => {
  //     params.type.push(item.trim());
  //   });
  // }

  // if (group && group !== "0") {
  //   params.group_id = group;
  // }

  // // @todo add support for multiple keywords
  // if (keyword && keyword !== "") {
  //   params.keyword = keyword;
  // }

  // Archive support
  // if (daysahead.startsWith("-")) {
  //   params.start = moment()
  //     .add(parseInt(daysahead), "days")
  //     .format("YYYY-MM-DD");
  //   params.end = moment().format("YYYY-MM-DD");
  // } else if (start && end) {
  //   params.start = start;
  //   params.end = end;
  // } else {
  //   params.days = daysahead;
  // }

  // console.log(start);
  // console.log(end);
  const body = {
    query: GET_EVENTS,
    variables: {
      startDay: parseInt(moment(start).format("D"), 10),
      startMonth: parseInt(moment(start).format("M"), 10),
      startYear: parseInt(moment(start).format("YYYY"), 10),
      endDay: parseInt(moment(end).format("D"), 10),
      endMonth: parseInt(moment(end).format("M"), 10),
      endYear: parseInt(moment(end).format("YYYY"), 10)
    }
  };

  // console.log(body.variables);

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return axios.post("/graphql", body, options);
  // return axios.get(calendarurl, { params });
};
