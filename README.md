# AngularJS component library generator

[Yeoman](http://yeoman.io) generator to create standalone AngularJS component libraries in seconds!

![Overview](http://i.imgur.com/KR6fT67.png)

## In short

If you want to create a standalone library with filters, directives, services, etc for use in your AngularJS applications, then this generator may just be what you need.

The generator automatically:

- creates a complete directory structure with boilerplate code for your [AngularJS](https://angularjs.org/) library
- creates a complete directory structure for your tests
- configures [Gulp](http://gulpjs.com/) to build your code and automate testing
- sets up [Karma](http://karma-runner.github.io) to run your unit tests using [Mocha](http://visionmedia.github.io/mocha/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/)

> This generator is **NOT** made to generate complete AngularJS applications. If you want to generate a complete AngularJS web application with routes, views, etc then please use [generator-angular](https://github.com/yeoman/generator-angular).

## Quick start

Make sure you have [yeoman](http://yeoman.io) installed:

```sh
$ npm install -g yo
```

Install the generator:

```sh
$ npm install -g generator-angularjs-library
```

Create a new project directory:

```sh
$ mkdir project
$ cd project
```

Run:

```sh
$ yo angularjs-library
```

Answer the questions and the generator will create the boilerplate for your library:

![AngularJS library generator](http://i.imgur.com/R4upcwp.png)

## What the generator does for you

The generator automatically:

- creates a `src` directory structure with the boilerplate code for your AngularJS library
- creates a `test` directory structure to store your unit tests and e2e tests
- creates initial unit tests in the `test/unit/` directory
- creates a custom `gulpfile.js` to build, minify and uglify your library
- creates a custom `karma-src.conf.js` to let karma run your unit tests
- creates a custom `karma-dist-concatenated.conf.js` to let karma run your unit tests
- creates a custom `karma-dist-minified.conf.js` to let karma run your unit tests
- creates a custom `bower.json` file for your library
- creates a custom `package.json` file for your library
- creates a custom `README.md` file for your library
- creates a custom `LICENSE` file for your library

Running the generator using library name "Your Library" will result in the following files being generated for you:

```sh
.
├── LICENSE                                     # License file with your name in it
├── README.md                                   # Basic README.md file with title of library
├── bower.json                                  # Bower configuration for your library
├── dist
│   ├── your-library.js                         # Your library ready to use in your application
│   └── your-library.min.js                     # Minified version of your library for production
├── gulpfile.js                                 # Gulp configuration to build your library
├── karma-dist-concatenated.conf.js             # Karma configuration to run unit tests using your-library.js
├── karma-dist-minified.conf.js                 # Karma configuration to run unit tests using your-library.min.js
├── karma-src.conf.js                           # Karma configuration to run unit tests using src/**/*.js
├── package.json                                # Npm configuration for your library
├── src                                         # Source directory with modular structure
│   └── yourLibrary
│       ├── directives
│       ├── filters
│       ├── services
│       ├── yourLibrary.js
│       ├── yourLibrary.prefix
│       └── yourLibrary.suffix
└── test                                        # Test directory with modulare structure
    ├── e2e
    │   └── yourLibrary
    └── unit
        └── yourLibrary
            ├── directives
            ├── filters
            ├── services
            └── yourLibrarySpec.js

14 directories, 14 files
```

## How to use the generated boilerplate

The basic library structure is automatically created for you in the `src` folder.

You can edit the existing files or add additional files in the `src` folder to add components to your library.

Once you have added files in the `src` directory, you can update the files in the `dist` directory using:

```sh
$ gulp
```

First gulp will run all unit tests using the code in your `src` directory to make sure the code is fine.

Then all files in the `src` directory will be concatenated into 2 files in the `dist` directory:

- `<yourLibraryName>.js`: regular version of your library to use in a development environment
- `<yourLibraryName>.min.js`: minified version of your library to use in a production environment

![AngularJS library generator](http://i.imgur.com/v958Eml.png)

## Manually testing your code

The generator creates 3 configurations for unit testing:

- `karma-src.conf.js`: run unit tests using `src/**/*.js`
- `karma-dist-concatenated.conf.js`: run unit tests using `dist/<yourLibraryName>.js`
- `karma-dist-minified.conf.js`: run unit tests using `dist/<yourLibraryName>.min.js`

By default, `gulp` will run `karma-src.conf.js`, but you can use the following preconfigured Gulp tasks to specify the suite you want to run:

```sh
# Run unit tests using src/**/*.js
$ gulp test-src

# Run unit tests using dist/<yourLibraryName>.js
$ gulp test-dist-concatenated

# Run unit tests using dist/<yourLibraryName>.min.js
$ gulp test-dist-minified
```

![AngularJS library generator](http://i.imgur.com/FL7exkv.png)

This allows you to unit test the different builds of your code to ensure they all work as expected.

## Frequently asked questions

- [Why is there a `.prefix` and a `.suffix` file and why do they do?](https://github.com/jvandemo/generator-angularjs-library/issues/2)

## Want to contribute?

Help make this project better - fork and send a PR or create an (issue)[https://github.com/jvandemo/generator-angularjs-library/issues].

## Change log

### v2.0.0

- Completely rewritten to support newer version of Yeoman
- Now uses Gulp instead of Grunt as task runner
- Now uses Mocha as test framework instead of Jasmine

### v1.4.0

- Update bower and npm package versions

### v1.3.0

- Added automatic creation of README.md
- Added automatic creation of LICENSE.txt
- Added support for author name and email

### v1.2.1

- Removed obsolete dependencies

### v1.2.0

- Added support for PhantomJS in Karma configuration
- Fixed bower directory in gitignore

### v1.1.0

- Added support for library names with spaces and capitals

### v1.0.3

- Added chalk dependency

## License

MIT
