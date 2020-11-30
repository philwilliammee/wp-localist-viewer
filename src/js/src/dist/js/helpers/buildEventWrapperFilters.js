import { getGroupName, getGroupId } from './displayEvent';
import { addUniqueObj } from './common';
/**
 * Gets the filter types from events.
 *  Creates an array of objects used to build buttons.
 * @param {obj} event The localist event.
 */

var buildEventWrapperFilters = function buildEventWrapperFilters(events, filterby) {
  if (filterby === 'none') {
    return '';
  }

  var filters = [];
  events.forEach(function (eventObj) {
    var event = eventObj.event;
    var groupName = getGroupName(event);
    var groupId = getGroupId(event);

    if (filterby === 'type' && event.filters.event_types) {
      var types = event.filters.event_types;
      types.forEach(function (type) {
        var id = type.id,
            name = type.name;
        addUniqueObj(filters, {
          id: id,
          name: name
        });
      });
    } else if (filterby === 'dept' && event.filters.departments) {
      var departments = event.filters.departments;
      departments.forEach(function (department) {
        var id = department.id,
            name = department.name;
        addUniqueObj(filters, {
          id: id,
          name: name
        });
      });
    } else if (filterby === 'group' && groupName !== '') {
      addUniqueObj(filters, {
        id: groupId,
        name: groupName
      });
    }
  });
  return filters;
};

export default buildEventWrapperFilters;