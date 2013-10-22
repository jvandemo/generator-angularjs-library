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
        this.libraryName = props.libraryName;
        this.includeModuleDirectives = props.includeModuleDirectives;
        this.includeModuleFilters = props.includeModuleFilters;
        this.includeModuleServices = props.includeModuleServices;
        this.includeAngularModuleResource = props.includeAngularModuleResource;
        this.includeAngularModuleCookies = props.includeAngularModuleCookies;
        this.includeAngularModuleSanitize = props.includeAngularModuleSanitize;
        cb();
    }.bind(this));
};

AngularjsLibraryGenerator.prototype.library = function library() {

    this.mkdir('src');
    this.mkdir('test');

    var librarySrcDirectory = this.librarySrcDirectory = 'src' + '/' + this.libraryName;
    var libraryUnitTestDirectory = this.librarySrcDirectory = 'test' + '/unit/' + this.libraryName;
    var libraryUnitE2eDirectory = this.librarySrcDirectory = 'test' + '/e2e/' + this.libraryName;

    this.mkdir(librarySrcDirectory);
    this.mkdir(libraryUnitTestDirectory);
    this.mkdir(libraryUnitE2eDirectory);

    if (this.includeModuleDirectives) {
        this.mkdir(librarySrcDirectory + '/directives');
        this.mkdir(libraryUnitTestDirectory + '/directives');
    }

    if (this.includeModuleFilters) {
        this.mkdir(librarySrcDirectory + '/filters');
        this.mkdir(libraryUnitTestDirectory + '/filters');
    }

    if (this.includeModuleServices) {
        this.mkdir(librarySrcDirectory + '/services');
        this.mkdir(libraryUnitTestDirectory + '/services');
    }

    this.template('src/library/library.js', librarySrcDirectory + '/' + this.libraryName + '.js');
    this.template('src/library/library.prefix', librarySrcDirectory + '/' + this.libraryName + '.prefix');
    this.template('src/library/library.suffix', librarySrcDirectory + '/' + this.libraryName + '.suffix');

    this.template('test/unit/library/library.js', libraryUnitTestDirectory + '/' + this.libraryName + '.js');

    this.template('Gruntfile.js', 'Gruntfile.js');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
};

AngularjsLibraryGenerator.prototype.karma = function karma() {
    this.template('karma-unit.conf.js', 'karma-unit.conf.js');
};

AngularjsLibraryGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

