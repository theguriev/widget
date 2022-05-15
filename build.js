#!/usr/bin/env node
const { build } = require('esbuild');
const { join } = require('path');
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const svgrPlugin = require('esbuild-plugin-svgr');

const package = require(join(process.cwd(), 'package.json'));
const isWatch =
  process.argv.slice(2).includes('--watch') ||
  process.argv.slice(2).includes('-w');

const isDev = process.env.NODE_ENV === 'development';

const watch = isWatch
  ? {
      onRebuild(error, result) {
        if (error) console.error('Watch build failed 😡:', error);
        else console.log('Watch build succeeded 👍🏻');
      },
    }
  : false;

build({
  bundle: true,
  sourcemap: isDev,
  format: 'iife',
  minify: true,
  outdir: './dist/',
  target: ['chrome58', 'firefox57', 'safari11'],
  entryPoints: [package.source, package.embeded],
  plugins: [cssModulesPlugin(), svgrPlugin()],
  watch,
}).catch(() => process.exit(1));
