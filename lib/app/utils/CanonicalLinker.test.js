"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _CanonicalLinker = require("./CanonicalLinker");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

describe('makeCanonicalLink', function () {
  var post_data = {
    author: 'test',
    permlink: 'test-post',
    category: 'testing',
    link: '/testing/@test/test-post'
  };
  var test_cases = [['handles posts without app', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {}
  }), 'https://blurt.world/testing/@test/test-post'], ['handles empty strings as app', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: ''
    }
  }), 'https://blurt.world/testing/@test/test-post'], ["handles apps that don't exist", _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'fakeapp/1.2.3'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ["handles app that don't exist without version", _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'fakeapp'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ['handles apps that do exist', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'busy/1.1.1'
    }
  }), 'https://busy.org/@test/test-post'], ['handles posts from steemit', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'blurt/0.1'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ['handles badly formatted app strings', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'fakeapp/0.0.1/a////'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ['handles objects as apps', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: {
        this_is: 'an objct'
      }
    }
  }), 'https://blurt.world/testing/@test/test-post']];
  test_cases.forEach(function (v) {
    it(v[0], function () {
      expect((0, _CanonicalLinker.makeCanonicalLink)(v[1])).toBe(v[2]);
    });
  });
});