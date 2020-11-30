import React from 'react';
import PropTypes from 'prop-types';
import Standard from '../molecules/standard';
import Compact from '../molecules/compact';
import ModernStandard from '../molecules/ModernStandard';
import ModernCompact from '../molecules/modern_compact';
import InlineCompact from '../molecules/inline_compact';
import Calendar from '../molecules/EventsCalendar'

const LocalistView = (props) => {
    let component;
    const {format, page, loading} = props;

    if (loading){
        return (
            <div className="loader p-4">
                <span className="fa fa-spin fa-cog"/>
            </div>
        )
    }

    switch (format) {
        case 'standard':
            component = <Standard
                key = {page}
                {...props}
            />
            break;

        case 'compact':
            component = <Compact
                key = {page}
                {...props}
            />
            break;

        case 'modern_standard':
            props.wrapperClassArray.push('singles');
            component = <ModernStandard
                key = {page}
                {...props}
            />
            break;

        case 'modern_compact':
            props.wrapperClassArray.push('compact');
            component = <ModernCompact
                key = {page}
                {...props}
            />
            break;

        case 'inline_compact':
            component = <InlineCompact
                key = {page}
                {...props}
            />
            break;

        case 'calendar':
            component = <Calendar
                key = {page}
                {...props}
            />
            break;

        default:
            component = <>Invalid Component Selected</>
            break;
    }
    return component;

}

LocalistView.propTypes = {
    events: PropTypes.array.isRequired,
    format: PropTypes.oneOf([
        'standard',
        'compact',
        'modern_compact',
        'modern_standard',
        'inline_compact',
        'calendar'
    ]).isRequired,
    truncatedescription: PropTypes.string.isRequired,
    hidedescription: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    hideimages: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    hideaddcal: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    filterby: PropTypes.string.isRequired,
    wrapperclass: PropTypes.string.isRequired,
    listclass: PropTypes.string.isRequired,
    itemclass: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    wrapperClassArray: PropTypes.array.isRequired,
    listClassArray: PropTypes.array.isRequired,
};

export default LocalistView;
