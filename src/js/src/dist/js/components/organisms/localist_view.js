import React from 'react';
import Standard from '../molecules/standard';
import Compact from '../molecules/compact';
import ModernStandard from '../molecules/ModernStandard';
import ModernCompact from '../molecules/modern_compact';
import InlineCompact from '../molecules/inline_compact';
import Calendar from '../molecules/EventsCalendar';

var LocalistView = function LocalistView(props) {
  var component;
  var format = props.format,
      page = props.page,
      loading = props.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "loader p-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "fa fa-spin fa-cog"
    }));
  }

  switch (format) {
    case 'standard':
      component = /*#__PURE__*/React.createElement(Standard, Object.assign({
        key: page
      }, props));
      break;

    case 'compact':
      component = /*#__PURE__*/React.createElement(Compact, Object.assign({
        key: page
      }, props));
      break;

    case 'modern_standard':
      props.wrapperClassArray.push('singles');
      component = /*#__PURE__*/React.createElement(ModernStandard, Object.assign({
        key: page
      }, props));
      break;

    case 'modern_compact':
      props.wrapperClassArray.push('compact');
      component = /*#__PURE__*/React.createElement(ModernCompact, Object.assign({
        key: page
      }, props));
      break;

    case 'inline_compact':
      component = /*#__PURE__*/React.createElement(InlineCompact, Object.assign({
        key: page
      }, props));
      break;

    case 'calendar':
      component = /*#__PURE__*/React.createElement(Calendar, Object.assign({
        key: page
      }, props));
      break;

    default:
      component = /*#__PURE__*/React.createElement(React.Fragment, null, "Invalid Component Selected");
      break;
  }

  return component;
};

export default LocalistView;