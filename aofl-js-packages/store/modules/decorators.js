/**
 * @summary decorators
 * @version 3.0.0
 * @since 3.0.0
 * @author Arian Khosravi<arian.khosravi@aofl.com>
 */
/**
 * v2 decorator adds observed properties to an Sdo's instance to support memoized
 * getters.
 *
 * @memberof module:@aofl/store
 *
 * @param {String[]} args
 * @return {Object}
 */
function observe(...args) {
  return (descriptor, name) => {
    if (args.length > 0) {
      descriptor.finisher = (clazz) => {
        if (typeof clazz.prototype.observedProperties === 'undefined') {
          clazz.prototype.observedProperties = {};
        }

        clazz.prototype.observedProperties[descriptor.key] = {
          keys: args,
          values: args,
          value: ''
        };
      };
    }

    return descriptor;
  };
}

export {
  observe
};
