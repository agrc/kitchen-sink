/* global JasmineFaviconReporter, jasmineRequire */
window.dojoConfig = {
    baseUrl: './',
    packages: [
        {
            name: 'map-tools',
            location: '.'
        }, {
            name: 'dojo',
            location: 'bower_components/dojo'
        }, {
            name: 'dojox',
            location: 'bower_components/dojox'
        }, {
            name: 'dijit',
            location: 'bower_components/dijit'
        }, {
            name: 'dijit',
            location: 'bower_components/dijit'
        }, {
            name: 'esri',
            location: 'bower_components/esri'
        }
    ]
};

// for jasmine-favicon-reporter
jasmine.getEnv().addReporter(new JasmineFaviconReporter());
jasmine.getEnv().addReporter(new jasmineRequire.JSReporter2());
