import React from 'react';
import PropTypes from 'prop-types';
import {getTruncDesc, getEventDateCompact, getClassItem}
    from '../../helpers/displayEvent';
import AddCal from './addCal'
import {EventTitle, EventDate, EventLocation, EventThumbnail, EventDescription}
    from './partials';

const CompactInner = props => {
    const {
        event,
        hideaddcal,
        truncatedescription,
        hidedescription,
        hideimages,
    } = props;
    const classList = getClassItem(event);
    return (
        <div className={`views-row ${classList}`}>
            <EventThumbnail
                photoUrl={event.photo_url}
                title={event.title}
                hideimages={hideimages}
                photoCrop='big'
            />
            <div className="event-node node">
                <div className = 'events'>
                    <EventTitle title={event.title} url={event.localist_url} />
                    <EventLocation locationName={event.location_name} />
                    <EventDate date={getEventDateCompact(event)} />
                    <EventDescription
                        description={getTruncDesc(event, truncatedescription)}
                        title = {event.title}
                        url = {event.localist_url}
                        hidedescription = {hidedescription}
                    />
                    <AddCal hideaddcal={hideaddcal} event={event} />
                </div>
            </div>
        </div>
    )
}

CompactInner.propTypes = {
    event: PropTypes.object.isRequired,
    truncatedescription: PropTypes.string.isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
        .isRequired,
    hidedescription: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
        .isRequired,
    hideimages: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
        .isRequired,
};

const Compact = (props) => {
    const {
        events,
        filterby,
        listClassArray,
        wrapperClassArray,
    } = props;
    const wrapperClassList = wrapperClassArray.join(' ');
    const listClassList = listClassArray.join(' ');
    return (
        <section className='standard compact' title="Events List">
            <div className="events-main-body">
                <div className={`events-listing compact ${wrapperClassList}`}>
                    <div className={`events-list view-content ${listClassList}`}>
                        {events.length > 0
                            ? events.map( event => {
                                return (
                                    <CompactInner
                                        key={event.event.id}
                                        event={event.event}
                                        filterby={filterby}
                                        {...props}
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

Compact.propTypes = {
    events: PropTypes.array,
    filterby: PropTypes.string.isRequired,
    truncatedescription: PropTypes.string,
    wrapperClassArray: PropTypes.array.isRequired,
    listClassArray: PropTypes.array.isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    hidedescription: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    hideimages: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
};

Compact.defaultProps = {
    events: [],
    hideaddcal: 'false',
    truncatedescription: '150',
    hidedescription: 'false',
    hideimages: 'false',

};

export default Compact;
