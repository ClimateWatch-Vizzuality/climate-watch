

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

const Annotation = (function (_Component) {
  _inherits(Annotation, _Component);

  function Annotation() {
    _classCallCheck(this, Annotation);

    return _possibleConstructorReturn(
      this,
      (Annotation.__proto__ || Object.getPrototypeOf(Annotation))
        .apply(this, arguments)
    );
  }

  _createClass(Annotation, [
    {
      key: 'render',
      value: function render() {
        let _props = this.props,
          projection = _props.projection,
          subject = _props.subject,
          style = _props.style,
          dx = _props.dx,
          dy = _props.dy,
          zoom = _props.zoom,
          stroke = _props.stroke,
          strokeWidth = _props.strokeWidth,
          children = _props.children;

        const connectorPath = (0, _utils.createConnectorPath)(null, [
          -dx / zoom,
          -dy / zoom
        ]);

        return _react2.default.createElement(
          'g',
          {
            className: 'rsm-annotation',
            style: { style },
            transform:
              `translate(\n          ${
              projection()(subject)[0] + dx / zoom
              }\n          ${
              projection()(subject)[1] + dy / zoom
              }\n        )`,
            textAnchor: (0, _utils.createTextAnchor)(dx)
          },
          children,
          _react2.default.createElement('path', {
            d: connectorPath,
            stroke,
            strokeWidth
          })
        );
      }
    }
  ]);

  return Annotation;
}(_react.Component));

Annotation.defaultProps = {
  componentIdentifier: 'Annotation',
  stroke: '#000000',
  strokeWidth: 1,
  zoom: 1
};

exports.default = Annotation;
