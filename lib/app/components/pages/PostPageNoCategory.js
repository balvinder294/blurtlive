"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _FetchDataSaga = require("app/redux/FetchDataSaga");

var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));

var _SvgImage = _interopRequireDefault(require("app/components/elements/SvgImage"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PostWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PostWrapper, _React$Component);

  var _super = _createSuper(PostWrapper);

  function PostWrapper() {
    var _this;

    (0, _classCallCheck2["default"])(this, PostWrapper);
    _this = _super.call(this);
    _this.state = {
      loading: true
    };
    return _this;
  }

  (0, _createClass2["default"])(PostWrapper, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var route_params = this.props.routeParams;
      var post = route_params.username + '/' + route_params.slug;
      var dis = this.props.content.get(post);

      if (!dis) {
        this.props.getContent({
          author: route_params.username,
          permlink: route_params.slug
        }).then(function (content) {
          if (content) {
            _reactRouter.browserHistory.replace("/".concat(content.category, "/@").concat(post));
          }
        })["catch"](function () {
          _this2.setState({
            loading: false
          });
        });
      } else if (dis.get('id') === '0.0.0') {
        // non-existing post
        this.setState({
          loading: false
        });
      } else {
        if (_reactRouter.browserHistory) {
          _reactRouter.browserHistory.replace("/".concat(dis.get('category'), "/@").concat(post));
        }
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(np, ns) {
      return ns.loading !== this.state.loading;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, this.state.loading ? /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      })) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "NotFound float-center"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/"
      }, /*#__PURE__*/_react["default"].createElement(_SvgImage["default"], {
        name: "404",
        width: "640px",
        height: "480px"
      }))));
    }
  }]);
  return PostWrapper;
}(_react["default"].Component);

var StoreWrapped = (0, _reactRedux.connect)(function (state) {
  return {
    content: state.global.get('content')
  };
}, function (dispatch) {
  return {
    getContent: function getContent(payload) {
      return new Promise(function (resolve, reject) {
        dispatch(_FetchDataSaga.actions.getContent(_objectSpread(_objectSpread({}, payload), {}, {
          resolve: resolve,
          reject: reject
        })));
      });
    }
  };
})(PostWrapper);
module.exports = {
  path: '/@:username/:slug',
  component: StoreWrapped
};