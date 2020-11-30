/**
 * Removes an element from an array.
 * @param {Array} a The haystack
 * @param {String} e The needle to remove
 * @return {Array} a new array
 */
export var removeElement = function removeElement(a, e) {
  return a.filter(function (v) {
    return v !== e;
  });
};
/**
 * Adds a unique element to an array.
 * @param {Array} a
 * @param {string} e
 */

export var addUniqueElement = function addUniqueElement(a, e) {
  if (!a.includes(e)) {
    a.push(e);
  }
};
/**
 * Adds a unique object to an array.
 * @param {Array} a
 * @param {object} o
 */

export var addUniqueObj = function addUniqueObj(a, o) {
  if (!("id" in o)) {
    console.warn("element id required");
    return;
  }

  if (!a.find(function (object) {
    return object.id === o.id;
  })) {
    a.push(o);
  }
};
/**
 * Test to see if element should be displayed
 * @param {mixed} v string or integer.
 * @return {boolean}
 */

export var isHidden = function isHidden(v) {
  return v === "true" || v === 1;
};
export var isNested = function isNested(obj) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.reduce(function (obj, level) {
    return obj && obj[level];
  }, obj);
}; // export const addElement = (a, e) => {
//     return a.push(e);
// }
// export const replaceElement = (a, e, n) => {
//     if (a.includes(e)) {
//         a[a.indexOf(e)] = n;
//     } else{
//         a.push(n);
//     }
// }
// /**
//  * Returns a array of unique values.
//  * @param {Array} a
//  * @return {Array} Set of unique values
//  */
// export const unique = (a) => {
//     return [...new Set(a)]
// }