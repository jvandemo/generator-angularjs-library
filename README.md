# AngularJS library generator

Create standalone AngularJS component libraries is seconds!

This generator is *NOT* made to generate complete AngularJS applications.

If you want to generate a complete AngularJS web application with routes, views, etc... then use [generator-angular](https://github.com/yeoman/generator-angular).

If you want to create a standalone library with filters, directives, services, etc for use in your AngularJS applications, then this generator is just what you need.

## Quick start

Make sure you have [yeoman](http://yeoman.io) installed:

```sh
npm install -g yo
```

Install the generator:

```sh
npm install -g generator-angularjs-library
```

Run:

```sh
yo angularjs-library
```

Answer the questions and the generator will create the boilerplate for your library.

## Output

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

## Frequently asked questions

- [Why is there a `.prefix` and a `.suffix` file and why do they do?](https://github.com/jvandemo/generator-angularjs-library/issues/2)

## Change log

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
