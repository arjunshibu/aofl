/**
 * @summary core
 * @version 3.0.0
 * @since 3.0.0
 * @author Arian Khosravi<arian.khosravi@aofl.com>
 */

/**
 * Abstracts away the recursion function of traversing an object's nested
 * properties by a given path.
 *
 * @memberof module:@aofl/object-utils
 *
 * @param {Object} obj
 * @param {String} path dot notation
 * @param {Function} op operation to perform as object is recursed by path.
 */
const recurseObjectByPath = (obj, path, op) => {
  const pathParts = path === ''? '': path.split('.');

  const recurse = (argPathParts, source) => {
    let key = '';
    let subPath = [];
    if (argPathParts.length) {
      key = argPathParts[0];
      subPath = argPathParts.slice(1);
    }
    if (isPrototypePolluted(key))
      return;
    return op(key, subPath, source, recurse);
  };

  return recurse(pathParts, obj);
};

/**
 * Blacklist certain keys to prevent Prototype Pollution
 * 
 * @memberof module:@aofl/object-utils
 * 
 * @param {String} key object key to check
 */
const isPrototypePolluted = (key) => /__proto__|constructor|prototype/.test(key);

export {
  recurseObjectByPath
};
