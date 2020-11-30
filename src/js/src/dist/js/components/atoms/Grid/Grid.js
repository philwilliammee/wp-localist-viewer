import React from "react";

/**
 * Implements CWD FlexBox Grid
 * https://iws-preview.hosting.cornell.edu/ama39/cssf/style.html#section-59
 *
 * @param {any} props
 */
var Grid = function Grid(props) {
  if (props.container) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-grid",
      style: props.style
    }, props.children);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex-".concat(props.col)
  }, props.children);
};

Grid.defaultProps = {
  col: 12
};
export default Grid;