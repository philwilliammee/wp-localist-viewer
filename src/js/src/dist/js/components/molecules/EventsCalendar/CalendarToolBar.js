import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import React from "react";
import clsx from "clsx";
import Toolbar from "react-big-calendar/lib/Toolbar";

var CustomToolbar = /*#__PURE__*/function (_Toolbar) {
  _inherits(CustomToolbar, _Toolbar);

  var _super = _createSuper(CustomToolbar);

  function CustomToolbar() {
    _classCallCheck(this, CustomToolbar);

    return _super.apply(this, arguments);
  }

  _createClass(CustomToolbar, [{
    key: "viewNamesGroup",
    value: function viewNamesGroup(messages) {
      var _this = this;

      var viewNames = this.props.views;
      var view = this.props.view; // CD Add our List

      messages.list = "List";

      if (viewNames.length > 1) {
        return viewNames.map(function (name) {
          return /*#__PURE__*/React.createElement("button", {
            type: "button",
            key: name,
            className: clsx({
              "rbc-active": view === name
            }),
            onClick: _this.view.bind(null, name)
          }, messages[name]);
        });
      }
    }
  }]);

  return CustomToolbar;
}(Toolbar);

export default CustomToolbar;