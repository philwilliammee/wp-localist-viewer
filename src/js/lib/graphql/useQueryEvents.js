// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client";

export const GET_EVENTS = gql`
	query getEvents {
		events(
			first: 100
			events( where: {dateQuery: {after: {day: 1, month: 10, year: 2020}}}) {
		) {
			nodes {
				date
				event {
					title
					description
					date
					isAllDay
					localistUrl
					startTime
					featuredImageUrl
				}
			}
		}
	}
`;
