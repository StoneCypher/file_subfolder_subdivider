
import resolve       from 'rollup-plugin-node-resolve';
import commonjs      from 'rollup-plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';





const bin = {

  input: './build/typescript/index.js',

  output: {
    dir     : './build/rollup/',
    format  : 'es',
    name    : 'fss',
    exports : 'named'
  },

  plugins : [

    nodePolyfills(),
    commonjs(),
    resolve()

  ]

  // onwarn: function(warning) {
  //   if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
  //   console.warn( warning.message );
  // }

};





export default [ bin ];
