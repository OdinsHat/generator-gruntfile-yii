# Gruntfile for Yii Generator [![Build Status](https://secure.travis-ci.org/OdinsHat/generator-gruntfile-yii.png?branch=master)](https://travis-ci.org/OdinsHat/generator-gruntfile-yii)

> [Yeoman](http://yeoman.io) generator or creating a package.json and Gruntfile.js with relevant tools and questions for a Yii project.

The generator is based on [Addy Osmani's](https://github.com/addyosmani) great [gruntfile Generator](https://github.com/yeoman/generator-gruntfile) as well as using the ```yo generator``` scaffold.

I adapted my own Yii Gruntfile which carries out tasks such as PHP static analysis,
CSS linting and JS linting specific to the layout of a Yii project.

**This is my first generator - please report any bugs or issues you find**

## Prerequisites

* [PHP](http://www.php.net/)
* [NodeJS](http://nodejs.org/)
* [Yeoman (Yo)](http://yeoman.io/)

Depending on your answers in the generator you may need the following:
* [PHP Code Sniffer](http://pear.php.net/package/PHP_CodeSniffer/)
* [PHP Mess Detector](http://phpmd.org/)
* [PHP Copy/Paste Detector](https://github.com/sebastianbergmann/phpcpd)
* [PHP CS Fixer](https://github.com/fabpot/PHP-CS-Fixer)
* To run the ```grunt php``` server task you'd need PHP >=5.4 but its not compulsory.

## Installation

```npm install generator-gruntfile-yii```

### Usage

In your Yii root folder (the one containing index.php and ```protected``` folder) run this command:

```yo gruntfile-yii```

You'll be asked a series of questions to help setup your Gruntfile and package.json before it goes and creates it for you.