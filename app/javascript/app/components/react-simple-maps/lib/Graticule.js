

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _createClass = (function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}());

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _d3Geo = require('d3-geo');

const _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      `Super expression must either be null or a function, not ${
        typeof superClass}`
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
  }
}

const graticuleCache = {};

const Graticule = (function (_Component) {
  _inherits(Graticule, _Component);

  function Graticule() {
    _classCallCheck(this, Graticule);

    const _this = _possibleConstructorReturn(
      this,
      (Graticule.__proto__ || Object.getPrototypeOf(Graticule)).call(this)
    );

    _this.state = {
      renderGraticule: false
    };
    _this.renderGraticule = _this.renderGraticule.bind(_this);
    return _this;
  }

  _createClass(Graticule, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.renderGraticule();
      }
    },
    {
      key: 'renderGraticule',
      value: function renderGraticule() {
        this.setState({
          renderGraticule: true
        });
      }
    },
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return nextProps.disableOptimization;
      }
    },
    {
      key: 'render',
      value: function render() {
        let _props = this.props,
          zoom = _props.zoom,
          projection = _props.projection,
          round = _props.round,
          precision = _props.precision,
          style = _props.style,
          step = _props.step,
          outline = _props.outline,
          fill = _props.fill,
          stroke = _props.stroke;

        const graticulePath =
          graticuleCache.graticule ||
          (0, _d3Geo.geoPath)().projection(projection())(
            (0, _d3Geo.geoGraticule)().step(step)()
          );
        const graticuleOutline =
          graticuleCache.outline ||
          (0, _d3Geo.geoPath)().projection(projection())(
            (0, _d3Geo.geoGraticule)().outline()
          );

        if (!graticuleCache.graticule) graticuleCache.graticule = graticulePath;
        if (!graticuleCache.outline) graticuleCache.outline = graticuleOutline;

        return (
          this.state.renderGraticule &&
          _react2.default.createElement(
            'g',
            { className: 'rsm-graticule' },
            _react2.default.createElement('path', {
              fill,
              stroke,
              d: round
                ? (0, _utils.roundPath)(graticulePath, precision)
                : graticulePath,
              style
            }),
            outline &&
              _react2.default.createElement('path', {
                fill,
                stroke,
                d: round
                  ? (0, _utils.roundPath)(graticuleOutline, precision)
                  : graticuleOutline,
                style
              })
          )
        );
      }
    }
  ]);

  return Graticule;
}(_react.Component));

Graticule.defaultProps = {
  componentIdentifier: 'Graticule',
  disableOptimization: true,
  round: true,
  precision: 0.1,
  step: [10, 10],
  outline: true,
  stroke: '#DDDDDD',
  fill: 'transparent',
  style: {
    pointerEvents: 'none'
  }
};

exports.default = Graticule;
