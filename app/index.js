'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var AngularjsLibraryGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    // Try to determine the name
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
  },

  prompting: function () {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the AngularJS library generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'authorName',
        message: chalk.yellow('\n\n********************************************************************************\n' + 'Before we get started, let me verify your personal details:\n********************************************************************************\n') + '\n' +
          'Don\'t worry, I wont stalk you, send you spam or look you up on the internet.' + '\n\n' +
          'I only use your personal details to automatically populate the author fields in\n' +
          'bower.json, package.json and to mention you as the owner in the LICENSE.txt file.' + '\n\n' +
          'Your full name:',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter your full name';
        },
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email address:',
        validate: function (input) {
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            return true;
          }
          return 'Please enter a valid email address';
        },
        default: this.user.git.email
      },
      {
        type: 'input',
        name: 'libraryName',
        message: chalk.yellow('\n\n********************************************************************************\n' + 'Awesome, so how would you like to call your AngularJS library:\n********************************************************************************\n') + '\n' +
          'You can use spaces and capitals and use a name like "Your Library".' + '\n\n' +
          'The full library name is used in documentation: "Your Library".' + '\n\n' +
          'The name is automatically camelized as module name in AngularJS: "yourLibrary"\n' +
          'and slugified for file and package names e.g. "your-library.js":\n\n' +
          'Library name:',
        validate: function (input) {
          if (/.+/.test(input)) {
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

      this.props = {

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
        includeModuleDirectives: props.includeModuleDirectives,
        includeModuleFilters: props.includeModuleFilters,
        includeModuleServices: props.includeModuleServices,
        includeAngularModuleResource: props.includeAngularModuleResource,
        includeAngularModuleCookies: props.includeAngularModuleCookies,
        includeAngularModuleSanitize: props.includeAngularModuleSanitize
      };

      this.props.librarySrcDirectory = 'src' + '/' + this.props.libraryName.dasherized;
      this.props.libraryUnitTestDirectory = 'test' + '/unit/' + this.props.libraryName.dasherized;
      this.props.libraryUnitE2eDirectory = 'test' + '/e2e/' + this.props.libraryName.dasherized;

      this.config.set('props', this.props);

      done();
    }.bind(this));
  },

  writing: {
    /*
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/templates');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }*/

    /**
     * Create library files
     */
    createLibraryFiles: function createLibraryFiles() {

      this.mkdir('src');
      this.mkdir('test');

      this.mkdir(this.props.librarySrcDirectory);
      this.mkdir(this.props.libraryUnitTestDirectory);
      this.mkdir(this.props.libraryUnitE2eDirectory);

      if (this.props.includeModuleDirectives) {
        this.mkdir(this.props.librarySrcDirectory + '/directives');
        this.mkdir(this.props.libraryUnitTestDirectory + '/directives');
      }

      if (this.props.includeModuleFilters) {
        this.mkdir(this.props.librarySrcDirectory + '/filters');
        this.mkdir(this.props.libraryUnitTestDirectory + '/filters');
      }

      if (this.props.includeModuleServices) {
        this.mkdir(this.props.librarySrcDirectory + '/services');
        this.mkdir(this.props.libraryUnitTestDirectory + '/services');
      }

      this.template('src/library/library.module.js', this.props.librarySrcDirectory + '/' + this.props.libraryName.camelized + '.module.js', {config: this.props});

      this.template('test/unit/library/librarySpec.js', this.props.libraryUnitTestDirectory + '/' + this.props.libraryName.camelized + 'Spec.js', {config: this.props});

    },

    /**
     * Create Gulp configuration
     */
    createGulpfile: function createGulpfile() {
      this.template('gulpfile.js', './gulpfile.js', {config: this.props});
    },

    /**
     * Create Package Json
     */
    createPackageJson: function createPackageJson() {
      this.template('_package.json', './package.json', {config: this.props});
    },

    /**
     * Create Bower files
     */
    createBowerFiles: function createBowerFiles() {
      this.template('_bower.json', './bower.json', {config: this.props});
      this.copy('bowerrc', '.bowerrc');
    },

    /**
     * Create Karma unit test configuration
     */
    createKarmaSrcConfig: function createKarmaConfig() {
      this.template('karma-src.conf.js', 'karma-src.conf.js', {config: this.props});
    },

    /**
     * Create Karma unit test configuration
     */
    createKarmaDistConcatenatedConfig: function createKarmaDistConcatenatedConfig() {
      this.template('karma-dist-concatenated.conf.js', 'karma-dist-concatenated.conf.js', {config: this.props});
    },

    /**
     * Create Karma unit test configuration
     */
    createKarmaDistMinifiedConfig: function createKarmaDistMinifiedConfig() {
      this.template('karma-dist-minified.conf.js', 'karma-dist-minified.conf.js', {config: this.props});
    },

    /**
     * Create README.md
     */
    createReadmeMd: function createReadmeMd() {
      this.template('README.md', 'README.md', {config: this.props});
    },

    /**
     * Create LICENSE.txt
     */
    createLicenseTxt: function createLicenseTxt() {
      this.template('LICENSE', 'LICENSE', {config: this.props});
    },

    createProjectFiles: function createProjectFiles() {
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
      this.copy('gitignore', '.gitignore');
      this.copy('travis.yml', '.travis.yml');
    }

},

  end: function () {
    this.installDependencies();
  }
});

module.exports = AngularjsLibraryGenerator;
