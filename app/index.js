'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AngularjsLibraryGenerator = module.exports = function AngularjsLibraryGenerator(args, options, config) {
        yeoman.generators.Base.apply(this, arguments);

        // Try to determine the name
        this.argument('appname', { type: String, required: false });
        this.appname = this.appname || path.basename(process.cwd());


        this.on('end', function () {
            this.installDependencies({ skipInstall: options['skip-install'] });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    }
    ;

util.inherits(AngularjsLibraryGenerator, yeoman.generators.Base);

AngularjsLibraryGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'libraryName',
            message: 'What do you want to call your library?',
            default: this.appname
        },
        {
            type: 'confirm',
            name: 'includeModuleDirectives',
            message: 'Would you like to include a directives module?',
            default: true
        },
        {
            type: 'confirm',
            name: 'includeModuleFilters',
            message: 'Would you like to include a filters module?',
            default: true
        },
        {
            type: 'confirm',
            name: 'includeModuleServices',
            message: 'Would you like to include a services module?',
            default: true
        },
        {
            type: 'confirm',
            name: 'includeAngularModuleResource',
            message: 'Would you like to include the angular-resource module?',
            default: true
        },
        {
            type: 'confirm',
            name: 'includeAngularModuleCookies',
            message: 'Would you like to include the angular-cookies module?',
            default: true
        },
        {
            type: 'confirm',
            name: 'includeAngularModuleSanitize',
            message: 'Would you like to include the angular-sanitize module?',
            default: true
        }
    ];

    this.prompt(prompts, function (props) {

        this.config = {

            // Originally a humanized string like "Project Angular_Library"
            libraryName: {

                // String originally entered by user => "Project Angular_Library"
                original: props.libraryName,

                // Camelized => porjectAngularLibrary
                camelized: this._.camelize(props.libraryName),

                // Dasherized (underscored and camelized to dashes) => project-angular-library
                dasherized: this._.dasherize(props.libraryName),

                // Slugified (whitespace and special chars replaced by dashes (great for url's)) => project-angular-library
                slugified: this._.slugify(props.libraryName),

                // Array of parts => [ 'project', 'angular', 'library' ]
                parts: this._.slugify(props.libraryName).split('-')
            },
            includeModuleDirectives : props.includeModuleDirectives,
            includeModuleFilters : props.includeModuleFilters,
            includeModuleServices : props.includeModuleServices,
            includeAngularModuleResource : props.includeAngularModuleResource,
            includeAngularModuleCookies : props.includeAngularModuleCookies,
            includeAngularModuleSanitize : props.includeAngularModuleSanitize
        };

        this.config.librarySrcDirectory = 'src' + '/' + this.config.libraryName.camelized;
        this.config.libraryUnitTestDirectory = 'test' + '/unit/' + this.config.libraryName.camelized;
        this.config.libraryUnitE2eDirectory = 'test' + '/e2e/' + this.config.libraryName.camelized;



        /*
        // Originally a humanized string like "ClientOne Two_Three"
        this.libraryName = {

            // String originally entered by user => "ClientOne Two_Three"
            original: props.name,

            // Camelized => clientOneTwoThree
            camelized: this._.camelize(props.name),

            // Dasherized (underscored and camelized to dashes) => client-one-two-three
            dasherized: this._.dasherize(props.name),

            // Slugified (whitespace and special chars replaced by dashes (great for url's)) => clientone-two-three
            slugified: this._.slugify(props.name),

            // Array of parts => [ 'clientone', 'two', 'three' ]
            parts: this._.slugify(props.name).split('-')
        },
        this.includeModuleDirectives = props.includeModuleDirectives;
        this.includeModuleFilters = props.includeModuleFilters;
        this.includeModuleServices = props.includeModuleServices;
        this.includeAngularModuleResource = props.includeAngularModuleResource;
        this.includeAngularModuleCookies = props.includeAngularModuleCookies;
        this.includeAngularModuleSanitize = props.includeAngularModuleSanitize;
        */


        cb();
    }.bind(this));
};

/**
 * Create library files
 */
AngularjsLibraryGenerator.prototype.createLibraryFiles = function createLibraryFiles() {

    this.mkdir('src');
    this.mkdir('test');

    /*
    var librarySrcDirectory = this.librarySrcDirectory = 'src' + '/' + this.libraryName.camelized;
    var libraryUnitTestDirectory = this.librarySrcDirectory = 'test' + '/unit/' + this.libraryName.camelized;
    var libraryUnitE2eDirectory = this.librarySrcDirectory = 'test' + '/e2e/' + this.libraryName.camelized;
*/

    this.mkdir(this.config.librarySrcDirectory);
    this.mkdir(this.config.libraryUnitTestDirectory);
    this.mkdir(this.config.libraryUnitE2eDirectory);

    if (this.config.includeModuleDirectives) {
        this.mkdir(this.config.librarySrcDirectory + '/directives');
        this.mkdir(this.config.libraryUnitTestDirectory + '/directives');
    }

    if (this.config.includeModuleFilters) {
        this.mkdir(this.config.librarySrcDirectory + '/filters');
        this.mkdir(this.config.libraryUnitTestDirectory + '/filters');
    }

    if (this.config.includeModuleServices) {
        this.mkdir(this.config.librarySrcDirectory + '/services');
        this.mkdir(this.config.libraryUnitTestDirectory + '/services');
    }

    this.template('src/library/library.js', this.config.librarySrcDirectory + '/' + this.config.libraryName.camelized + '.js', {config: this.config});
    this.template('src/library/library.prefix', this.config.librarySrcDirectory + '/' + this.config.libraryName.camelized + '.prefix', {config: this.config});
    this.template('src/library/library.suffix', this.config.librarySrcDirectory + '/' + this.config.libraryName.camelized + '.suffix', {config: this.config});

    this.template('test/unit/library/library.js', this.config.libraryUnitTestDirectory + '/' + this.config.libraryName.camelized + '.js', {config: this.config});

};

/**
 * Create Grunt configuration
 */
AngularjsLibraryGenerator.prototype.createGruntfile = function createGruntfile() {
    this.template('Gruntfile.js', './Gruntfile.js', {config: this.config});
};

/**
 * Create Package Json
 */
AngularjsLibraryGenerator.prototype.createPackageJson = function createPackageJson() {
    this.template('_package.json', './package.json', {config: this.config});
};

/**
 * Create Bower files
 */
AngularjsLibraryGenerator.prototype.createBowerFiles = function createBowerFiles() {
    this.template('_bower.json', './bower.json', {config: this.config});
    this.copy('bowerrc', '.bowerrc');
};

/**
 * Create Karma unit test configuration
 */
AngularjsLibraryGenerator.prototype.createKarmaConfig = function createKarmaConfig() {
    this.template('karma-unit.conf.js', 'karma-unit.conf.js', {config: this.config});
};

AngularjsLibraryGenerator.prototype.createProjectFiles = function createProjectFiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
};

