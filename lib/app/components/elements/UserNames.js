"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _DropdownMenu = _interopRequireDefault(require("app/components/elements/DropdownMenu"));

var _reactRouter = require("react-router");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function userLink(name) {
  return /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
    className: "username",
    key: name,
    to: '/@' + name
  }, name);
}

var UserNames = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(UserNames, _Component);

  var _super = _createSuper(UserNames);

  function UserNames() {
    (0, _classCallCheck2["default"])(this, UserNames);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(UserNames, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          names = _this$props.names,
          size = _this$props.size;

      if (!names) {
        return null;
      } // `size` is max number of names to list before "and <x>"


      if (size >= names.length) {
        // enforce bounds
        size = names.length - 1;
      } // if size == 0, there is no "and" in the output


      var and_names = size == 0 ? [] : names.splice(size);
      var out = []; // build first portion of output: "name1, name2, name3"

      for (var i = 0; i < names.length; i++) {
        if (i > 0) out.push( /*#__PURE__*/_react["default"].createElement("span", {
          key: '_comma' + i
        }, ", "));
        out.push(userLink(names[i]));
      } // build suffix: " and name4" or " and 3 others" (dropdown if and_names > 1)


      if (and_names.length > 0) {
        out.push( /*#__PURE__*/_react["default"].createElement("span", {
          key: "_and"
        }, " and "));

        if (and_names.length == 1) {
          // and <name>
          out.push(userLink(and_names[0]));
        } else {
          // and <x> others...
          out.push( /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
            key: "_others",
            selected: and_names.length + ' others',
            items: and_names.map(function (name) {
              return {
                value: name,
                link: '/@' + name
              };
            }),
            el: "div"
          }));
        }
      }

      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "UserNames"
      }, out);
    }
  }]);
  return UserNames;
}(_react.Component);

(0, _defineProperty2["default"])(UserNames, "propTypes", {
  names: _propTypes["default"].array,
  size: _propTypes["default"].number
});
(0, _defineProperty2["default"])(UserNames, "defaultProps", {
  size: 2
});

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  return ownProps;
})(UserNames);

exports["default"] = _default;