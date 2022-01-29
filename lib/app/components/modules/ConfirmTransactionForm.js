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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));

var _DomUtils = require("app/utils/DomUtils");

var _counterpart = _interopRequireDefault(require("counterpart"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ConfirmTransactionForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(ConfirmTransactionForm, _Component);

  var _super = _createSuper(ConfirmTransactionForm);

  function ConfirmTransactionForm() {
    var _this;

    (0, _classCallCheck2["default"])(this, ConfirmTransactionForm);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "closeOnOutsideClick", function (e) {
      var inside_dialog = (0, _DomUtils.findParent)(e.target, 'ConfirmTransactionForm');
      if (!inside_dialog) _this.onCancel();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onCancel", function () {
      var _this$props = _this.props,
          confirmErrorCallback = _this$props.confirmErrorCallback,
          onCancel = _this$props.onCancel;
      if (confirmErrorCallback) confirmErrorCallback();
      if (onCancel) onCancel();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "okClick", function () {
      var _this$props2 = _this.props,
          okClick = _this$props2.okClick,
          confirmBroadcastOperation = _this$props2.confirmBroadcastOperation;
      okClick(confirmBroadcastOperation);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onCheckbox", function (e) {
      var checkboxChecked = e.target.checked;

      _this.setState({
        checkboxChecked: checkboxChecked
      });
    });
    _this.state = {
      checkboxChecked: false
    };
    return _this;
  }

  (0, _createClass2["default"])(ConfirmTransactionForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('click', this.closeOnOutsideClick);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.closeOnOutsideClick);
    }
  }, {
    key: "render",
    value: function render() {
      var onCancel = this.onCancel,
          okClick = this.okClick,
          onCheckbox = this.onCheckbox;
      var _this$props3 = this.props,
          confirm = _this$props3.confirm,
          confirmBroadcastOperation = _this$props3.confirmBroadcastOperation,
          warning = _this$props3.warning,
          checkbox = _this$props3.checkbox;
      var checkboxChecked = this.state.checkboxChecked;
      var conf = typeof confirm === 'function' ? confirm() : confirm;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ConfirmTransactionForm"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, typeName(confirmBroadcastOperation)), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", null, conf), warning ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          paddingTop: 10,
          fontWeight: 'bold'
        },
        className: "error"
      }, warning) : null, checkbox ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "checkbox",
        type: "checkbox",
        checked: checkboxChecked,
        onChange: this.onCheckbox
      }), checkbox)) : null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("button", {
        className: "button",
        onClick: okClick,
        disabled: !(checkbox === undefined || checkboxChecked)
      }, (0, _counterpart["default"])('g.ok')), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button hollow",
        className: "button hollow",
        onClick: onCancel
      }, (0, _counterpart["default"])('g.cancel')));
    }
  }]);
  return ConfirmTransactionForm;
}(_react.Component);

(0, _defineProperty2["default"])(ConfirmTransactionForm, "propTypes", {
  //Steemit
  onCancel: _propTypes["default"].func,
  warning: _propTypes["default"].string,
  checkbox: _propTypes["default"].string,
  // redux-form
  confirm: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  confirmBroadcastOperation: _propTypes["default"].object,
  confirmErrorCallback: _propTypes["default"].func,
  okClick: _propTypes["default"].func
});

var typeName = function typeName(confirmBroadcastOperation) {
  var title = confirmBroadcastOperation.getIn(['operation', '__config', 'title']);
  if (title) return title;
  var type = confirmBroadcastOperation.get('type');
  return (0, _counterpart["default"])('confirmtransactionform_jsx.confirm', {
    transactionType: type.split('_').map(function (n) {
      return n.charAt(0).toUpperCase() + n.substring(1);
    }).join(' ') // @todo we should translate each potential transaction type!

  });
};

var _default = (0, _reactRedux.connect)( // mapStateToProps
function (state) {
  var confirmBroadcastOperation = state.transaction.get('confirmBroadcastOperation');
  var confirmErrorCallback = state.transaction.get('confirmErrorCallback');
  var confirm = state.transaction.get('confirm');
  var warning = state.transaction.get('warning');
  var checkbox = state.transaction.get('checkbox');
  return {
    confirmBroadcastOperation: confirmBroadcastOperation,
    confirmErrorCallback: confirmErrorCallback,
    confirm: confirm,
    warning: warning,
    checkbox: checkbox
  };
}, // mapDispatchToProps
function (dispatch) {
  return {
    okClick: function okClick(confirmBroadcastOperation) {
      dispatch(transactionActions.hideConfirm());
      dispatch(transactionActions.broadcastOperation(_objectSpread({}, confirmBroadcastOperation.toJS())));
    }
  };
})(ConfirmTransactionForm);

exports["default"] = _default;