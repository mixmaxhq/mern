const gulp = require('gulp');
const del = require('del');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const runSequence = require('run-sequence');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const rootImport = require('rollup-plugin-root-import');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const _ = require('lodash');
const replace = require('rollup-plugin-replace');

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM'
};

const inputOptions = {
  input: './src/client/main.jsx',
  external: _.keys(globals),
  plugins: _.compact([
    replace({
      'process.env.NODE_ENV': "'development'"
    }),
    rootImport({
      root: [`${__dirname}/src/client`],
      extensions: ['.js', '.jsx', '']
    }),
    nodeResolve({
      extensions: ['.js', '.jsx'],
      browser: true
    }),
    commonjs({
      include: [
        'node_modules/**'
      ]
    }),
    babel({
      plugins: [
        'external-helpers',
        'transform-object-rest-spread',
        'babel-plugin-transform-function-bind',
        'syntax-jsx',
        'transform-react-jsx',
        'transform-react-display-name'
      ],
      include: '**/*.jsx'
    })
  ])
};

const outputOptions = {
  file: 'public/build-main.js',
  format: 'umd',
  globals
};

gulp.task('build', (cb) => {
  runSequence('js', cb);
});

gulp.task('clean', () => {
  return del('public/build-main.js');
});

gulp.task('js', async () => {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
});

// Watches for files.
gulp.task('watch', () => {
  gulp.watch('src/client/**/*', async () => {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
  });
  livereload.listen({
    port: 18282
  });
});

gulp.task('server', () => {
  let watch = ['src/server/**/*', 'app.js'];

  const env = { 'NODE_ENV': 'development' };
  const instance = nodemon({
    script: 'app.js',
    ext: 'jsx js',
    watch,
    env
  });

  instance.on('restart', () => {
    setTimeout(() => {
      livereload.reload();
    }, 4000);
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], (cb) => {
  runSequence('build', 'server', 'watch', cb);
});
