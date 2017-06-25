var gulp 				= require('gulp'),
		$ 					= require('gulp-load-plugins')(),
		connect 		= require('gulp-connect'),
		plumber 		= require('gulp-plumber'),
		findPort 		= require('find-port'),
		browserSync = require('browser-sync'),
		sourcemaps 	= require('gulp-sourcemaps'),
		sass 				= require('gulp-sass'),
		cleanCSS 		= require('gulp-clean-css'),
		pug 				= require('gulp-pug'),
		ts 					= require('gulp-typescript'),
		rename 			= require('gulp-rename'),
		imagemin 		= require('gulp-imagemin'),
		htmlmin 		= require('gulp-htmlmin'),
		// typedoc 		= require("gulp-typedoc"),
		Server 			= require('karma').Server,
		uglify 			= require('gulp-uglify');
		// jsdoc 			= require('gulp-jsdoc3'),

// Funciones Globales
function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 8; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

//Variables de Templates
var server_port = 8080;
findPort(server_port, server_port + 10, function(ports) {
	server_port = ports[0];
});

var bases = {
	src: '../source/',
	dist: '../dev/',
	prod: '../prod/',
	docs: '../docs'
};

//Directorios de sistema
var paths = {
		dev: 'dev/',
		styles: ['scss/**/*.scss', 'scss/*.scss'],
		css: ['css/**/*.css', 'css/*.css'],
		pugs: ['pug/**/*.pug', '!pug/**/_*.pug', '!pug/_*.pug'],
		ts: ['ts/**/*.ts', 'ts/*.ts'],
		js: ['js/**/*.js', 'js/*.js'],
		img: ['img/**/*.+(png|jpg|gif)', '!img/sprites/*'],
		sprites: [bases.src + 'img/sprites/*.*']
	},
	CONST = {
		ROOT: 'source/'
	};

//Livereload - Watch Taks HTML - CSS
gulp.task('connect', function() {
	connect.server({
		root: CONST.ROOT,
		port: server_port,
		livereload: true
	});
});


// Reload Server Function
gulp.task('reload_server', function() {
	setTimeout(function() {
		return gulp.src(paths.dev).pipe(connect.reload()).on('end', function() {
			console.log('******* NAVEGADOR ACTUALIZADO ********');
		});
	}, 768);
});

//SASS
gulp.task('sass', function() {
	gulp.src(paths.styles, { cwd: bases.src })
		//.pipe($.autoprefixer({browsers: ['last 3 versions', 'ie 8', 'ie 9']}))
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(bases.dist + 'css/'))
		.pipe(browserSync.reload({ stream: true }))
		.pipe(connect.reload())
		.pipe($.plumber());
});
//SASS

gulp.task('minify-css', function() {
	return gulp.src(paths.css, { cwd: bases.dist })
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest(bases.prod + 'css/'));
});

//PUG
gulp.task('pug', function() {
		gulp.src(paths.pugs, { cwd: bases.src })
			// .pipe(plumber())
			.pipe(pug())
			.pipe(gulp.dest(bases.dist))
			.pipe(browserSync.reload({ stream: true }))
	})
	//PUG

gulp.task('html-min', function() {
	return gulp.src(bases.dist + '*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(bases.prod));
});

//TYPESCRIPT
gulp.task('typescript', function() {
	return gulp.src(paths.ts, { cwd: bases.src })
		.pipe(ts())
		//.pipe(ts({
		//  noImplicitAny: true,
		//}))
		.pipe(gulp.dest(bases.dist + 'js/'));
});
//TYPESCRIPT

//JS MIN
gulp.task('jsmin', function() {
	gulp.src(paths.js, { cwd: bases.dist })
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(bases.prod + 'js/'));
});
//JS MIN

//IMAGES
gulp.task('image', function() {
	gulp.src(paths.img, { cwd: bases.src })
		.pipe(plumber())
		.pipe(imagemin({ progressive: true, interlaced: true, svgoPlugins: [{ cleanupIDs: false }] }))
		.pipe(gulp.dest(bases.dist + 'img/'))
});
//IMAGES

//IMAGES
gulp.task('imageProd', function() {
	gulp.src(paths.img, { cwd: bases.dist })
		.pipe(plumber())
		.pipe(imagemin({ progressive: true, interlaced: true, svgoPlugins: [{ cleanupIDs: false }] }))
		.pipe(gulp.dest(bases.prod + 'img/'))
});
//IMAGES

//JSDOC
// gulp.task("typedoc", function() {
//   gulp.src(["source/**/*.ts"])
// 	  .pipe(typedoc({
// 			module: "commonjs",
// 			target: "es5",
// 			out: "docs/",
// 			name: "Front Components",
// 	  }));
// });
/*gulp.task('jsdoc', function(cb) {
	var config = require('./jsdocConfig.json');
	gulp.src(['README.md', bases.dist + 'js/*.js'], { read: false })
		.pipe(jsdoc(config, cb));
});*/
//JSDOC

// Testing JS
//https://syropia.net/journal/javascript-testing-with-jasmine-and-gulp-redux
gulp.task('test', function(done) {
	return new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

//Browser Sync Dev
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: bases.dist
		}
	});
});

//Browser Sync Prod
gulp.task('browser-sync-prod', function() {
	browserSync({
		server: {
			baseDir: bases.prod
		}
	});
});

//Create Sprite Images Dev
gulp.task('sprite', function() {
	var spriteData = gulp.src(paths.sprites, { cwd: bases.src }).pipe($.spritesmith({
		imgName: 'sprite.png',
		cssName: '_sprite.scss',
		imgPath: '../img/sprite.png'
	}));

	spriteData.img
		.pipe(gulp.dest(bases.src + 'img/'))
		.pipe(browserSync.reload({ stream: true }));

	spriteData.css
		.pipe(gulp.dest(bases.src + 'scss/inc'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function() {
	gulp.watch(bases.src + 'scss/**/*.scss', ['sass', 'reload_server']);
	gulp.watch(bases.src + 'pug/**/*.pug', ['pug', 'reload_server']);
	gulp.watch(bases.src + 'ts/**/*.ts', ['typescript', 'reload_server']);
	gulp.watch(bases.src + 'img/*.*', ['image', 'reload_server']);
});

gulp.task('default', ['pug', 'sass', 'sprite', 'image', 'typescript', 'browser-sync', 'watch']);
//gulp.task('prodstart', ['jade', 'sass', 'minify-css', 'image', 'imageProd', 'typescript', 'jsmin'])
//gulp.task('dev',       ['jade', 'sass', 'image', 'typescript']);
gulp.task('prod', ['pug', 'sass', 'minify-css', 'sprite', 'imageProd', 'typescript', 'jsmin', 'html-min']);

/*  Additional Tasks
 *
 * 	test:     Testing JS
 *  typedoc:  Create documentation JS
 *
 */
