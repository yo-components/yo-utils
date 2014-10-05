'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var appUtils = require('./app');

module.exports = {
  Base: yeoman.generators.Base.extend({
    constructor: function() {
      yeoman.generators.Base.apply(this, arguments);
      setUtilInstanceMethods.apply(this, arguments);
    }
  }),

  NamedBase: yeoman.generators.NamedBase.extend({
    constructor: function() {
      yeoman.generators.NamedBase.apply(this, arguments);
      setUtilInstanceMethods.apply(this, arguments);
    }
  })
};

function setUtilInstanceMethods() {
  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }
  this.appname = this._.slugify(this._.humanize(this.appname));
  this.scriptAppName = this._.camelize(this.appname) + appUtils.nameSuffix(this);

  this.cameledName = this._.camelize(this.name);
  this.classedName = this._.classify(this.name);

  this.filters = this.config.get('filters');
  this.sourceRoot(path.join(__dirname, '/templates'));
}
