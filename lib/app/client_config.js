"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WIKI_URL = exports.WHITEPAPER_URL = exports.VEST_TICKER = exports.VESTING_TOKEN = exports.TWITTER_SHARE_IMAGE = exports.TWITTER_HANDLE = exports.TERMS_OF_SERVICE_URL = exports.SUPPORT_EMAIL = exports.SITE_DESCRIPTION = exports.SHARE_IMAGE = exports.RECOMMENDED_FOLLOW_ACCOUNT = exports.PRIVACY_POLICY_URL = exports.LIQUID_TOKEN_UPPERCASE = exports.LIQUID_TOKEN = exports.LIQUID_TICKER = exports.LANDING_PAGE_URL = exports.INVEST_TOKEN_UPPERCASE = exports.INVEST_TOKEN_SHORT = exports.DEFAULT_LANGUAGE = exports.DEFAULT_CURRENCY = exports.DEBT_TOKEN_SHORT = exports.DEBT_TOKENS = exports.DEBT_TOKEN = exports.DEBT_TICKER = exports.CURRENCY_SIGN = exports.APP_URL = exports.APP_NAME_UPPERCASE = exports.APP_NAME_LATIN = exports.APP_NAME = exports.APP_ICON = exports.APP_DOMAIN = exports.ALLOWED_CURRENCIES = void 0;
// sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier
var APP_NAME = 'Blurt'; // sometimes APP_NAME is written in non-latin characters, but they are needed for technical purposes
// ie. "Голос" > "Golos"

exports.APP_NAME = APP_NAME;
var APP_NAME_LATIN = 'Blurt';
exports.APP_NAME_LATIN = APP_NAME_LATIN;
var APP_NAME_UPPERCASE = 'BLURT';
exports.APP_NAME_UPPERCASE = APP_NAME_UPPERCASE;
var APP_ICON = 'blurt'; // FIXME figure out best way to do this on both client and server from env
// vars. client should read $STM_Config, server should read config package.

exports.APP_ICON = APP_ICON;
var APP_URL = 'https://blurt.world/';
exports.APP_URL = APP_URL;
var APP_DOMAIN = 'blurt.world';
exports.APP_DOMAIN = APP_DOMAIN;
var LIQUID_TOKEN = 'Blurt'; // sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier

exports.LIQUID_TOKEN = LIQUID_TOKEN;
var LIQUID_TOKEN_UPPERCASE = 'BLURT';
exports.LIQUID_TOKEN_UPPERCASE = LIQUID_TOKEN_UPPERCASE;
var VESTING_TOKEN = 'BLURT POWER';
exports.VESTING_TOKEN = VESTING_TOKEN;
var INVEST_TOKEN_UPPERCASE = 'BLURT POWER';
exports.INVEST_TOKEN_UPPERCASE = INVEST_TOKEN_UPPERCASE;
var INVEST_TOKEN_SHORT = 'BP';
exports.INVEST_TOKEN_SHORT = INVEST_TOKEN_SHORT;
var DEBT_TOKEN = 'BLURT DOLLAR';
exports.DEBT_TOKEN = DEBT_TOKEN;
var DEBT_TOKENS = 'BLURT DOLLARS';
exports.DEBT_TOKENS = DEBT_TOKENS;
var CURRENCY_SIGN = '$';
exports.CURRENCY_SIGN = CURRENCY_SIGN;
var WIKI_URL = ''; // https://wiki.blurt.world/

exports.WIKI_URL = WIKI_URL;
var LANDING_PAGE_URL = 'https://blurt.world/';
exports.LANDING_PAGE_URL = LANDING_PAGE_URL;
var TERMS_OF_SERVICE_URL = 'https://' + APP_DOMAIN + '/tos.html';
exports.TERMS_OF_SERVICE_URL = TERMS_OF_SERVICE_URL;
var PRIVACY_POLICY_URL = 'https://' + APP_DOMAIN + '/privacy.html';
exports.PRIVACY_POLICY_URL = PRIVACY_POLICY_URL;
var WHITEPAPER_URL = 'https://blurt.world/WhitePaper.pdf'; // these are dealing with asset types, not displaying to client, rather sending data over websocket

exports.WHITEPAPER_URL = WHITEPAPER_URL;
var LIQUID_TICKER = 'BLURT';
exports.LIQUID_TICKER = LIQUID_TICKER;
var VEST_TICKER = 'VESTS';
exports.VEST_TICKER = VEST_TICKER;
var DEBT_TICKER = 'BLURT';
exports.DEBT_TICKER = DEBT_TICKER;
var DEBT_TOKEN_SHORT = 'SBD'; // application settings

exports.DEBT_TOKEN_SHORT = DEBT_TOKEN_SHORT;
var DEFAULT_LANGUAGE = 'en'; // used on application internationalization bootstrap

exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
var DEFAULT_CURRENCY = 'USD';
exports.DEFAULT_CURRENCY = DEFAULT_CURRENCY;
var ALLOWED_CURRENCIES = ['USD']; // meta info

exports.ALLOWED_CURRENCIES = ALLOWED_CURRENCIES;
var TWITTER_HANDLE = '@blurt';
exports.TWITTER_HANDLE = TWITTER_HANDLE;
var SHARE_IMAGE = 'https://' + APP_DOMAIN + '/images/steemit-share.png';
exports.SHARE_IMAGE = SHARE_IMAGE;
var TWITTER_SHARE_IMAGE = 'https://' + APP_DOMAIN + '/images/steemit-twshare.png';
exports.TWITTER_SHARE_IMAGE = TWITTER_SHARE_IMAGE;
var SITE_DESCRIPTION = 'Blurt is a social media platform where everyone gets paid for ' + 'creating and curating content. It leverages a robust digital points system, called Blurt, that ' + 'supports real value for digital rewards through market price discovery and liquidity'; // various

exports.SITE_DESCRIPTION = SITE_DESCRIPTION;
var SUPPORT_EMAIL = 'info@blurt.foundation';
exports.SUPPORT_EMAIL = SUPPORT_EMAIL;
var RECOMMENDED_FOLLOW_ACCOUNT = 'blurt.world';
exports.RECOMMENDED_FOLLOW_ACCOUNT = RECOMMENDED_FOLLOW_ACCOUNT;