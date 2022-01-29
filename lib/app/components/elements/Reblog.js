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

var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));

var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

var _counterpart = _interopRequireDefault(require("counterpart"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var string = _propTypes["default"].string,
    func = _propTypes["default"].func;

var Reblog = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Reblog, _React$Component);

  var _super = _createSuper(Reblog);

  function Reblog(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Reblog);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reblog", function (e) {
      e.preventDefault();
      if (_this.state.active) return;

      _this.setState({
        loading: true
      });

      var _this$props = _this.props,
          reblog = _this$props.reblog,
          account = _this$props.account,
          author = _this$props.author,
          parent_author = _this$props.parent_author,
          permlink = _this$props.permlink,
          bandwidth_kbytes_fee = _this$props.bandwidth_kbytes_fee,
          operation_flat_fee = _this$props.operation_flat_fee;
      reblog(account, author, permlink, operation_flat_fee, bandwidth_kbytes_fee, function () {
        _this.setState({
          active: true,
          loading: false
        });

        _this.setReblogged(account);
      }, function () {
        _this.setState({
          active: false,
          loading: false
        });
      });
    });
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Reblog');
    _this.state = {
      active: false,
      loading: false
    };
    return _this;
  }

  (0, _createClass2["default"])(Reblog, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var account = this.props.account;

      if (account) {
        this.setState({
          active: this.isReblogged(account)
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.account) {
        this.setState({
          active: this.isReblogged(nextProps.account)
        });
      }
    }
  }, {
    key: "isReblogged",
    value: function isReblogged(account) {
      var _this$props2 = this.props,
          author = _this$props2.author,
          permlink = _this$props2.permlink;
      return getRebloggedList(account).includes(author + '/' + permlink);
    }
  }, {
    key: "setReblogged",
    value: function setReblogged(account) {
      var _this$props3 = this.props,
          author = _this$props3.author,
          permlink = _this$props3.permlink;
      clearRebloggedCache();
      var posts = getRebloggedList(account);
      posts.push(author + '/' + permlink);
      if (posts.length > 200) posts.shift(1);
      localStorage.setItem('reblogged_' + account, JSON.stringify(posts));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.author == this.props.account || this.props.parent_author) return null;
      var state = this.state.active ? 'active' : 'inactive';
      var loading = this.state.loading ? ' loading' : '';
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: 'Reblog__button Reblog__button-' + state + loading
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.reblog,
        title: (0, _counterpart["default"])('g.reblog')
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "reblog"
      })));
    }
  }]);
  return Reblog;
}(_react["default"].Component);

exports["default"] = Reblog;
(0, _defineProperty2["default"])(Reblog, "propTypes", {
  account: string,
  author: string,
  parent_author: string,
  permlink: string,
  reblog: func
});
module.exports = (0, _reactRedux.connect)(function (state, ownProps) {
  var account = state.user.getIn(['current', 'username']) || state.offchain.get('account');
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    account: account,
    operation_flat_fee: state.global.getIn(['props', 'operation_flat_fee']),
    bandwidth_kbytes_fee: state.global.getIn(['props', 'bandwidth_kbytes_fee'])
  });
}, function (dispatch) {
  return {
    reblog: function reblog(account, author, permlink, operationFlatFee, bandwidthKbytesFee, successCallback, errorCallback) {
      var json = ['reblog', {
        account: account,
        author: author,
        permlink: permlink
      }];
      var operation = {
        id: 'follow',
        required_posting_auths: [account],
        json: JSON.stringify(json),
        __config: {
          title: (0, _counterpart["default"])('g.resteem_this_post')
        }
      };
      var size = JSON.stringify(operation).replace(/[\[\]\,\"]/g, '').length;
      var bw_fee = Math.max(0.001, (size / 1024 * bandwidthKbytesFee).toFixed(3));
      var fee = (operationFlatFee + bw_fee).toFixed(3);
      dispatch(transactionActions.broadcastOperation({
        type: 'custom_json',
        confirm: (0, _counterpart["default"])('g.operation_cost', {
          fee: fee
        }),
        operation: operation,
        successCallback: successCallback,
        errorCallback: errorCallback
      }));
    }
  };
})(Reblog);
var lastAccount;
var cachedPosts;

function getRebloggedList(account) {
  if (!process.env.BROWSER) return [];
  if (lastAccount === account) return cachedPosts;
  lastAccount = account;
  var posts = localStorage.getItem('reblogged_' + account);

  try {
    cachedPosts = JSON.parse(posts) || [];
  } catch (e) {
    cachedPosts = [];
  }

  return cachedPosts;
}

function clearRebloggedCache() {
  lastAccount = null;
}