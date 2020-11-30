import {
    getGroupName,
    getGroupId,
} from './displayEvent';

import {addUniqueObj} from './common'

/**
 * Gets the filter types from events.
 *  Creates an array of objects used to build buttons.
 * @param {obj} event The localist event.
 */
const buildEventWrapperFilters = (events, filterby) => {
    if (filterby === 'none'){
        return '';
    }
    const filters = [];
    events.forEach( eventObj => {
        const {event} = eventObj
        const groupName = getGroupName(event);
        const groupId = getGroupId(event);
        if (filterby === 'type' && event.filters.event_types ) {
            const types = event.filters.event_types
            types.forEach( type =>{
                const {id, name} = type;
                addUniqueObj(filters, {id, name});
            })

        } else if (filterby === 'dept' && event.filters.departments) {
            const {departments} = event.filters
            departments.forEach( department => {
                const {id, name} = department;
                addUniqueObj(filters, {id, name});
            })
        } else if (filterby === 'group' && groupName !== '') {
            addUniqueObj(filters, { id: groupId, name: groupName });
        }
    })
    return filters;
};

export default buildEventWrapperFilters
