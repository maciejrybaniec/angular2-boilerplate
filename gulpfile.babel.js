const gulp = require('gulp');
const babel = require('gulp-babel');

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const path = require('path');

/*
 * tsd install webpack --save
 * tsd install webpack-env --save
 */

/**
 * Run development server.
 */
gulp.task('development', () => {
    const webpackConfig = require('./webpack.config');

    const server = new WebpackDevServer(webpack(webpackConfig), {
        hot: true,
        inline: true,
        historyApiFallback: true
    });

    server.listen(3000, 'localhost', (error, result) => {
      if (error) {
        return console.log(error);
      }

      console.log('Listening at http://localhost:3000/');
    });
});
