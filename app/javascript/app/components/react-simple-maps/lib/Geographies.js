

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

const _topojsonClient = require('topojson-client');

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

const Geographies = (function (_Component) {
  _inherits(Geographies, _Component);

  function Geographies(props) {
    _classCallCheck(this, Geographies);

    const _this = _possibleConstructorReturn(
      this,
      (Geographies.__proto__ || Object.getPrototypeOf(Geographies))
        .call(this, props)
    );

    _this.state = {
      geographyPaths: props.geographyPaths
    };

    _this.fetchGeographies = _this.fetchGeographies.bind(_this);
    return _this;
  }

  _createClass(Geographies, [
    {
      key: 'fetchGeographies',
      value: function fetchGeographies(geographyUrl) {
        const _this2 = this;

        let _props = this.props,
          width = _props.width,
          height = _props.height;

        if (!geographyUrl) return;

        const request = new XMLHttpRequest();
        request.open('GET', geographyUrl, true);

        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            const geographyPaths = JSON.parse(request.responseText);
            _this2.setState(
              {
                geographyPaths: (0, _topojsonClient.feature)(
                  geographyPaths,
                  geographyPaths.objects[Object.keys(geographyPaths.objects)[0]]
                ).features
              },
              () => {
                if (!_this2.props.onGeographiesLoaded) return;
                _this2.props.onGeographyPathsLoaded(String(request.status));
              }
            );
          } else {
            if (!_this2.props.onGeographiesLoaded) return;
            _this2.props.onGeographyPathsLoaded(String(request.status));
          }
        };
        request.onerror = function () {
          console.log('There was a connection error...');
        };
        request.send();
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!nextProps.geographyUrl) return;
        if (nextProps.geographyUrl !== this.props.geographyUrl) {
          this.fetchGeographies(nextProps.geographyUrl);
        }
      }
    },
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        const geoPathsChanged =
          nextState.geographyPaths.length !== this.state.geographyPaths.length;
        const choroplethChanged =
          JSON.stringify(nextProps.choropleth) !==
          JSON.stringify(this.props.choropleth);
        return (
          geoPathsChanged || choroplethChanged || nextProps.disableOptimization
        );
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.fetchGeographies(this.props.geographyUrl);
      }
    },
    {
      key: 'render',
      value: function render() {
        let _props2 = this.props,
          projection = _props2.projection,
          style = _props2.style,
          children = _props2.children;

        return _react2.default.createElement(
          'g',
          { className: 'rsm-geographies', style },
          children(this.state.geographyPaths, projection)
        );
      }
    }
  ]);

  return Geographies;
}(_react.Component));

Geographies.defaultProps = {
  componentIdentifier: 'Geographies',
  disableOptimization: false,
  geographyUrl: '',
  geographyPaths: []
};

exports.default = Geographies;
