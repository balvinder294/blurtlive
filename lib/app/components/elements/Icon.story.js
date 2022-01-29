"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _Icon = _interopRequireWildcard(require("./Icon"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = {
  textAlign: 'center',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridAutoRows: 'minmax(80px, auto)'
};

var Grid = function Grid(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: styles
  }, children);
};

exports.Grid = Grid;
var options = ['1x', '1_5x', '2x', '3x', '4x', '5x', '10x'];
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).add('Icon', function () {
  return /*#__PURE__*/_react["default"].createElement(Grid, null, _Icon.icons.map(function (icon) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: 'icon_' + icon
    }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
      name: icon,
      size: (0, _addonKnobs.select)('size', options, '2x')
    }), /*#__PURE__*/_react["default"].createElement("p", null, " ", icon, " "));
  }));
});