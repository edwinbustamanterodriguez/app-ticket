/**
 * Custom angular webpack configuration
 */
/*

module.exports = (config, options) => {
    config.target = 'electron-renderer';


    if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                config.target = 'web';
            }
            break;
        }
    }

    return config;
}
*/


const path = require('path');

module.exports = {
  target: 'electron-renderer',
  externals: {
    typeorm: "require('typeorm')",
    sqlite3: "require('sqlite3')",
  },
  resolve: {
    alias: {
      typeorm: path.resolve(__dirname, "../node_modules/typeorm/typeorm-model-shim")
    }
  }
};
