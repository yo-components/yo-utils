'use strict';

module.exports = {
  nameSuffix: nameSuffix
};

/**
 * Return the properly cased app suffix according to options
 * @param  {Object} self - the generator
 * @return {String}      - the app's name
 */
function nameSuffix (self) {
  var counter = 0, suffix = self.options['app-suffix'];
  // Have to check this because of generator bug #386
  process.argv.forEach(function(val) {
    if (val.indexOf('--app-suffix') > -1) {
      counter++;
    }
  });
  if (counter === 0 || (typeof suffix === 'boolean' && suffix)) {
    suffix = 'App';
  }
  return suffix ? self._.classify(suffix) : '';
}