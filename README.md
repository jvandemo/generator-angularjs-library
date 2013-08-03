# Generator-angularjs-library

A generator for Yeoman to generate the boilerplate for creating an AngularJS library that can be used in any AngularJS app.

## Getting started

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-angularjs-library`
- Run: `yo angularjs-library`
- Answer the questions and the generator will create the boilerplate for your library

## What the generator does for you

The generator:

- creates a `src` directory with the boilerplate code for your AngularJS library
- creates a `test` directory structure to store your unit tests and e2e tests
- creates a sample unit test in the `test/unit/` directory
- creates a custom `Gruntfile.js` to build, minify and uglify your library
- creates a custom `karma-unit.conf.js` to let karma run your unit tests
- creates a custom `bower.json` file for your library
- creates a custom `package.json`file for your library

Here's an overview of the files that are automatically generated for you:

    .
    | Gruntfile.js (custom Gruntfile.js to build your library for distribution)
    | bower.json (custom bower.json file)
    | components (bower dependencies)
    | dist
    |---- yourLibraryName.js (optionally built by Grunt)
    |---- yourLibraryName.min.js (optionally built by Grunt)
    | karma-unit.conf.js (custom karma configuration for unit testing)
    | node_modules (node dependencies)
    | package.json (custom package.json file)
    | src
    |---- yourLibraryName
    |     |---- directives (optional)
    |     |---- filters (optional)
    |     |---- yourLibraryName.js (boilerplate for your AngularJS library)
    |     |---- yourLibraryName.prefix
    |     |---- yourLibraryName.suffix
    |     |---- services (optional)
    | test
    |---- e2e
    |     |---- yourLibraryName
    |---- unit
    |     |---- yourLibraryName
    |     |     |---- yourLibraryName.js


## What's left for you

- Add code to your library
- Build your library
- Test your code

## How to add code to your library

The basic library structure will be created automatically for you in the `src` folder.

You can edit the existing files or add additional files in the `src` folder to add functionality to your library.

## How to build your library

Run: `grunt`

All files in the `src` directory will be jshinted and 2 files will be generated in the `dist` directory:

- `<yourLibraryName>.js`: regular version of your library to use in development
- `<yourLibraryName>.min.js`: minified and uglified version of your library to use in production

## How to test your code

There are two directory structures for storing tests:

- Unit tests are stored in `test/unit/`
- E2E tests are stored in `test/e2e/`

To run your unit tests: `karma start ./karma-unit.conf.js`

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
