module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        <% if (phpCs) { %>
        phpcs: {
            components: {
                dir: ['protected/components/*.php']
            },
            controllers: {
                dir: ['protected/controllers/*.php']
            },
            models: {
                dir: ['protected/models/*.php']
            },
            options: {
                standard: 'Pear'
            }
        },<% } %><% if (phpCpd) { %>
        phpcpd: {
            components: {
                dir: 'protected'
            },
            controllers: {
                dir: 'protected/controllers'
            },
            models: {
                dir: 'protected/models'
            },
            options: {
                quiet:false
            }
        },<% } %><% if (phpMd) { %>
        phpmd: {
            components: {
                dir: 'protected/components'
            },
            controllers: {
                dir: 'protected/controllers'
            },
            models: {
                dir: 'protected/models'
            },
            options: {
                reportFormat: 'text',
                rulesets: 'codesize'
            }
        },<% } %><% if (phpCsFixer) { %>
        phpcsfixer: {
            options: {
                verbose: true,
                quiet:false
            },
            components: {
                dir: 'protected/components'
            },
            controllers: {
                dir: 'protected/controllers'
            },
            models: {
                dir: 'protected/models'
            }
        },<% } %><% if (jsHint) { %>
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            rootjs: {
                src: ['js/*.js']
            }
        },<% } %>
        phplint: {
            all: ['protected/controllers/*.php', 'protected/models/*.php', 'protected/components/*.php', 'protected/config/*.php'],
            configs: ['protected/config/*.php'],
            components: ['protected/components/*.php'],
            controllers: ['protected/controllers/*.php'],
            models: ['protected/models/*.php'],
        }
    });

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-phplint');<% if (phpCs) { %>
    grunt.loadNpmTasks('grunt-phpcs');<% } %><% if (phpMd) { %>
    grunt.loadNpmTasks('grunt-phpmd');<% } %><% if (phpCsFixer) { %>
    grunt.loadNpmTasks('grunt-php-cs-fixer');<% } %><% if (phpCpd) { %>
    grunt.loadNpmTasks('grunt-phpcpd');<% } %><% if (jsHint) { %>
    grunt.loadNpmTasks('grunt-contrib-jshint');<% } %>

    grunt.registerTask('default', ['phplint:all']);<% if (phpCsFixer) { %>
    grunt.registerTask('cleanup', ['phpcsfixer:controllers', 'phpcsfixer:models', 'phpcsfixer:components']);<% } %>
    grunt.registerTask('server', ['php']);
};
