

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

const _projections = require('./projections');

const _projections2 = _interopRequireDefault(_projections);

const _projectionConfig = require('./projectionConfig');

const _projectionConfig2 = _interopRequireDefault(_projectionConfig);

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

const ComposableMap = (function (_Component) {
  _inherits(ComposableMap, _Component);

  function ComposableMap() {
    _classCallCheck(this, ComposableMap);

    const _this = _possibleConstructorReturn(
      this,
      (ComposableMap.__proto__ || Object.getPrototypeOf(ComposableMap))
        .call(this)
    );

    _this.projection = _this.projection.bind(_this);
    return _this;
  }

  _createClass(ComposableMap, [
    {
      key: 'projection',
      value: function projection() {
        let _props = this.props,
          projection = _props.projection,
          projectionConfig = _props.projectionConfig,
          width = _props.width,
          height = _props.height;

        return typeof projection !== 'function'
          ? (0, _projections2.default)(
              width,
              height,
              projectionConfig,
              projection
            )
          : projection(width, height, projectionConfig);
      }
    },
    {
      key: 'render',
      value: function render() {
        let _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          style = _props2.style,
          showCenter = _props2.showCenter,
          children = _props2.children;

        return _react2.default.createElement(
          'svg',
          {
            width,
            height,
            viewBox: `0 0 ${width} ${height}`,
            className: 'rsm-svg',
            style
          },
          _react2.default.cloneElement(this.props.children, {
            projection: this.projection,
            width,
            height
          }),
          showCenter &&
            _react2.default.createElement(
              'g',
              null,
              _react2.default.createElement('rect', {
                x: width / 2 - 0.5,
                y: 0,
                width: 1,
                height,
                fill: '#e91e63'
              }),
              _react2.default.createElement('rect', {
                x: 0,
                y: height / 2 - 0.5,
                width,
                height: 1,
                fill: '#e91e63'
              })
            )
        );
      }
    }
  ]);

  return ComposableMap;
}(_react.Component));

ComposableMap.defaultProps = {
  width: 800,
  height: 450,
  projection: 'times',
  projectionConfig: _projectionConfig2.default
};

exports.default = ComposableMap;
