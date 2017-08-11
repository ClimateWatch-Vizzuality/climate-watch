

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.replaceStrokeWidth = replaceStrokeWidth;
exports.createChoroplethStyles = createChoroplethStyles;
exports.calculateResizeFactor = calculateResizeFactor;
exports.calculateMousePosition = calculateMousePosition;
exports.isChildOfType = isChildOfType;
exports.createNewChildren = createNewChildren;
exports.roundPath = roundPath;
exports.createConnectorPath = createConnectorPath;
exports.createTextAnchor = createTextAnchor;

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function replaceStrokeWidth(styles) {
  const newStyles = {};
  Object.keys(styles).map((key, i) => {
    if (key === 'strokeWidth') newStyles[key] = 'inherit';
    else newStyles[key] = styles[key];
  });
  return newStyles;
}

function createChoroplethStyles(styles, choroplethValue) {
  if (choroplethValue) {
    const newStyles = {};
    Object.keys(styles).map((key, i) => {
      if (key === 'fill') newStyles[key] = choroplethValue.value;
      else newStyles[key] = styles[key];
    });
    return newStyles;
  }
  return styles;
}

function calculateResizeFactor(actualDimension, baseDimension) {
  return 1 / 100 * (100 / actualDimension * baseDimension);
}

function calculateMousePosition(
  direction,
  projection,
  props,
  zoom,
  resizeFactor
) {
  const center =
    arguments.length > 5 && arguments[5] !== undefined
      ? arguments[5]
      : props.center;
  const width =
    arguments.length > 6 && arguments[6] !== undefined
      ? arguments[6]
      : props.width;
  const height =
    arguments.length > 7 && arguments[7] !== undefined
      ? arguments[7]
      : props.height;

  const reference = { x: 0, y: 1 };
  const reverseRotation = projection().rotate().map(item => -item);
  return (
    (projection().rotate(reverseRotation)([-center[0], -center[1]])[
      reference[direction]
    ] -
      (reference[direction] === 0 ? width : height) / 2) *
    zoom *
    (1 / resizeFactor)
  );
}

function isChildOfType(child, expectedType) {
  return child.props.componentIdentifier === expectedType;
}

function createNewChildren(children, props) {
  if (!children) return;
  if (!children.length) {
    return isChildOfType(children, 'Geographies')
      ? _react2.default.cloneElement(children, {
        geographyPaths: props.geographyPaths,
        projection: props.projection
      })
      : isChildOfType(children, 'Markers') ||
        isChildOfType(children, 'Annotation') ||
        isChildOfType(child, 'Graticule')
        ? _react2.default.cloneElement(children, {
          projection: props.projection,
          zoom: props.zoom
        })
        : children;
  }
  return children.map((child, i) => {
    if (!child) return;
    return isChildOfType(child, 'Geographies')
        ? _react2.default.cloneElement(child, {
          key: `zoomable-child-${i}`,
          geographyPaths: props.geographyPaths,
          projection: props.projection
        })
        : isChildOfType(child, 'Markers') ||
          isChildOfType(child, 'Annotation') ||
          isChildOfType(child, 'Graticule')
          ? _react2.default.cloneElement(child, {
            key: `zoomable-child-${i}`,
            projection: props.projection,
            zoom: props.zoom
          })
          : child;
  });
}

function roundPath(path, precision) {
  if (!path) return;
  const query = /[\d\.-][\d\.e-]*/g;
  return path.replace(query, n => Math.round(n * (1 / precision)) / (1 / precision));
}

function createConnectorPath(connectorType, endPoint) {
  return `M0,0 L${endPoint[0]},${endPoint[1]}`;
}

function createTextAnchor(dx) {
  if (dx > 0) return 'start';
  else if (dx < 0) return 'end';
  return 'middle';
}
