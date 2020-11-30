import _regeneratorRuntime from "@babel/runtime/regenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import localistApiConnector from './js/services/localistApiConnector';
import Heading from './js/components/organisms/heading';
import Paginate from './js/components/organisms/paginate';
import LocalistView from './js/components/organisms/localist_view';
import EventFilters from './js/components/organisms/event_filterby';
import { isHidden } from './js/helpers/common';
import EventsContext from './js/context/EventsContext';
import moment from 'moment';
/**
 * Localist Component
 * @todo reset filters on pagination load.
 * @todo implement class lists for all components.
 */

var Localist = function Localist(props) {
  var _useContext = useContext(EventsContext),
      events = _useContext.events,
      setEvents = _useContext.setEvents,
      setFilteredEvents = _useContext.setFilteredEvents;

  var _useState = useState({
    current: props.page,
    size: 1,
    total: 1
  }),
      _useState2 = _slicedToArray(_useState, 2),
      llPage = _useState2[0],
      setLlPage = _useState2[1];

  var _useState3 = useState(props.page),
      _useState4 = _slicedToArray(_useState3, 2),
      currentPage = _useState4[0],
      setCurrentPage = _useState4[1];

  var _useState5 = useState('filterAll'),
      _useState6 = _slicedToArray(_useState5, 2),
      filter = _useState6[0],
      setFilter = _useState6[1];

  var _useState7 = useState(true),
      _useState8 = _slicedToArray(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1];

  var wrapperClassArray = props.wrapperclass.split(' ');

  if (isHidden(props.hideimages)) {
    wrapperClassArray.push('no-thumbnails');
  }

  var classes = ['events-listing'];
  wrapperClassArray = wrapperClassArray.concat(classes);
  var listClassArray = props.listclass.split(' ');
  listClassArray.push('events-list');
  var getEvents = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var start, end, itemClassArray, res;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (props.format === 'calendar') {
              start = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD hh:mm');
              end = moment().add(1, 'month').endOf('month').format('YYYY-MM-DD hh:mm');
            }

            setLoading(true);
            itemClassArray = props.itemclass.split(' ').concat(['event-node']);
            _context.next = 5;
            return localistApiConnector(_objectSpread(_objectSpread({}, props), {}, {
              page: currentPage,
              start: start,
              end: end
            }));

          case 5:
            res = _context.sent;
            res.data.events.forEach(function (event) {
              event.event.itemClassArray = _toConsumableArray(itemClassArray);
            }); // Used by calendar only.

            setFilteredEvents(res.data.events);
            setEvents(res.data.events);
            setLlPage(res.data.page);
            setLoading(false);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [currentPage, props]);
  useEffect(function () {
    getEvents();
  }, [currentPage]);

  function handlePageClick(data) {
    var newPage = data.selected + 1;
    setCurrentPage(newPage);
  }

  function handleEventFilter(events, filter) {
    setFilter(filter);
    setEvents(events);
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    heading: props.heading,
    readmore: props.readmore,
    url: props.url
  }), /*#__PURE__*/React.createElement(EventFilters, {
    key: currentPage,
    events: events,
    handleEventFilter: handleEventFilter,
    active: filter,
    setActive: setFilter,
    filterby: props.filterby
  }), /*#__PURE__*/React.createElement(LocalistView, Object.assign({
    key: filter
  }, props, {
    events: events,
    page: currentPage,
    loading: loading,
    wrapperClassArray: wrapperClassArray,
    listClassArray: listClassArray
  })), /*#__PURE__*/React.createElement(Paginate, {
    hidepagination: props.hidepagination,
    total: llPage.total,
    handlePageClick: handlePageClick
  }));
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
  url: ''
};
export default Localist;