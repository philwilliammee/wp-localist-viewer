import React from 'react';
import PropTypes from 'prop-types';
import { isHidden } from '../../helpers/common';

const EventTitle = props => {
    const {title, url} = props;
    return (
        <h3>
            <a
                rel='noreferrer noopener'
                target='_blank'
                href={url}
            >
                {title}
            </a>
        </h3>
    )
}

EventTitle.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

const EventDate = props => {
    const {date} = props;
    return(
        <h4 className='meta date'>
            <span className='fulldate'>
                {date}
            </span>
        </h4>
    );
}

EventDate.propTypes = {
    date: PropTypes.string.isRequired,
};

const EventLocation = props => {
    const {locationName} = props;
    if (locationName){
        return <h4 className='meta location'>{locationName}</h4>
    }
    return '';
}
EventLocation.propTypes = {
    locationName: PropTypes.string,
};
EventLocation.defaultProps = {
    EventLocation: null,
}

const EventImg = props => {
    const {hideimages, photoUrl, title, photoCrop} = props;
    const photo = photoUrl.replace('/huge/', `/${photoCrop}/`);
    if ( isHidden(hideimages)) {
        return '';
    }
    return (
        <img
            alt={title}
            height='150'
            src={photo}
            loading='lazy'
        />
    );

}

EventImg.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hideimages: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    photoCrop:PropTypes.oneOf(['huge', 'big', 'big_square']),
};
EventImg.defaultProps = {
    hideimages: null,
    photoCrop: 'big',
}

const EventThumbnail = props => {
    const {hideimages, photoUrl, title, photoCrop} = props;
    if ( isHidden(hideimages)) {
        return '';
    }
    return (
        <div className='group-image'>
            <EventImg
                hideimages={hideimages}
                photoUrl={photoUrl}
                title={title}
                photoCrop={photoCrop}
            />
        </div>

    );
}

EventThumbnail.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hideimages: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    photoCrop:PropTypes.oneOf(['huge', 'big', 'big_square']),
};
EventThumbnail.defaultProps = {
    hideimages: null,
    photoCrop: 'big',
}

const EventDescription = props =>{
    const {description, title, url, hidedescription} = props;

    const descriptionLink = <a
        className='read-more more'
        href={url}
        rel='noreferrer noopener'
        target='_blank'
    > read more
        <span className='visually-hidden'> about {title}
        </span>
    </a>

    return (
        <div className = 'summary'>
            <p className='description'>
                {
                    isHidden(hidedescription)
                        ? ''
                        : description
                }
                {
                    isHidden(hidedescription)
                        ? ''
                        : descriptionLink
                }
            </p>
        </div>
    )
}

EventDescription.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    hidedescription: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
};

EventDescription.defaultProps = {
    hidedescription: 'false',
}

const EventTypes = props => {
    const {eventTypes} = props;
    if (!eventTypes) {
        return '';
    }
    return (
        <h4 className="meta type">
            <span className="fa"/>
            {eventTypes.map(eventType => {
                return eventType.name
            }).join(', ')}
        </h4>
    )
}
EventTypes.propTypes = {
    eventTypes: PropTypes.array,
};

EventTypes.defaultProps = {
    eventTypes: null,
}

const FilterButton= props => {
    const {filterId, active, clickHandler, name} = props
    return (
        <button
            id={filterId}
            className={`filter-btn ${active === filterId ? 'active' : ''}`}
            type="button"
            onClick={clickHandler}
        >{name}
        </button>
    )
}
FilterButton.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    filterId: PropTypes.string.isRequired,
    active: PropTypes.string,
};

FilterButton.defaultProps = {
    active: '',
}

export {
    EventTitle,
    EventDate,
    EventLocation,
    EventThumbnail,
    EventDescription,
    EventTypes,
    EventImg,
    FilterButton,
};
