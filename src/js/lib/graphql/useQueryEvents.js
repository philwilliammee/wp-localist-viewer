import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const GET_EVENTS = gql`
	query getEvents {
		events(
			first: 100
			where: { dateQuery: { after: { day: 1, month: 11, year: 2020 } } }
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

// seems redundant we already have all of the workouts from useWorkouts?
// Maybe just make a function to filter that?
const useQueryEvents = id => {
	return useQuery(GET_EVENTS);
};
export default useQueryEvents;
