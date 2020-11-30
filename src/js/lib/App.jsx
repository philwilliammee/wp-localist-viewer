import React from "react";
import Localist from "./localist";
import EventsState from "./js/context/EventState";

const App = (props) => (
  <EventsState>
    <Localist {...props} />
  </EventsState>
);

export default App;
