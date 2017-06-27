'use strict';


// Build script from https://github.com/nodeca/mincer/tree/master/examples

//
// Require module
//


var Mincer = require('mincer');


//
// Get Mincer environment
//


//
// Configure Mincers logger, by default, all
// messages are going to the middle of nowhere
//


Mincer.logger.use(console);


//
// Create and export environment
//


var environment = new Mincer.Environment(process.cwd());


//
// Configure environment load paths (where to find ssets)
//

// Include bootstrap scss load path
var bootstrapPath = '../../';
environment.appendPath(bootstrapPath + 'vendor/stylesheets');

// Include fonts load path
environment.appendPath(bootstrapPath + 'vendor/fonts');

// Include dir with vendor, root just for test
environment.appendPath('./');


//
// Define environment essential *_path helper that will be available in the
// processed vendor. See `vendor/stylesheets/app.css.ejs` for example.
//


environment.ContextClass.defineAssetPath(function (pathname, options) {
  var asset = this.environment.findAsset(pathname, options);

  if (!asset) {
    throw new Error("File " + pathname + " not found");
  }

  return '/vendor/' + asset.digestPath;
});


//
// Create and compile Manifest
//

var manifest_path = process.argv[2] || __dirname + '/vendor';

var manifest = new Mincer.Manifest(environment, manifest_path);


manifest.compile(['application.css'], function (err, assetsData) {
  if (err) {
    console.error("Failed compile vendor: " + (err.message || err.toString()));
    process.exit(128);
  }

  console.info('\n\nAssets were successfully compiled.\n' +
               'Manifest data (a proper JSON) was written to:\n' +
               manifest.path + '\n\n');
  console.dir(assetsData);
});
