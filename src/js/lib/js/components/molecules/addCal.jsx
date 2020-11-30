import React from 'react';
import PropTypes from 'prop-types';
import buildUrl from 'build-url';
import { getCalStartDate, getCalEndDate } from '../../helpers/displayEvent';
import { isHidden } from '../../helpers/common';

const buildGoogleLink = (myObj) => {
    const gDateStart = getCalStartDate(myObj);
    const gDateStop = getCalEndDate(myObj);
    const href = buildUrl(
        'https://calendar.google.com/calendar/event', {
        queryParams: {
            action: 'TEMPLATE',
            dates: `${gDateStart}/${gDateStop}`,
            details: myObj.description_text.replace(/[\r\n]/g, `<br />`),
            location: myObj.location,
            sprop: 'website:events.cornell.edu',
            text: myObj.title,
        }
    })
    return href
}

const buildGoogleStr = (myObj) => {
    const href = buildGoogleLink(myObj)
    return (
        <a
            className="fa fa-google google"
            href={href}
            title="Save to Google Calendar"
            rel='noreferrer noopener'
            target="_blank"
        >
            <span className="sr-only">
                Add {myObj.title} to Google Calendar
            </span>
        </a>
    )
};

const buildiCal = myObj => {
    return (
        <a
            className="fa fa-calendar apple"
            href={myObj.localist_ics_url}
            title="Save to iCal"
            rel='noreferrer noopener'
            target="_blank"
        >
            <span className="sr-only">Add {myObj.title} to iCal</span>
        </a>
    )
}

const buildOutlookCal = myObj => {
    return (
        <a
            className="fa fa-clock-o microsoft"
            href={myObj.localist_ics_url}
            title="Save to Outlook"
            rel='noreferrer noopener'
            target="_blank"
        >
            <span className="sr-only">Add {myObj.title} to Outlook</span>
        </a>
    )
}

/**
 * @param {obj} props.event The localist event object
 * @return {jsx} The rendered template.
 */
const AddCal = props => {
    const { event, hideaddcal } = props;

    if (isHidden(hideaddcal)) {
        return '';
    }

    return (
        <span className="event-subscribe"
        >add to calendar {buildGoogleStr(event)} {buildiCal(event)}
            {buildOutlookCal(event)}
        </span>
    )
};

AddCal.propTypes = {
    event: PropTypes.object.isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default AddCal;
export {buildGoogleStr, buildiCal, buildOutlookCal, buildGoogleLink}
