import React from "react";

var Checkbox = function Checkbox(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? "checkbox" : _ref$type,
      name = _ref.name,
      _ref$checked = _ref.checked,
      checked = _ref$checked === void 0 ? false : _ref$checked,
      onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement("input", {
    type: type,
    name: name,
    checked: checked,
    onChange: onChange
  });
};

export default Checkbox;