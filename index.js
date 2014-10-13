'use strict';

/**
 * An opinionated set of utilities
 * @type {Object}
 * @module yo-utils
 */

module.exports = {
  /**
   * App related utilities
   * @see module:yo-utils/lib/app
   */
  app: require('./lib/app'),

  /**
   * @description Extended yeoman-generator
   *              [Base]{@link http://yeoman.github.io/generator/Base.html}
   * @see module:yo-utils/lib/base.Base
   */
  Base: require('./lib/base').Base,

  /**
   * @description Extended yeoman-generator
   *              [NamedBase]{@link http://yeoman.github.io/generator/NamedBase.html}
   * @see module:yo-utils/lib/base.NamedBase
   */
  NamedBase: require('./lib/base').NamedBase,

  /**
   * Templating utilities
   * @see module:yo-utils/lib/templating
   */
  templating: require('./lib/templating')
};
