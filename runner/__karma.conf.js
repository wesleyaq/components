module.exports = function(config) {
    config.set({
 
        // base path, that will be used to resolve files and exclude
        basePath: '../test/',
 
        // frameworks to use
        frameworks: ['jasmine'],
 
        // list of files / patterns to load in the browser
        files: [
            '../source/js/*.js' //'../source/test/*.js'
        ],
 
        // list of files to exclude
        exclude: [
        ],
 
        // test results reporter to use
       // reporters: ['progress', 'hy-reporter'], // reporters: ['progress', 'html'],
       //reporters: ['hy-html'],
        // web server port

        reporters: ['hy-html', 'html'],

        htmlAngularReport:{
          outputFile:'test.html',
          reportFolder:'tests_t1',
          reportTitle:'title of report'
        },

        port: 9876,
 
        // enable / disable colors in the output (reporters and logs)
        colors: true,
 
        // level of logging
        logLevel: config.LOG_INFO,
 
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
 
        // Start these browsers
        browsers: ['Chrome'],
        
        //Ejemplo de instalacion npm install karma-chrome-launcher --save-dev -save
        plugins : [
          //'karma-junit-reporter',
          'karma-chrome-launcher'
          //'karma-firefox-launcher',
          //'karma-opera-launcher',
          //'karma-ie-launcher',
          //'karma-jasmine'
        ],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
 
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        
        htmlReporter: {
          outputFile: '../test/test_t2/units.html',

          // Optional
          pageTitle: 'Unit Tests',
          subPageTitle: 'A sample project description'
        }
    });
};