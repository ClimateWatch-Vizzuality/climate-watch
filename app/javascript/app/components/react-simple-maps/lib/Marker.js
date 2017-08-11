

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

const Marker = (function (_Component) {
  _inherits(Marker, _Component);

  function Marker() {
    _classCallCheck(this, Marker);

    const _this = _possibleConstructorReturn(
      this,
      (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this)
    );

    _this.state = {
      hover: false,
      pressed: false
    };

    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseClick = _this.handleMouseClick.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  _createClass(Marker, [
    {
      key: 'handleMouseEnter',
      value: function handleMouseEnter(evt) {
        evt.persist();
        let _props = this.props,
          onMouseEnter = _props.onMouseEnter,
          marker = _props.marker;

        this.setState(
          {
            hover: true
          },
          () => onMouseEnter && onMouseEnter(marker, evt)
        );
      }
    },
    {
      key: 'handleMouseMove',
      value: function handleMouseMove(evt) {
        evt.persist();
        if (this.state.pressed) return;
        let _props2 = this.props,
          onMouseMove = _props2.onMouseMove,
          marker = _props2.marker;

        if (!this.state.hover) {
          this.setState(
            {
              hover: true
            },
            () => onMouseMove && onMouseMove(marker, evt)
          );
        } else if (onMouseMove) onMouseMove(marker, evt);
        else return;
      }
    },
    {
      key: 'handleMouseLeave',
      value: function handleMouseLeave(evt) {
        evt.persist();
        let _props3 = this.props,
          onMouseLeave = _props3.onMouseLeave,
          marker = _props3.marker;

        this.setState(
          {
            hover: false
          },
          () => onMouseLeave && onMouseLeave(marker, evt)
        );
      }
    },
    {
      key: 'handleMouseDown',
      value: function handleMouseDown(evt) {
        evt.persist();
        let _props4 = this.props,
          onMouseDown = _props4.onMouseDown,
          marker = _props4.marker;

        this.setState(
          {
            pressed: true
          },
          () => onMouseDown && onMouseDown(marker, evt)
        );
      }
    },
    {
      key: 'handleMouseUp',
      value: function handleMouseUp(evt) {
        evt.persist();
        let _props5 = this.props,
          onMouseUp = _props5.onMouseUp,
          marker = _props5.marker;

        this.setState(
          {
            pressed: false
          },
          () => onMouseUp && onMouseUp(marker, evt)
        );
      }
    },
    {
      key: 'handleMouseClick',
      value: function handleMouseClick(evt) {
        if (!this.props.onClick) return;
        evt.persist();
        let _props6 = this.props,
          onClick = _props6.onClick,
          marker = _props6.marker,
          projection = _props6.projection;

        return (
          onClick && onClick(marker, projection()(marker.coordinates), evt)
        );
      }
    },
    {
      key: 'handleFocus',
      value: function handleFocus(evt) {
        evt.persist();
        let _props7 = this.props,
          onFocus = _props7.onFocus,
          marker = _props7.marker;

        this.setState(
          {
            hover: true
          },
          () => onFocus && onFocus(marker, evt)
        );
      }
    },
    {
      key: 'handleBlur',
      value: function handleBlur(evt) {
        evt.persist();
        let _props8 = this.props,
          onBlur = _props8.onBlur,
          marker = _props8.marker;

        this.setState(
          {
            hover: false
          },
          () => onBlur && onBlur(marker, evt)
        );
      }
    },
    {
      key: 'render',
      value: function render() {
        let _props9 = this.props,
          projection = _props9.projection,
          marker = _props9.marker,
          style = _props9.style,
          tabable = _props9.tabable,
          children = _props9.children;
        let _state = this.state,
          pressed = _state.pressed,
          hover = _state.hover;

        return _react2.default.createElement(
          'g',
          {
            className:
              `rsm-marker${
              pressed && ' rsm-marker--pressed'
              }${hover && ' rsm-marker--hover'}`,
            transform:
              `translate(\n           ${
              projection()(marker.coordinates)[0]
              }\n           ${
              projection()(marker.coordinates)[1]
              }\n         )`,
            style:
              style[
                pressed || hover ? (pressed ? 'pressed' : 'hover') : 'default'
              ],
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onClick: this.handleMouseClick,
            onMouseMove: this.handleMouseMove,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            tabIndex: tabable ? 0 : -1
          },
          children
        );
      }
    }
  ]);

  return Marker;
}(_react.Component));

Marker.defaultProps = {
  style: {
    default: {},
    hover: {},
    pressed: {}
  },
  marker: {
    coordinates: [0, 0]
  },
  tabable: true
};

exports.default = Marker;
