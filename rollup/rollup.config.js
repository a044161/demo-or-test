import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  entry: 'src/main.js',
  dest: pkg.browser,
  format: 'umd',
  moduleName: 'rollupDemo',
  plugins: [
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    babel({
      exclude: ['node_modules/**']
    })
  ]
};