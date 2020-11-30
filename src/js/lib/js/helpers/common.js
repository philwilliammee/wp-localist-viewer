/**
 * Removes an element from an array.
 * @param {Array} a The haystack
 * @param {String} e The needle to remove
 * @return {Array} a new array
 */
export const removeElement = (a, e) => {
  return a.filter((v) => v !== e);
};

/**
 * Adds a unique element to an array.
 * @param {Array} a
 * @param {string} e
 */
export const addUniqueElement = (a, e) => {
  if (!a.includes(e)) {
    a.push(e);
  }
};

/**
 * Adds a unique object to an array.
 * @param {Array} a
 * @param {object} o
 */
export const addUniqueObj = (a, o) => {
  if (!("id" in o)) {
    console.warn("element id required");
    return;
  }
  if (!a.find((object) => object.id === o.id)) {
    a.push(o);
  }
};

/**
 * Test to see if element should be displayed
 * @param {mixed} v string or integer.
 * @return {boolean}
 */
export const isHidden = (v) => {
  return v === "true" || v === 1;
};

export const isNested = (obj, ...args) => {
  return args.reduce((obj, level) => obj && obj[level], obj);
};

// export const addElement = (a, e) => {
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
