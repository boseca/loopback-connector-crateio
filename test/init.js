module.exports = require('should');

var DataSource = require('loopback-datasource-juggler').DataSource;

var config = require('rc')(
                'loopback',
                {
                    test: {
                        crate: {}
                    }
                }).test.crate;

global.getConfig = function (options) {
  var dbConf = {
    host: config.host || 'localhost',
    port: config.port || 4200,
    enableRefresh: config.enableRefresh || true
  };
  if (options) {
    for (var el in options) {
      if (options.hasOwnProperty(el)) {
        dbConf[el] = options[el];
      }
    }
  }
  return dbConf;
};

global.getDataSource = global.getSchema = function (options) {
  return new DataSource(require('../'), getConfig(options));
};
