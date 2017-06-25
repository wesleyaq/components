module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../test/',

		frameworks: ['jasmine'],

		//reporters: ['spec'],

		browsers: [
			'Chrome'
		],
		files: [
			// 'libs/jquery-1.11.3.min.js',
			// '../test/test-holamundo.js',
			//'tests/**/*.js'
			'../dev/js/*.js'
		],
		// list of files to exclude
		exclude: [],

		reporters: ['hy-html', 'html'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,

		htmlReporter: {
			outputFile: '../resultTest/report.html',

			// Optional
			pageTitle: 'Unit Tests',
			subPageTitle: 'A sample project description'
		}

	});
};
