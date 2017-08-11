

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports.default = function (width, height, config, projectionName) {
  const scale = config.scale || _projectionConfig2.default.scale;
  const xOffset = config.xOffset || _projectionConfig2.default.xOffset;
  const yOffset = config.yOffset || _projectionConfig2.default.yOffset;
  const rotation = config.rotation || _projectionConfig2.default.rotation;
  const precision = config.precision || _projectionConfig2.default.precision;

  return projectionReference
    [projectionName]()
    .scale(scale)
    .translate([xOffset + width / 2, yOffset + height / 2])
    .rotate(rotation)
    .precision(precision);
};

const _d3GeoProjection = require('d3-geo-projection');

const _d3Geo = require('d3-geo');

const _projectionConfig = require('./projectionConfig');

var _projectionConfig2 = _interopRequireDefault(_projectionConfig);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var projectionReference = {
  mercator: _d3Geo.geoMercator,
  miller: _d3GeoProjection.geoMiller,
  times: _d3GeoProjection.geoTimes,
  robinson: _d3GeoProjection.geoRobinson,
  winkel3: _d3GeoProjection.geoWinkel3,
  eckert4: _d3GeoProjection.geoEckert4
};
