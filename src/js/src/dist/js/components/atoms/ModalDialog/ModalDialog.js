import React from "react";
import { useTransition, animated, config } from "react-spring/web.cjs";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./ModalDialog.scss";
var AnimatedDialogOverlay = animated(DialogOverlay);
var AnimatedDialogContent = animated(DialogContent);

function ModalDialog(props) {
  // const [showDialog, setShowDialog] = useState(false);
  var transitions = useTransition(props.showDialog, null, {
    from: {
      opacity: 0,
      y: -10
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: 10
    },
    config: config.stiff
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "cwd-events-modal-dialog"
  }, transitions.map(function (_ref) {
    var item = _ref.item,
        styles = _ref.props;
    return item && /*#__PURE__*/React.createElement(AnimatedDialogOverlay, {
      key: item,
      style: {
        opacity: styles.opacity
      },
      onDismiss: function onDismiss() {
        return props.setShowDialog(false);
      }
    }, /*#__PURE__*/React.createElement(AnimatedDialogContent, {
      "aria-label": "The selected event dialog",
      style: {
        transform: styles.y.interpolate(function (value) {
          return "translate3d(0px, ".concat(value, "px, 0px)");
        }),
        border: "4px solid hsla(0, 0%, 0%, 0.5)",
        borderRadius: 10,
        minHeight: 300
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "close",
      style: {
        float: "right",
        padding: "2px 5px"
      },
      onClick: function onClick() {
        return props.setShowDialog(false);
      },
      "aria-label": "close dialog"
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon-close"
    })), props.children));
  }));
}

export default ModalDialog;