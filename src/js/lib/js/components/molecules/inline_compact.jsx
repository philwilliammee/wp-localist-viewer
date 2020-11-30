import React from 'react';
import PropTypes from 'prop-types';
import {
    getAbbrMonth,
    getDay,
    getEventTime,
    getEventEndTime,
    getClassItem,
} from '../../helpers/displayEvent';

const InlineCompactInner = props => {
    const {event} = props;
    const eventTime = getEventTime(event);
    const endTime = getEventEndTime(event);

    const renderEventLocation = locationName => {
        if (!locationName){
            return '';
        }
        return (
            <div className="event-location">
                <span className="fa fa-map-marker" />
                {locationName}
            </div>
        )
    }
    const classList = getClassItem(event);
    return (
        <div className={`views-row ${classList}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 event-month-and-day">
                        <div>
                            <span className="event-month">{getAbbrMonth(event)}</span>
                            <span className="event-day">{getDay(event)}</span>
                        </div>
                    </div>
                    <div className="col-sm-8 event-title-and-location">
                        <div className="event-title">
                            <a href= {event.localist_url} hrefLang="en">
                                {event.title}
                            </a>
                        </div>
                        <div className="event-times">
                            <span className="fa fa-clock-o" />
                            {eventTime}{endTime ? ` - ${endTime}` : ''}
                        </div>
                        {renderEventLocation(event.location_name)}
                    </div>
                </div>
            </div>
        </div>

    )
}

InlineCompactInner.propTypes = {
    event: PropTypes.object.isRequired,
};

const InlineCompact= props =>{
    const {
        events,
        listclass,
        wrapperclass} = props;

    return (
        <section className='modern' id="eventsInlineCompact" title="Events List">
            <div className="events-main-body">
                <div className={`cwd-component compact events-listing ${wrapperclass}`}>
                    <div className={`events-list view-content ${listclass}`}>
                        {events.length > 0
                            ? events.map( event => {
                                return (
                                    <InlineCompactInner
                                        key={event.event.id}
                                        event={event.event}
                                    />
                                )
                            })
                            : <p>There are no upcoming events.</p>}
                    </div>
                </div>
            </div>
        </section>
    );

}

InlineCompact.propTypes = {
    events: PropTypes.array,
    wrapperclass: PropTypes.string,
    listclass: PropTypes.string,
};

InlineCompact.defaultProps = {
    events: [],
    wrapperclass: '',
    listclass: '',

};
export default InlineCompact;
