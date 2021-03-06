/**
 *
 * @summary is-all-digits
 * @version 3.0.0
 * @since 1.0.0
 * @author Arian Khosravi <arian.khosravi@aofl.com>
 * @author Isaac Yoon <isaac.yoon@aofl.com>
 */

/**
 * @memberof module:@aofl/form-validate
 * @private
 * @readonly
 * @type {RegExp}
 */
const allDigitRegex = /^[0-9]+$/;

/**
 * Checks to see if a given value is all digits or not.
 *
 * @memberof module:@aofl/form-validate
 *
 * @param {String} value
 *
 * @return {boolean}
 */
const isAllDigits = (value) => {
  return Boolean(value && allDigitRegex.test(String(value)));
};

export {
  isAllDigits
};
