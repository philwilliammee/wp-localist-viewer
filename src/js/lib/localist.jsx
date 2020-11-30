/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import localistApiConnector from './js/services/localistApiConnector';
import Heading from './js/components/organisms/heading';
import Paginate from './js/components/organisms/paginate';
import LocalistView from './js/components/organisms/localist_view';
import EventFilters from './js/components/organisms/event_filterby';
import { isHidden } from './js/helpers/common';
import EventsContext from './js/context/EventsContext'
import moment from 'moment'

/**
 * Localist Component
 * @todo reset filters on pagination load.
 * @todo implement class lists for all components.
 */
const Localist = props => {
    const {events, setEvents, setFilteredEvents} = useContext(EventsContext)
    const [llPage, setLlPage] = useState({ current: props.page, size: 1, total: 1 })
    const [currentPage, setCurrentPage] = useState(props.page)
    const [filter, setFilter] = useState('filterAll')
    const [loading, setLoading] = useState(true)
    let wrapperClassArray = props.wrapperclass.split(' ');
    if (isHidden(props.hideimages)) {
        wrapperClassArray.push('no-thumbnails')
    }
    const classes = ['events-listing'];
    wrapperClassArray = wrapperClassArray.concat(classes);
    const listClassArray = props.listclass.split(' ');
    listClassArray.push('events-list');

    const getEvents = useCallback(async () => {
        let start, end;
        if (props.format === 'calendar'){
            start = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD hh:mm');
            end   = moment().add(1, 'month').endOf('month').format('YYYY-MM-DD hh:mm');
        }
        setLoading(true)
        const itemClassArray = props.itemclass.split(' ').concat(['event-node']);
        let res = await localistApiConnector({ ...props, page:currentPage, start, end});
        res.data.events.forEach(event => {
            event.event.itemClassArray = [...itemClassArray];
        })
        // Used by calendar only.
        setFilteredEvents(res.data.events)
        setEvents(res.data.events)
        setLlPage(res.data.page)
        setLoading(false)
    }, [currentPage, props])


    useEffect(() => { getEvents() }, [currentPage])

    function handlePageClick(data) {
        const newPage = data.selected + 1;
        setCurrentPage(newPage)
    }

    function handleEventFilter(events, filter) {
        setFilter(filter)
        setEvents(events)
    }

    return (
        <div>
            <Heading
                heading={props.heading}
                readmore={props.readmore}
                url={props.url}
            />
            <EventFilters
                key={currentPage}
                events={events}
                handleEventFilter={handleEventFilter}
                active={filter}
                setActive={setFilter}
                filterby={props.filterby}
            />
            <LocalistView
                key={filter}
                {...props}
                events={events}
                page={currentPage}
                loading={loading}
                wrapperClassArray={wrapperClassArray}
                listClassArray={listClassArray}

            />
            <Paginate
                hidepagination={props.hidepagination}
                total={llPage.total}
                handlePageClick={handlePageClick}
            />
        </div>
    );

}

Localist.propTypes = {
    calendarurl: PropTypes.string.isRequired,
    entries: PropTypes.string,
    daysahead: PropTypes.string,
    depts: PropTypes.string,
    group: PropTypes.string,
    keyword: PropTypes.string,
    format: PropTypes.oneOf([
        'standard',
        'compact',
        'modern_compact',
        'modern_standard',
        'inline_compact',
        'calendar'
    ]),
    apikey: PropTypes.string,
    truncatedescription: PropTypes.string.isRequired,
    heading: PropTypes.string,
    hidedescription: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hideimages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hideaddcal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hidepagination: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    filterby: PropTypes.oneOf([
        'group',
        'dept',
        'type',
        'none',
    ]),
    wrapperclass: PropTypes.string,
    listclass: PropTypes.string,
    itemclass: PropTypes.string,
    page: PropTypes.number,
    readmore: PropTypes.string,
    url: PropTypes.string,
};


Localist.defaultProps = {
    depts: '0',
    group: '0',
    keyword: '',
    entries: '3',
    format: 'standard',
    apikey: '',
    daysahead: '365',
    heading: '',
    filterby: 'group',
    hidedescription: 'false',
    hideimages: 'false',
    hidepagination: 'true',
    hideaddcal: 'false',
    wrapperclass: '',
    listclass: '',
    itemclass: '',
    page: 1,
    readmore: '',
    url: '',
};

export default Localist;
