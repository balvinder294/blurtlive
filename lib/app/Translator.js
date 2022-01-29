"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormattedHTMLMessage = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactIntl = require("react-intl");

var _en = _interopRequireDefault(require("react-intl/locale-data/en"));

var _es = _interopRequireDefault(require("react-intl/locale-data/es"));

var _ru = _interopRequireDefault(require("react-intl/locale-data/ru"));

var _fr = _interopRequireDefault(require("react-intl/locale-data/fr"));

var _it = _interopRequireDefault(require("react-intl/locale-data/it"));

var _ko = _interopRequireDefault(require("react-intl/locale-data/ko"));

var _zh = _interopRequireDefault(require("react-intl/locale-data/zh"));

var _pl = _interopRequireDefault(require("react-intl/locale-data/pl"));

var _ja = _interopRequireDefault(require("react-intl/locale-data/ja"));

var _client_config = require("app/client_config");

var _counterpart = _interopRequireDefault(require("counterpart"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

(0, _reactIntl.addLocaleData)([].concat((0, _toConsumableArray2["default"])(_en["default"]), (0, _toConsumableArray2["default"])(_es["default"]), (0, _toConsumableArray2["default"])(_ru["default"]), (0, _toConsumableArray2["default"])(_fr["default"]), (0, _toConsumableArray2["default"])(_it["default"]), (0, _toConsumableArray2["default"])(_ko["default"]), (0, _toConsumableArray2["default"])(_zh["default"]), (0, _toConsumableArray2["default"])(_pl["default"]), (0, _toConsumableArray2["default"])(_ja["default"])));

_counterpart["default"].registerTranslations('en', require('counterpart/locales/en'));

_counterpart["default"].registerTranslations('en', require('app/locales/en.json'));

_counterpart["default"].registerTranslations('es', require('app/locales/counterpart/es'));

_counterpart["default"].registerTranslations('es', require('app/locales/es.json'));

_counterpart["default"].registerTranslations('ru', require('counterpart/locales/ru'));

_counterpart["default"].registerTranslations('ru', require('app/locales/ru.json'));

_counterpart["default"].registerTranslations('fr', require('app/locales/counterpart/fr'));

_counterpart["default"].registerTranslations('fr', require('app/locales/fr.json'));

_counterpart["default"].registerTranslations('it', require('app/locales/counterpart/it'));

_counterpart["default"].registerTranslations('it', require('app/locales/it.json'));

_counterpart["default"].registerTranslations('ko', require('app/locales/counterpart/ko'));

_counterpart["default"].registerTranslations('ko', require('app/locales/ko.json'));

_counterpart["default"].registerTranslations('zh', require('app/locales/counterpart/zh'));

_counterpart["default"].registerTranslations('zh', require('app/locales/zh.json'));

_counterpart["default"].registerTranslations('pl', require('app/locales/counterpart/pl'));

_counterpart["default"].registerTranslations('pl', require('app/locales/pl.json'));

_counterpart["default"].registerTranslations('ja', require('app/locales/counterpart/ja'));

_counterpart["default"].registerTranslations('ja', require('app/locales/ja.json'));

if (process.env.NODE_ENV === 'production') {
  _counterpart["default"].setFallbackLocale('en');
}

var Translator = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Translator, _React$Component);

  var _super = _createSuper(Translator);

  function Translator() {
    (0, _classCallCheck2["default"])(this, Translator);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Translator, [{
    key: "render",
    value: function render() {
      var language = this.props.locale;

      _counterpart["default"].setLocale(language);

      return /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider // to ensure dynamic language change, "key" property with same "locale" info must be added
      // see: https://github.com/yahoo/react-intl/wiki/Components#multiple-intl-contexts
      , {
        key: language,
        locale: language,
        defaultLocale: _client_config.DEFAULT_LANGUAGE
      }, this.props.children);
    }
  }]);
  return Translator;
}(_react["default"].Component);

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var locale = state.app.getIn(['user_preferences', 'locale']);
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    locale: locale
  });
})(Translator);

exports["default"] = _default;

var FormattedHTMLMessage = function FormattedHTMLMessage(_ref) {
  var id = _ref.id,
      params = _ref.params,
      className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: 'FormattedHTMLMessage' + (className ? " ".concat(className) : ''),
    dangerouslySetInnerHTML: {
      __html: (0, _counterpart["default"])(id, params)
    }
  });
};

exports.FormattedHTMLMessage = FormattedHTMLMessage;