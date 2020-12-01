// @ts-nocheck
import ReactDOM from "react-dom";
import React from "react";
import { LocalistComponent } from "./lib";

require("babel-polyfill");

/** *********************** START LOCALIST *********************************** /
 * CWD Events
 * requires {localist-viewer}
 * @author CU Custom Development
 *  self invoking anonymous function, using drupal behaviours API.
 *
 **************************************************************************** */
// LocalistView(data);

// another example of how to config
const eventListings = [...document.getElementsByClassName("events-listing")];

eventListings.forEach(elem => {
  const dataset = { ...elem.dataset };
  ReactDOM.render(
    <LocalistComponent {...dataset} />,
    document.getElementById(dataset.target)
  );
});
