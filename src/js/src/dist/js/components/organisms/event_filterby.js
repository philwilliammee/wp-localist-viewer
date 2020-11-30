import React from 'react';
import buildEventWrapperFilters from '../../helpers/buildEventWrapperFilters';
import { removeElement, addUniqueElement } from '../../helpers/common';
import { getTypeIds, getGroupId, getDepartmentIds } from '../../helpers/displayEvent';
import { FilterButton } from '../molecules/partials';
/**
 * @param {obj} props The props.
 */

var EventFilters = function EventFilters(props) {
  var handleEventFilter = props.handleEventFilter,
      filterby = props.filterby,
      events = props.events,
      active = props.active,
      setActive = props.setActive;
  var filterButtons = buildEventWrapperFilters(events, filterby);

  if (filterby === 'none') {
    return '';
  }

  var applyFilter = function applyFilter(obj) {
    events.forEach(function (event) {
      var ids = getTypeIds(event.event);
      var departmentIds = getDepartmentIds(event.event);
      var groupId = getGroupId(event.event);

      if (obj.name === 'filterAll') {
        event.event.itemClassArray = removeElement(event.event.itemClassArray, 'fadeOut');
      } else if (filterby === 'type' && ids.includes(obj.id)) {
        event.event.itemClassArray = removeElement(event.event.itemClassArray, 'fadeOut');
      } else if (filterby === 'dept' && departmentIds.includes(obj.id)) {
        event.event.itemClassArray = removeElement(event.event.itemClassArray, 'fadeOut');
      } else if (filterby === 'group' && groupId === obj.id) {
        event.event.itemClassArray = removeElement(event.event.itemClassArray, 'fadeOut');
      } else {
        addUniqueElement(event.event.itemClassArray, 'fadeOut');
      }
    });
    handleEventFilter(events, obj.name);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "events-filters-wrap"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "hidden"
  }, "Show:"), /*#__PURE__*/React.createElement("ul", {
    className: "events-filters"
  }, /*#__PURE__*/React.createElement("li", {
    key: "filterAll"
  }, /*#__PURE__*/React.createElement(FilterButton, {
    filterId: "filterAll",
    active: active,
    name: "All Events",
    clickHandler: function clickHandler() {
      var obj = {
        id: 'filterAll',
        name: 'filterAll'
      };
      applyFilter(obj);
      setActive('filterAll');
    }
  })), filterButtons.map(function (obj) {
    var id = obj.id,
        name = obj.name;
    var filterId = "filter".concat(id);
    return /*#__PURE__*/React.createElement("li", {
      key: id
    }, /*#__PURE__*/React.createElement(FilterButton, {
      filterId: filterId,
      active: active,
      name: name,
      clickHandler: function clickHandler() {
        applyFilter(obj);
        setActive(filterId);
      }
    }));
  })));
};

export default EventFilters;