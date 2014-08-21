// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('<%= config.libraryName.camelized %>.config', [])
    .value('<%= config.libraryName.camelized %>.config', {
        debug: true
    });

// Modules<% if (config.includeModuleDirectives){ %>
angular.module('<%= config.libraryName.camelized %>.directives', []);<% } %><% if (config.includeModuleFilters){ %>
angular.module('<%= config.libraryName.camelized %>.filters', []);<% } %><% if (config.includeModuleServices){ %>
angular.module('<%= config.libraryName.camelized %>.services', []);<% } %>
angular.module('<%= config.libraryName.camelized %>',
    [
        '<%= config.libraryName.camelized %>.config'<% if (config.includeModuleDirectives){ %>,
        '<%= config.libraryName.camelized %>.directives'<% } %><% if (config.includeModuleFilters){ %>,
        '<%= config.libraryName.camelized %>.filters'<% } %><% if (config.includeModuleServices){ %>,
        '<%= config.libraryName.camelized %>.services'<% } %><% if (config.includeAngularModuleResource){ %>,
        'ngResource'<% } %><% if (config.includeAngularModuleCookies){ %>,
        'ngCookies'<% } %><% if (config.includeAngularModuleSanitize){ %>,
        'ngSanitize'<% } %>
    ]);
