import LocalistView from "./build";

// const data = require('./config.json');
require("babel-polyfill");

/** *********************** START LOCALIST *********************************** /
 * CWD Events
 * requires {localist-viewer}
 * @author CU Custom Development
 *  self invoking anonymous function, using drupal behaviors API.
 *
 **************************************************************************** */
// LocalistView(data);

// another example of how to config
const eventListings = [...document.getElementsByClassName("events-listing")];
eventListings.forEach(elem => {
	const dataset = { ...elem.dataset };
	LocalistView(dataset);
});
