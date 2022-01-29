"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

var _counterpart = _interopRequireDefault(require("counterpart"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var VotesAndComments = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(VotesAndComments, _React$Component);

  var _super = _createSuper(VotesAndComments);

  function VotesAndComments(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, VotesAndComments);
    _this = _super.call(this, props);
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'VotesAndComments');
    return _this;
  }

  (0, _createClass2["default"])(VotesAndComments, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          comments = _this$props.comments,
          commentsLink = _this$props.commentsLink,
          totalVotes = _this$props.totalVotes;
      var comments_tooltip = (0, _counterpart["default"])('votesandcomments_jsx.no_responses_yet_click_to_respond');
      if (comments > 0) comments_tooltip = (0, _counterpart["default"])('votesandcomments_jsx.response_count_tooltip', {
        count: comments
      });
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "VotesAndComments"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: 'VotesAndComments__comments' + (comments === 0 ? ' no-comments' : '')
      }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: commentsLink,
        title: comments_tooltip
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: comments > 1 ? 'chatboxes' : 'chatbox'
      }), "\xA0", comments)));
    }
  }]);
  return VotesAndComments;
}(_react["default"].Component);

(0, _defineProperty2["default"])(VotesAndComments, "propTypes", {
  // HTML properties
  post: _propTypes["default"].string.isRequired,
  commentsLink: _propTypes["default"].string.isRequired,
  // Redux connect properties
  comments: _propTypes["default"].number,
  totalVotes: _propTypes["default"].number
});

var _default = (0, _reactRedux.connect)(function (state, props) {
  var post = state.global.getIn(['content', props.post]);
  if (!post) return props;
  return _objectSpread(_objectSpread({}, props), {}, {
    totalVotes: post.getIn(['stats', 'total_votes']),
    comments: post.get('children')
  });
})(VotesAndComments);

exports["default"] = _default;