const isEqual = require("lodash/isEqual");
const isObject = require("lodash/isObject");
const isArray = require("lodash/isArray");

function updatedDiff(obj1, obj2) {
  let updates = {};

  Object.keys(obj1).forEach((key) => {
    if (!obj1[key] && !obj2.hasOwnProperty(key)) {
      return null;
    } else if (!obj2 || !obj2.hasOwnProperty(key)) {
      updates[key] = null;
    } else if (obj2 && !isEqual(obj1[key], obj2[key])) {
      if (isObject(obj1[key]) && isObject(obj2[key]) && !isArray(obj1[key])) {
        updates[key] = updatedDiff(obj1[key], obj2[key]);
      } else {
        updates[key] = obj2[key];
      }
    }
  });

  Object.keys(obj2).forEach((key) => {
    if (!obj1[key] && obj2[key]) {
      updates[key] = obj2[key];
    }
  });

  return updates;
}

module.exports = updatedDiff;
