import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import pkg from './package.json'

export default {
  entry: 'src/main.js',
  dest: pkg.browser,
  format: 'umd',
  moduleName: 'rollupDemo',
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**']
    }),
    uglify({}, minify),
    filesize()
  ]
}
