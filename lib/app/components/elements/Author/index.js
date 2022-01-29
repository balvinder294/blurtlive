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

var _reactDom = _interopRequireWildcard(require("react-dom"));

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

var _reactRouter = require("react-router");

var _ComponentFormatters = require("app/utils/ComponentFormatters");

var _AuthorDropdown = _interopRequireDefault(require("../AuthorDropdown"));

var _NormalizeProfile = _interopRequireDefault(require("app/utils/NormalizeProfile"));

var _AffiliationMap = _interopRequireDefault(require("app/utils/AffiliationMap"));

var _counterpart = _interopRequireDefault(require("counterpart"));

var _Overlay = _interopRequireDefault(require("react-overlays/lib/Overlay"));

var _Blacklist = _interopRequireDefault(require("../Blacklist"));

var _reactRedux = require("react-redux");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var string = _propTypes["default"].string,
    bool = _propTypes["default"].bool,
    number = _propTypes["default"].number;
var closers = [];

var fnCloseAll = function fnCloseAll() {
  var close;

  while (close = closers.shift()) {
    close();
  }
};

var Author = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Author, _React$Component);

  var _super = _createSuper(Author);

  function Author() {
    var _this;

    (0, _classCallCheck2["default"])(this, Author);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggle", function (e) {
      if (!(e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        var show = !_this.state.show;
        fnCloseAll();

        if (show) {
          _this.setState({
            show: show
          });

          closers.push(_this.close);
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "close", function () {
      _this.setState({
        show: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Author'));
    _this.state = {
      show: false
    };
    _this.toggle = _this.toggle.bind((0, _assertThisInitialized2["default"])(_this));
    _this.close = _this.close.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Author, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.authorProfileLink) {
        return;
      }

      var node = _reactDom["default"].findDOMNode(this.authorProfileLink);

      if (node.addEventListener) {
        node.addEventListener('click', this.toggle, false);
      } else {
        node.attachEvent('click', this.toggle, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.authorProfileLink) {
        return;
      }

      var node = _reactDom["default"].findDOMNode(this.authorProfileLink);

      if (node.removeEventListener) {
        node.removeEventListener('click', this.toggle);
      } else {
        node.detachEvent('click', this.toggle);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          author = _this$props.author,
          follow = _this$props.follow,
          mute = _this$props.mute,
          authorRepLog10 = _this$props.authorRepLog10,
          showAffiliation = _this$props.showAffiliation; // html

      var username = this.props.username; // redux

      var _ref = this.props.account ? (0, _NormalizeProfile["default"])(this.props.account.toJS()) : {},
          name = _ref.name,
          about = _ref.about;

      if (!(follow || mute) || username === author) {
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: "author",
          itemProp: "author",
          itemScope: true,
          itemType: "http://schema.org/Person"
        }, /*#__PURE__*/_react["default"].createElement("strong", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: '/@' + author
        }, author)), ' ', /*#__PURE__*/_react["default"].createElement(_Blacklist["default"], {
          author: author
        }), showAffiliation && _AffiliationMap["default"][author] ? /*#__PURE__*/_react["default"].createElement("span", {
          className: "affiliation"
        }, (0, _counterpart["default"])('g.affiliation_' + _AffiliationMap["default"][author])) : null);
      }

      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "Author"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        itemProp: "author",
        itemScope: true,
        itemType: "http://schema.org/Person"
      }, /*#__PURE__*/_react["default"].createElement("strong", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        className: "ptc",
        ref: function ref(link) {
          _this2.authorProfileLink = link;
        },
        to: '/@' + author
      }, author, showAffiliation && _AffiliationMap["default"][author] ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "affiliation"
      }, (0, _counterpart["default"])('g.affiliation_' + _AffiliationMap["default"][author])) : null, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "dropdown-arrow"
      })))), /*#__PURE__*/_react["default"].createElement(_Overlay["default"], {
        show: this.state.show,
        onHide: this.close,
        placement: "bottom",
        container: this,
        target: function target() {
          return (0, _reactDom.findDOMNode)(_this2.target);
        },
        rootClose: true
      }, /*#__PURE__*/_react["default"].createElement(_AuthorDropdown["default"], {
        author: author,
        follow: follow,
        mute: mute,
        authorRepLog10: authorRepLog10,
        name: name,
        about: about,
        username: username
      })));
    }
  }]);
  return Author;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Author, "propTypes", {
  author: string.isRequired,
  follow: bool,
  mute: bool,
  authorRepLog10: number,
  showAffiliation: bool
});
(0, _defineProperty2["default"])(Author, "defaultProps", {
  follow: true,
  mute: true,
  showAffiliation: false
});

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var author = ownProps.author,
      follow = ownProps.follow,
      mute = ownProps.mute,
      authorRepLog10 = ownProps.authorRepLog10;
  var username = state.user.getIn(['current', 'username']);
  var account = state.global.getIn(['accounts', author]);
  return {
    author: author,
    follow: follow,
    mute: mute,
    authorRepLog10: authorRepLog10,
    username: username,
    account: account
  };
})(Author);

exports["default"] = _default;