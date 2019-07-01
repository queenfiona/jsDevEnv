// File isn't transpiled, must use CommonJS and ES6

// Register babel to transpile before our tests run
require('@babel/register')();

// Disable webpack features that aren't understood by Mocha
require.extensions['.css']=function(){};
