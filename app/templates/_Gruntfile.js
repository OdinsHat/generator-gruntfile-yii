module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        phplint: {
            all: ['protected/controllers/*.php', 'protected/models/*.php', 'protected/components/*.php', 'protected/config/*.php'],
            models: ['protected/config/*.php'],
            components: ['protected/components/*.php'],
            controllers: ['protected/controllers/*.php'],
            models: ['protected/models/*.php'],
        },
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
        },
        <% } %>
        <% if (phpCpd) { %>
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
        },
        <% } %>
        <% if (phpMd) { %>
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
        },
        <% } %>
        <% if (phpCsFixer) { %>
        phpcsfixer: {
            components: {
                dir: 'protected/components'
            },
            controllers: {
                dir: 'protected/controllers'
            },
            models: {
                dir: 'protected/models'
            }
        }
        <% } %>
    });

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-phplint');
    <% if (phpCs) { %>
    grunt.loadNpmTasks('grunt-phpcs');<% } %>
    <% if (phpMd) { %>
    grunt.loadNpmTasks('grunt-phpmd');<% } %>
    <% if (phpCsFixer) { %>
    grunt.loadNpmTasks('grunt-php-cs-fixer');<% } %>
    <% if (phpCpd) { %>
    grunt.loadNpmTasks('grunt-phpcpd');<% } %>

    grunt.registerTask('default', ['phplint:all']);
    grunt.registerTask('full', ['phplint', 'phpmd:components', 'phpcs']);
    grunt.registerTask('models', ['phplint:models', 'phpmd:models', 'phpcs:models']);
    grunt.registerTask('controllers', ['phplint:controllers', 'phpmd:controllers', 'phpcs:controllers']);
    grunt.registerTask('cleanup', ['phpcsfixer:controllers', 'phpcsfixer:models', 'phpcsfixer:components']);
    grunt.registerTask('server', ['php']);
};