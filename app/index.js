'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk');


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
            type   : 'input',
            name   : 'authorName',
            message: chalk.yellow('\n\n********************************************************************************\n' + 'Before we get started, let me verify your personal details:\n********************************************************************************\n') + '\n' +
                'Don\'t worry, I wont stalk you, send you spam or look you up on the internet.' + '\n\n' +
                'I only use your personal details to automatically populate the author fields in\n' +
                'bower.json, package.json and to mention you as the owner in the LICENSE.txt file.' + '\n\n' +
                'Your full name:',
            validate: function(input){
                if(/.+/.test(input)){
                    return true;
                }
                return 'Please enter your full name';
            },
            default: this.user.git.username
        },
        {
            type   : 'input',
            name   : 'authorEmail',
            message: 'Your email address:',
            validate: function(input){
                if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)){
                    return true;
                }
                return 'Please enter a valid email address';
            },
            default: this.user.git.email
        },
        {
            type   : 'input',
            name   : 'libraryName',
            message: chalk.yellow('\n\n********************************************************************************\n' + 'Awesome, so how would you like to call your AngularJS library:\n********************************************************************************\n') + '\n' +
                'You can use spaces and capitals.' + '\n\n' +
                'The full library name is used in documentation e.g. "Your Library".' + '\n\n' +
                'It is automatically camelized as module name in AngularJS e.g. "yourLibrary"\n' +
                'and slugified for file and package names e.g. "your-library.js":\n\n' +
                'Library name:',
            validate: function(input){
                if(/.+/.test(input)){
                    return true;
                }
                return 'Please enter a library name';
            },
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

            author: {
                name: props.authorName,
                email: props.authorEmail
            },

            // Originally a humanized string like "Project Angular_Library"
            libraryName: {

                // String originally entered by user => "Project Angular_Library"
                original: props.libraryName,

                // Camelized => projectAngularLibrary
                camelized: this._.camelize(this._.underscored(props.libraryName)),

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

        cb();
    }.bind(this));
};

/**
 * Create library files
 */
AngularjsLibraryGenerator.prototype.createLibraryFiles = function createLibraryFiles() {

    this.mkdir('src');
    this.mkdir('test');

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

/**
 * Create README.md
 */
AngularjsLibraryGenerator.prototype.createReadmeMd = function createReadmeMd() {
    this.template('README.md', 'README.md', {config: this.config});
};

/**
 * Create LICENSE.txt
 */
AngularjsLibraryGenerator.prototype.createLicenseTxt = function createLicenseTxt() {
    this.template('LICENSE.txt', 'LICENSE.txt', {config: this.config});
};

AngularjsLibraryGenerator.prototype.createProjectFiles = function createProjectFiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
};

