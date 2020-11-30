import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
    const {heading, readmore, url} = props;
    const renderHeading = heading ? <h2>{heading}</h2> : '';
    const renderReadmore = !readmore || !url ? '' : <a className='cwd_events_readmore' href={url}>{readmore}</a>;
    return (
        <div>
            {renderHeading}
            {renderReadmore}
        </div>
    )
}

Heading.propTypes = {
    heading: PropTypes.string.isRequired,
    readmore: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Heading;