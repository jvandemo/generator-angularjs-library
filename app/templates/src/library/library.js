// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('<%= libraryName %>.config', [])
    .value('<%= libraryName %>.config', {
        debug: true
    });

// Modules<% if (includeModuleDirectives){ %>
angular.module('<%= libraryName %>.directives', []);<% } %><% if (includeModuleFilters){ %>
angular.module('<%= libraryName %>.filters', []);<% } %><% if (includeModuleServices){ %>
angular.module('<%= libraryName %>.services', []);<% } %>
angular.module('<%= libraryName %>',
    [
        '<%= libraryName %>.config'<% if (includeModuleDirectives){ %>,
        '<%= libraryName %>.directives'<% } %><% if (includeModuleFilters){ %>,
        '<%= libraryName %>.filters'<% } %><% if (includeModuleServices){ %>,
        '<%= libraryName %>.services'<% } %>
    ]);
