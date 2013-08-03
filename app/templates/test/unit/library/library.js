'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('<%= libraryName %>', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('<%= libraryName %>');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('<%= libraryName %>.config')).toBeTruthy();
    });

    <% if(includeModuleFilters) { %>
    it('should load filters module', function() {
        expect(hasModule('<%= libraryName %>.filters')).toBeTruthy();
    });
    <% } %>

    <% if(includeModuleDirectives) { %>
    it('should load directives module', function() {
        expect(hasModule('<%= libraryName %>.directives')).toBeTruthy();
    });
    <% } %>

    <% if(includeModuleServices) { %>
    it('should load services module', function() {
        expect(hasModule('<%= libraryName %>.services')).toBeTruthy();
    });
    <% } %>

});
