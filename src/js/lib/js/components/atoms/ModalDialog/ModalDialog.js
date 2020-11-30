import React from "react";
import { useTransition, animated, config } from "react-spring/web.cjs";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import PropTypes from "prop-types";
import "@reach/dialog/styles.css";
import "./ModalDialog.scss";

let AnimatedDialogOverlay = animated(DialogOverlay);
let AnimatedDialogContent = animated(DialogContent);

function ModalDialog(props) {
  // const [showDialog, setShowDialog] = useState(false);
  const transitions = useTransition(props.showDialog, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
    config: config.stiff,
  });
  return (
    <div className="cwd-events-modal-dialog">
      {transitions.map(
        ({ item, props: styles }) =>
          item && (
            <AnimatedDialogOverlay
              key={item}
              style={{ opacity: styles.opacity }}
              onDismiss={() => props.setShowDialog(false)}
            >
              <AnimatedDialogContent
                aria-label="The selected event dialog"
                style={{
                  transform: styles.y.interpolate(
                    (value) => `translate3d(0px, ${value}px, 0px)`
                  ),
                  border: "4px solid hsla(0, 0%, 0%, 0.5)",
                  borderRadius: 10,
                  minHeight: 300,
                }}
              >
                <button
                  className="close"
                  style={{ float: "right", padding: "2px 5px" }}
                  onClick={() => props.setShowDialog(false)}
                  aria-label="close dialog"
                >
                  <span className="icon-close"></span>
                </button>
                {props.children}
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </div>
  );
}

ModalDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ModalDialog;
