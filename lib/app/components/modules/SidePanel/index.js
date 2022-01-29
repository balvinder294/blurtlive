"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _counterpart = _interopRequireDefault(require("counterpart"));

var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

var _reactRouter = require("react-router");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var SidePanel = function SidePanel(_ref) {
  var alignment = _ref.alignment,
      visible = _ref.visible,
      hideSidePanel = _ref.hideSidePanel,
      username = _ref.username,
      walletUrl = _ref.walletUrl;

  if (process.env.BROWSER) {
    visible && document.addEventListener('click', hideSidePanel);
    !visible && document.removeEventListener('click', hideSidePanel);
  }

  var loggedIn = username === undefined ? 'show-for-small-only' : 'SidePanel__hide-signup';

  var makeLink = function makeLink(i, ix, arr) {
    // A link is internal if it begins with a slash
    var isExternal = !i.link.match(/^\//) || i.isExternal;

    if (isExternal) {
      var cn = ix === arr.length - 1 ? 'last' : null;
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: i.value,
        className: cn
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: i.link,
        target: i.internal ? null : '_blank',
        rel: "noopener noreferrer"
      }, i.label, "\xA0", /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "extlink"
      })));
    } else {
      var _cn = ix === arr.length - 1 ? 'last' : null;

      return /*#__PURE__*/_react["default"].createElement("li", {
        key: i.value,
        className: _cn
      }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: i.link
      }, i.label));
    }
  };

  var sidePanelLinks = {
    internal: [{
      value: 'welcome',
      label: (0, _counterpart["default"])('navigation.welcome'),
      link: 'https://blurtwallet.com/welcome'
    }, {
      value: 'faq',
      label: (0, _counterpart["default"])('navigation.faq'),
      link: 'https://blurtwallet.com/faq.html'
    }, {
      value: 'tags',
      label: (0, _counterpart["default"])('navigation.explore'),
      link: '/tags'
    }, {
      value: 'dapps',
      label: 'Dapps',
      link: '/dapps'
    }, {
      value: 'change_password',
      label: (0, _counterpart["default"])('navigation.change_account_password'),
      link: "".concat(walletUrl, "/change_password")
    }, {
      value: 'account_recovery_tools',
      label: (0, _counterpart["default"])('navigation.account_recovery_tools'),
      link: 'https://recovery.blurtwallet.com'
    }, {
      value: 'vote_for_witnesses',
      label: (0, _counterpart["default"])('navigation.vote_for_witnesses'),
      link: "".concat(walletUrl, "/~witnesses")
    }],
    exchanges: [{
      value: 'probit',
      label: 'Probit',
      link: 'https://www.probit.com/app/exchange/BLURT-BTC/r/54051558'
    }, {
      value: 'ionomy',
      label: 'Ionomy',
      link: 'https://exchange.ionomy.com/en/markets/btc-blurt'
    }, {
      value: 'robiniaswap',
      label: 'Robinia Swap',
      link: 'https://robiniaswap.com/'
    }, {
      value: 'beldex',
      label: 'Beldex',
      link: 'https://www.beldex.io/tradeAdvance?pair=BLURT_BTC'
    }, {
      value: 'stex',
      label: 'Stex',
      link: 'https://app.stex.com/en/trade/pair/BTC/BLURT/1D'
    }, {
      value: 'hive-engine',
      label: 'Hive Engine',
      link: 'https://hive-engine.com/?p=market&t=SWAP.BLURT'
    }, // {
    //     value: 'steem-engine',
    //     label: 'Steem Engine',
    //     link: 'https://steem-engine.net/?p=market&t=BLURT',
    // },
    {
      value: 'leodex',
      label: 'Leodex',
      link: 'https://leodex.io/market/SWAP.BLURT'
    }, {
      value: 'tribaldex',
      label: 'Tribaldex',
      link: 'https://tribaldex.com/trade/SWAP.BLURT'
    }],
    external: [{
      value: 'gitlab',
      label: 'GitLab',
      link: 'https://gitlab.com/blurt/blurt/'
    }, {
      value: 'chat',
      label: (0, _counterpart["default"])('navigation.chat'),
      link: 'https://discord.blurt.world/'
    }],
    block_explorers: [{
      value: 'blurt_explorer',
      label: 'Blurt Explorer',
      link: 'https://blocks.blurtwallet.com'
    }, {
      value: 'ecosynthesizer',
      label: 'Ecosynthesizer',
      link: 'https://ecosynthesizer.com/blurt/'
    } // {
    //     value: 'api_docs',
    //     label: tt('navigation.api_docs'),
    //     link: 'https://developers.steem.io/',
    // },
    ],
    organizational: [// {
    //     value: 'bluepaper',
    //     label: tt('navigation.bluepaper'),
    //     link: 'https://steem.io/steem-bluepaper.pdf',
    // },
    // {
    //     value: 'smt_whitepaper',
    //     label: tt('navigation.smt_whitepaper'),
    //     link: 'https://smt.steem.io/',
    // },
    // {
    //     value: 'whitepaper',
    //     label: tt('navigation.whitepaper'),
    //     link: 'https://steem.io/SteemWhitePaper.pdf',
    // },
    {
      value: 'about',
      label: (0, _counterpart["default"])('navigation.about'),
      link: '/about.html',
      internal: true
    }],
    legal: [{
      value: 'privacy',
      label: (0, _counterpart["default"])('navigation.privacy_policy'),
      link: '/privacy.html'
    }, {
      value: 'tos',
      label: (0, _counterpart["default"])('navigation.terms_of_service'),
      link: '/tos.html'
    }],
    extras: [{
      value: 'login',
      label: (0, _counterpart["default"])('g.sign_in'),
      link: '/login.html'
    }, {
      value: 'signup',
      label: (0, _counterpart["default"])('g.sign_up'),
      link: 'https://signup.blurtwallet.com'
    }, {
      value: 'post',
      label: (0, _counterpart["default"])('g.post'),
      link: '/submit.html'
    }],
    swag: [{
      value: 'logo-merch',
      label: 'Logo Merch',
      link: 'https://www.redbubble.com/shop/ap/51822392'
    }, {
      value: 'text-merch',
      label: 'Text Merch',
      link: 'https://www.redbubble.com/shop/ap/51897803'
    }]
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "SidePanel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (visible ? 'visible ' : '') + alignment
  }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
    onClick: hideSidePanel
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu ".concat(loggedIn)
  }, sidePanelLinks.extras.map(makeLink)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu"
  }, sidePanelLinks.internal.map(makeLink)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu"
  }, sidePanelLinks.external.map(makeLink)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu"
  }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    className: "menu-section"
  }, "Block Explorers")), sidePanelLinks.block_explorers.map(makeLink)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu"
  }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    className: "menu-section"
  }, (0, _counterpart["default"])('navigation.third_party_exchanges'))), sidePanelLinks.exchanges.map(makeLink)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu"
  }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    className: "menu-section"
  }, (0, _counterpart["default"])('navigation.blurt_swag'))), sidePanelLinks.swag.map(makeLink)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu"
  }, sidePanelLinks.organizational.map(makeLink)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "vertical menu"
  }, sidePanelLinks.legal.map(makeLink))));
};

SidePanel.propTypes = {
  alignment: _propTypes["default"].oneOf(['left', 'right']).isRequired,
  visible: _propTypes["default"].bool.isRequired,
  hideSidePanel: _propTypes["default"].func.isRequired,
  username: _propTypes["default"].string
};
SidePanel.defaultProps = {
  username: undefined
};

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var walletUrl = state.app.get('walletUrl');
  return _objectSpread({
    walletUrl: walletUrl
  }, ownProps);
}, function (dispatch) {
  return {};
})(SidePanel);

exports["default"] = _default;