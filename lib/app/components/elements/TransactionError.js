"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

var _immutable = require("immutable");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var func = _propTypes["default"].func,
    string = _propTypes["default"].string;
/** Sole consumer for a transaction error of a given type. */

var TransactionError = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TransactionError, _React$Component);

  var _super = _createSuper(TransactionError);

  function TransactionError() {
    var _this;

    (0, _classCallCheck2["default"])(this, TransactionError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'TransactionError'));
    return _this;
  }

  (0, _createClass2["default"])(TransactionError, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          opType = _this$props.opType,
          addListener = _this$props.addListener;
      addListener(opType);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
          opType = _this$props2.opType,
          removeListener = _this$props2.removeListener;
      removeListener(opType);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          errorKey = _this$props3.errorKey,
          exception = _this$props3.exception,
          error = _this$props3.error;
      var cn = 'error callout alert';

      if (!errorKey && !exception) {
        if (!error) return /*#__PURE__*/_react["default"].createElement("span", null);
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: "TransactionError"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: cn
        }, error));
      }

      var text = errorKey ? errorKey : exception;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "TransactionError"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: cn
      }, text));
    }
  }]);
  return TransactionError;
}(_react["default"].Component);

(0, _defineProperty2["default"])(TransactionError, "propTypes", {
  // HTML properties
  opType: string.isRequired,
  error: string,
  // additional error (optional)
  // Redux connect properties
  addListener: func.isRequired,
  removeListener: func.isRequired,
  errorKey: string,
  exception: string
});

var _default = (0, _reactRedux.connect)( // mapStateToProps
function (state, ownProps) {
  var opType = ownProps.opType;
  var error = state.transaction.getIn(['TransactionError', opType]) || (0, _immutable.Map)();

  var _error$toJS = error.toJS(),
      key = _error$toJS.key,
      exception = _error$toJS.exception;

  return _objectSpread(_objectSpread({}, ownProps), {}, {
    errorKey: key,
    exception: exception
  });
}, // mapDispatchToProps
function (dispatch) {
  return {
    addListener: function addListener(opType) {
      dispatch(transactionActions.set({
        key: ['TransactionError', opType + '_listener'],
        value: true
      }));
    },
    removeListener: function removeListener(opType) {
      dispatch(transactionActions.remove({
        key: ['TransactionError', opType]
      }));
      dispatch(transactionActions.remove({
        key: ['TransactionError', opType + '_listener']
      }));
    }
  };
})(TransactionError);

exports["default"] = _default;