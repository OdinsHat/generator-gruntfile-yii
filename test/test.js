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
      this.app.options['skip-install'] = true;
      this.app.options['skip-install-message'] = true;
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['Gruntfile.js', 'package.json'];

    helpers.mockPrompt(this.app, {
      phpTools: [
        'phpCs',
        'phpMd',
        'phpCpd',
        'phpCsFixer'
      ]
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('./Gruntfile.js', /grunt\.loadNpmTasks\('grunt-php'\)/);
      helpers.assertFileContent('./package.json', /"grunt-php": "~0.3.3"/);
      done();
    });
  });

  it('package.json contain all PHPTools', function (done) {
    helpers.mockPrompt(this.app, {
      phpTools: [
        'phpCs',
        'phpMd',
        'phpCpd',
        'phpCsFixer'
      ]
    });

    this.app.run({}, function () {
      helpers.assertFileContent('./package.json', /"grunt-php": "~0.3.3"/);
      helpers.assertFileContent('./package.json', /"grunt-phpcs": "~0.2.2"/);
      helpers.assertFileContent('./package.json', /"grunt-phpmd": "~0.1.0"/);
      helpers.assertFileContent('./package.json', /"grunt-phpcpd": "~0.1.3"/);
      helpers.assertFileContent('./package.json', /"grunt-php-cs-fixer": "~0.0.5"/);
      done();
    });
  });

  it('package.json contains selected PHPTools', function (done) {
    helpers.mockPrompt(this.app, {
      phpTools: [
        'phpCs',
        'phpCpd',
      ]
    });

    this.app.run({}, function () {
      helpers.assertFileContent('./package.json', /"grunt-php": "~0.3.3"/);
      helpers.assertFileContent('./package.json', /"grunt-phpcs": "~0.2.2"/);
      helpers.assertNoFileContent('./package.json', /"grunt-phpmd": "~0.1.0"/);
      helpers.assertFileContent('./package.json', /"grunt-phpcpd": "~0.1.3"/);
      helpers.assertNoFileContent('./package.json', /"grunt-php-cs-fixer": "~0.0.5"/);
      done();
    });
  });

  it('Gruntfile.js contains selected PHPTools', function (done) {
    helpers.mockPrompt(this.app, {
      phpTools: [
        'phpCs',
        'phpCpd',
      ]
    });

    this.app.run({}, function () {
      helpers.assertFileContent('./Gruntfile.js', /grunt.registerTask\('default', \['phplint:all'\]\)/);
      helpers.assertFileContent('./Gruntfile.js', /grunt.loadNpmTasks\('grunt-phpcs'\)/);
      helpers.assertNoFileContent('./Gruntfile.js', /grunt.loadNpmTasks\('grunt-phpmd'\)/);
      helpers.assertNoFileContent('./Gruntfile.js', /grunt.loadNpmTasks\('grunt-php-cs-fixer'\)/);
      helpers.assertFileContent('./Gruntfile.js', /grunt.loadNpmTasks\('grunt-phpcpd'\)/);
      done();
    });
  });
});