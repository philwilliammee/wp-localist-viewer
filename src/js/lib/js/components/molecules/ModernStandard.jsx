import React from 'react';
import PropTypes from 'prop-types';
import {getEventTime, getClassItem} from '../../helpers/displayEvent';
import AddCal from './addCal'
import {EventImg} from './partials';
import Truncate from '../atoms/Truncate';
import Time from '../atoms/Time';

export const ModernStandardInner = props => {
    const {
        event,
        hideimages,
        hidetime,
    } = props;

    /**
     *
     * @param {obj} eventTypes An array of events.
     * @return {string} Html string
     */
    const tagStr = eventTypes => {
        let spanStr;
        if (eventTypes) {
            spanStr = eventTypes.map(element => {
                return <span key={element.id} className="inline-events-type">{element.name}</span>
            });
        }
        return spanStr;
    };

    const eventTime = getEventTime(event);
    const classList = getClassItem(event);
    return (
        <div className={classList}>
            <div className="events">
                <a
                    href={event.localist_url}
                    className="group-link-wrapper field-group-link"
                >
                    { hidetime ? '' : <Time event={event} /> }
                    <div className="field title">
                        <h3>{event.title}</h3>
                    </div>
                    <div className="field meta">
                        <p>
                            { hidetime ? '' : eventTime}{ event.location_name ? `, ${event.location_name}` : '' }
                            {tagStr(event.filters.event_types)}
                        </p>
                    </div>
                    <div className="field field-name-summary summary">
                        <p>
                            <EventImg
                                photoUrl={event.photo_url}
                                title={event.title}
                                hideimages = {hideimages}
                                photoCrop='big'
                            />
                            <Truncate {...props} readMore="read more" />
                        </p>
                    </div>
                </a>
                <AddCal {...props} />
            </div>

        </div>
    )
}

ModernStandardInner.propTypes = {
    event: PropTypes.object.isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
        .isRequired,
    truncatedescription: PropTypes.string.isRequired,
    hidedescription: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
        .isRequired,
    hideimages: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
        .isRequired,
    hidetime: PropTypes.bool
};

ModernStandardInner.defaultProps = {
    hidetime: false
}

const ModernStandard= props =>{
    const {
        events,
        listClassArray,
        wrapperClassArray,
    } = props;
    const wrapperClassList = wrapperClassArray.join(' ');
    const listClassList = listClassArray.join(' ');
    return (
        <section className='events-modern-standard modern' title="Events List">
            <div>
                <div className={`cwd-component cwd-card-grid ${wrapperClassList}`}>
                    <div className={listClassList}>
                        {events.length > 0
                            ? events.map( event => {
                                return (
                                    <ModernStandardInner
                                        key={event.event.id}
                                        event={event.event}
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

ModernStandard.propTypes = {
    events: PropTypes.array,
    filterby: PropTypes.string.isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    truncatedescription: PropTypes.string,
    hideimages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hidedescription: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrapperClassArray: PropTypes.array,
    listClassArray: PropTypes.array,
};

ModernStandard.defaultProps = {
    events: [],
    hideaddcal: 'false',
    truncatedescription: '250',
    hideimages: 'false',
    wrapperClassArray: [],
    listClassArray: [],
    hidedescription: 'false',

};
export default ModernStandard;
