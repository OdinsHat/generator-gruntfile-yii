/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('gruntfile-yii generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('gruntfile-yii:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['Gruntfile.js', 'package.json'];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
-----------------
var file = require('yeoman-generator').file;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('gruntfile:app empty project', function () {
  var generator;

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        done(err);
      }
      generator = helpers.createGenerator('gruntfile:app', ['../../app']);
      generator.options['skip-install'] = true;
      generator.options['skip-install-message'] = true;
      done();
    });
  });

  it('creates expected files', function (done) {
    var expected = ['Gruntfile.js', 'package.json'];

    helpers.mockPrompt(generator, {
      phpTools: [
        'phpCs',
        'phpMd',
        'phpCpd',
        'phpCsFixer'
      ]
    });

    generator.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('./package.json', /"version": "0.0.0"/);
      done();
    });
  });
});