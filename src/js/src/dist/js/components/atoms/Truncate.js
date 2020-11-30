import React from "react";
import PropTypes from "prop-types";
import { getTruncDesc } from "../../helpers/displayEvent";
import { isHidden } from "../../helpers/common";

var Truncate = function Truncate(props) {
  var hidedescription = props.hidedescription,
      event = props.event,
      truncatedescription = props.truncatedescription,
      readMore = props.readMore;

  if (isHidden(hidedescription)) {
    return "";
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, getTruncDesc(event, truncatedescription), " ", readMore);
};

Truncate.propTypes = {
  event: PropTypes.object.isRequired,
  truncatedescription: PropTypes.string.isRequired,
  hidedescription: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  readMore: PropTypes.string
};
Truncate.defaultProps = {
  readMore: ""
};
export default Truncate;