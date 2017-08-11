

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

const ZoomableGroup = (function (_Component) {
  _inherits(ZoomableGroup, _Component);

  function ZoomableGroup(props) {
    _classCallCheck(this, ZoomableGroup);

    const _this = _possibleConstructorReturn(
      this,
      (ZoomableGroup.__proto__ || Object.getPrototypeOf(ZoomableGroup))
        .call(this, props)
    );

    _this.state = {
      mouseX: (0, _utils.calculateMousePosition)(
        'x',
        props.projection,
        props,
        props.zoom,
        1
      ),
      mouseY: (0, _utils.calculateMousePosition)(
        'y',
        props.projection,
        props,
        props.zoom,
        1
      ),
      mouseXStart: 0,
      mouseYStart: 0,
      isPressed: false,
      resizeFactorX: 1,
      resizeFactorY: 1,
      backdrop: {
        width: Math.round(
          props.projection()([props.backdrop.x[1], 0])[0] -
            props.projection()([props.backdrop.x[0], 0])[0]
        ),
        height: Math.round(
          props.projection()([0, props.backdrop.y[1]])[1] -
            props.projection()([0, props.backdrop.y[0]])[1]
        ),
        x: Math.round(props.projection()([props.backdrop.x[0], 0])[0]),
        y: Math.round(props.projection()([0, props.backdrop.y[0]])[1])
      }
    };

    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);
    return _this;
  }

  _createClass(ZoomableGroup, [
    {
      key: 'handleMouseMove',
      value: function handleMouseMove(_ref) {
        let pageX = _ref.pageX,
          pageY = _ref.pageY;

        if (this.props.disablePanning) return;

        if (this.state.isPressed) {
          this.setState({
            mouseX: pageX - this.state.mouseXStart,
            mouseY: pageY - this.state.mouseYStart
          });
        }
      }
    },
    {
      key: 'handleMouseUp',
      value: function handleMouseUp() {
        if (this.props.disablePanning) return;
        this.setState({
          isPressed: false
        });
      }
    },
    {
      key: 'handleMouseDown',
      value: function handleMouseDown(_ref2) {
        let pageX = _ref2.pageX,
          pageY = _ref2.pageY;

        if (this.props.disablePanning) return;
        this.setState({
          isPressed: true,
          mouseXStart: pageX - this.state.mouseX,
          mouseYStart: pageY - this.state.mouseY
        });
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        let _state = this.state,
          mouseX = _state.mouseX,
          mouseY = _state.mouseY,
          resizeFactorX = _state.resizeFactorX,
          resizeFactorY = _state.resizeFactorY;
        let _props = this.props,
          projection = _props.projection,
          center = _props.center,
          zoom = _props.zoom;

        const zoomFactor = nextProps.zoom / zoom;
        const centerChanged =
          JSON.stringify(nextProps.center) !== JSON.stringify(center);

        this.setState({
          zoom: nextProps.zoom,
          mouseX: centerChanged
            ? (0, _utils.calculateMousePosition)(
                'x',
                projection,
                nextProps,
                nextProps.zoom,
                resizeFactorX
              )
            : mouseX * zoomFactor,
          mouseY: centerChanged
            ? (0, _utils.calculateMousePosition)(
                'y',
                projection,
                nextProps,
                nextProps.zoom,
                resizeFactorY
              )
            : mouseY * zoomFactor
        });
      }
    },
    {
      key: 'handleResize',
      value: function handleResize() {
        let _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          projection = _props2.projection,
          zoom = _props2.zoom;

        const resizeFactorX = (0, _utils.calculateResizeFactor)(
          this.zoomableGroupNode.parentElement.getBoundingClientRect().width,
          width
        );
        const resizeFactorY = (0, _utils.calculateResizeFactor)(
          this.zoomableGroupNode.parentElement.getBoundingClientRect().height,
          height
        );

        const xPercentageChange = 1 / resizeFactorX * this.state.resizeFactorX;
        const yPercentageChange = 1 / resizeFactorY * this.state.resizeFactorY;

        this.setState({
          resizeFactorX,
          resizeFactorY,
          mouseX: this.state.mouseX * xPercentageChange,
          mouseY: this.state.mouseY * yPercentageChange
        });
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        let _props3 = this.props,
          width = _props3.width,
          height = _props3.height,
          projection = _props3.projection,
          zoom = _props3.zoom;

        const resizeFactorX = (0, _utils.calculateResizeFactor)(
          this.zoomableGroupNode.parentElement.getBoundingClientRect().width,
          width
        );
        const resizeFactorY = (0, _utils.calculateResizeFactor)(
          this.zoomableGroupNode.parentElement.getBoundingClientRect().height,
          height
        );

        this.setState({
          resizeFactorX,
          resizeFactorY,
          mouseX: (0, _utils.calculateMousePosition)(
            'x',
            projection,
            this.props,
            zoom,
            resizeFactorX
          ),
          mouseY: (0, _utils.calculateMousePosition)(
            'y',
            projection,
            this.props,
            zoom,
            resizeFactorY
          )
        });

        window.addEventListener('resize', this.handleResize);
        window.addEventListener('mouseup', this.handleMouseUp);
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
    },
    {
      key: 'render',
      value: function render() {
        const _this2 = this;

        let _props4 = this.props,
          width = _props4.width,
          height = _props4.height,
          zoom = _props4.zoom,
          style = _props4.style,
          projection = _props4.projection,
          children = _props4.children;
        let _state2 = this.state,
          mouseX = _state2.mouseX,
          mouseY = _state2.mouseY,
          resizeFactorX = _state2.resizeFactorX,
          resizeFactorY = _state2.resizeFactorY;

        return _react2.default.createElement(
          'g',
          {
            className: 'rsm-zoomable-group',
            ref: function ref(zoomableGroupNode) {
              return (_this2.zoomableGroupNode = zoomableGroupNode);
            },
            transform:
              `\n           translate(\n             ${
              Math.round((width / 2 + resizeFactorX * mouseX) * 100) / 100
              }\n             ${
              Math.round((height / 2 + resizeFactorY * mouseY) * 100) / 100
              }\n           )\n           scale(${
              zoom
              })\n           translate(${
              -width / 2
              } ${
              -height / 2
              })\n         `,
            onMouseMove: this.handleMouseMove,
            onMouseUp: this.handleMouseUp,
            onMouseDown: this.handleMouseDown,
            style
          },
          _react2.default.createElement('rect', {
            x: this.state.backdrop.x,
            y: this.state.backdrop.y,
            width: this.state.backdrop.width,
            height: this.state.backdrop.height,
            fill: 'transparent',
            style: { strokeWidth: 0 }
          }),
          (0, _utils.createNewChildren)(children, this.props)
        );
      }
    }
  ]);

  return ZoomableGroup;
}(_react.Component));

ZoomableGroup.defaultProps = {
  center: [0, 0],
  backdrop: {
    x: [-179.9, 179.9],
    y: [89.9, -89.9]
  },
  zoom: 1,
  disablePanning: false
};

exports.default = ZoomableGroup;
