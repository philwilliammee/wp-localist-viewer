import React from "react";
import Localist from "./localist";
import EventsState from "./js/context/EventState";

var App = function App(props) {
  return /*#__PURE__*/React.createElement(EventsState, null, /*#__PURE__*/React.createElement(Localist, props));
};

export default App;