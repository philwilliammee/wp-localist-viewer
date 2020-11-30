
import React from 'react';
import PropTypes from 'prop-types';
import {
    getAbbrMonth,
    getDay,
    getEventDate,
    getEventTime,
} from '../../helpers/displayEvent';

const Time = (props) => {
    const {event} = props;
    return (
        <time
            title={getEventDate(event)}
            dateTime={getEventTime(event)}
        >
            <span className="month">{getAbbrMonth(event)}</span>
            <span className="day">{getDay(event)}</span>
        </time>
    )
}

Time.propTypes = {
    event: PropTypes.object.isRequired,
}

export default Time;
