import React from "react";
import PropTypes from "prop-types";

/**
 * Implements CWD FlexBox Grid
 * https://iws-preview.hosting.cornell.edu/ama39/cssf/style.html#section-59
 *
 * @param {any} props
 */
const Grid = (props) => {
  if (props.container) {
    return (
      <div className="flex-grid" style={props.style}>
        {props.children}
      </div>
    );
  }
  return <div className={`flex-${props.col}`}>{props.children}</div>;
};

Grid.propTypes = {
  container: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object,
  col: PropTypes.number,
};

Grid.defaultProps = {
  col: 12,
};

export default Grid;
