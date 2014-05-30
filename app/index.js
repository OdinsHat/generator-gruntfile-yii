'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var GruntfileYiiGenerator = yeoman.generators.Base.extend({
  init: function () {
    if (this.dest.exists('package.json')) {
      this.packageJSON = this.dest.readJSON('package.json');
      this.appname = this.packageJSON.name || this.appname;
      this.version = this.packageJSON.version || this.version;
      this.hasJshint = this.packageJSON.hasOwnProperty('jshintConfig') || this.dest.exists('.jshintrc');
    } else {
      this.hasJshint = this.dest.exists('.jshintrc');
    }

    this.on('end', function () {
      this.installDependencies();
    });
  },

  askForPhpTools: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('This will generate a Gruntfile.js and package.json for your Yii project'));

    var prompts = [{
      type: 'checkbox',
      name: 'phpTools',
      message: 'Which PHP analysis tools do you want included/have available?',
      choices: [{
        name: 'PHP Code Sniffer (phpcs)',
        value: 'phpCs',
        checked: true
      }, {
        name: 'PHP Mess Detector (phpmd)',
        value: 'phpMd',
        checked: false
      }, {
        name: 'PHP Copy/Paste Detector (phpcpd)',
        value: 'phpCpd',
        checked: false
      }, {
        name: 'PHP CS Fixer',
        value: 'phpCsFixer',
        checked: false
      }]
    }];

    this.prompt(prompts, function (props) {
      function hasPhpTool(feat) {
        return props.phpTools.indexOf(feat) !== -1;
      }

      this.phpCs = hasPhpTool('phpCs');
      this.phpMd = hasPhpTool('phpMd');
      this.phpCpd = hasPhpTool('phpCpd');
      this.phpCsFixer = hasPhpTool('phpCsFixer');
      this.jsLint = false;

      done();
    }.bind(this));
  },

  writing: function () {
    this.template('_package.json', 'package.json');
    this.template('_Gruntfile.js', 'Gruntfile.js');
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  }
});

module.exports = GruntfileYiiGenerator;