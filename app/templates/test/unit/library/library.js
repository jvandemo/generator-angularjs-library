'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('<%= config.libraryName.orginal %>', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('<%= config.libraryName.camelized %>');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('<%= config.libraryName.camelized %>.config')).toBeTruthy();
    });

    <% if(config.includeModuleFilters) { %>
    it('should load filters module', function() {
        expect(hasModule('<%= config.libraryName.camelized %>.filters')).toBeTruthy();
    });
    <% } %>

    <% if(config.includeModuleDirectives) { %>
    it('should load directives module', function() {
        expect(hasModule('<%= config.libraryName.camelized %>.directives')).toBeTruthy();
    });
    <% } %>

    <% if(config.includeModuleServices) { %>
    it('should load services module', function() {
        expect(hasModule('<%= config.libraryName.camelized %>.services')).toBeTruthy();
    });
    <% } %>

});
