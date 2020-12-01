import React from 'react';
import PropTypes from 'prop-types';
import { getEventTime, getClassItem } from '../../helpers/displayEvent';
import AddCal from './addCal'
import { EventThumbnail } from './partials';
import Truncate from '../atoms/Truncate';
import Time from '../atoms/Time';
import moment from 'moment';

const ModernCompactInner = props => {
    const { event, hideimages } = props;
    const eventTime = getEventTime(event);
    const classList = getClassItem(event);
    return (
        <div className={classList}>
            <div className="events">
                <a
                    href={event.localist_url}
                    className="group-link-wrapper field-group-link"
                >
                    <EventThumbnail
                        photoUrl={event.photoUrl}
                        title={event.title}
                        hideimages={hideimages}
                        photoCrop='big'
                    />
                    <Time event={event} />
                    <div className="field title">
                        <h3>{event.title}</h3>
                    </div>
                    <div className="field field-name-summary summary">
                        <p>
                            <Truncate {...props} />
                        </p>
                    </div>
                    <div className="field meta">
                        <p>
                            {eventTime}{event.location ? `, ${event.location}` : ''}
                        </p>
                    </div>
                </a>
                <AddCal {...props} />
            </div>
        </div>
    )
}

ModernCompactInner.propTypes = {
    event: PropTypes.object.isRequired,
    truncatedescription: PropTypes.string.isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    hideimages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    hidedescription: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const ModernCompact = props => {
    const { events, listClassArray, wrapperClassArray } = props;
    const wrapperClassList = wrapperClassArray.join(' ');
    const listClassList = listClassArray.join(' ');
    const sortedEvents = events.sort((a, b) =>
        parseInt(moment(a.event.date, "MMMM D, YYYY").format('x')) - parseInt(moment(b.event.date, "MMMM D, YYYY")
            .format('x'))).slice(0, 3)
    console.log(sortedEvents)
    return (
        <section className='events-modern-compact modern' title="Events List">
            <div className="events-main-body">
                <div className={`cwd-component cwd-card-grid ${wrapperClassList}`}>
                    <div className={listClassList}>
                        {sortedEvents.length > 0
                            ? sortedEvents.map(event => {
                                return (
                                    <ModernCompactInner
                                        key={event.event.eventId}
                                        event={event.event}
                                        display={event.display}
                                        {...props}
                                    />
                                )
                            })
                            : <p>There are no upcomming events.</p>}
                    </div>
                </div>
            </div>
        </section>
    );

}

ModernCompact.propTypes = {
    events: PropTypes.array,
    filterby: PropTypes.string.isRequired,
    truncatedescription: PropTypes.string,
    wrapperclass: PropTypes.string,
    listclass: PropTypes.string,
    hideimages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    hidedescription: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    wrapperClassArray: PropTypes.array,
    listClassArray: PropTypes.array,
};

ModernCompact.defaultProps = {
    events: [],
    truncatedescription: '150',
    wrapperclass: '',
    listclass: '',
    wrapperClassArray: [],
    listClassArray: [],

};
export default ModernCompact;
