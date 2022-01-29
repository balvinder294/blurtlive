"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _effects = require("redux-saga/effects");

var _blurtjs = require("@blurtfoundation/blurtjs");

var appActions = _interopRequireWildcard(require("./AppReducer"));

var globalActions = _interopRequireWildcard(require("./GlobalReducer"));

var _constants = _interopRequireDefault(require("./constants"));

var _FetchDataSaga = require("./FetchDataSaga");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('FetchDataSaga', function () {
  describe('should fetch multiple and filter', function () {
    var payload = {
      order: 'by_author',
      author: 'alice',
      permlink: 'hair',
      accountname: 'bob',
      postFilter: function postFilter(value) {
        return value.author === 'bob';
      }
    };
    var action = {
      category: '',
      payload: payload
    };
    _constants["default"].FETCH_DATA_BATCH_SIZE = 2;
    var gen = (0, _FetchDataSaga.fetchData)(action);
    it('should signal data fetch', function () {
      var actual = gen.next().value;
      expect(actual).toEqual((0, _effects.put)(globalActions.fetchingData({
        order: 'by_author',
        category: ''
      })));
    });
    it('should call discussions by blog', function () {
      var actual = gen.next().value;
      expect(actual).toEqual((0, _effects.put)(appActions.fetchDataBegin()));
      actual = gen.next().value;
      expect(actual).toEqual((0, _effects.call)([_blurtjs.api, _blurtjs.api.getDiscussionsByBlogAsync], {
        tag: payload.accountname,
        limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
        start_author: payload.author,
        start_permlink: payload.permlink
      }));
    });
    it('should continue fetching data filtering 1 out', function () {
      var actual = gen.next([{
        author: 'alice'
      }, {
        author: 'bob',
        permlink: 'post1'
      }]).value;
      expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
        data: [{
          author: 'alice'
        }, {
          author: 'bob',
          permlink: 'post1'
        }],
        order: 'by_author',
        category: '',
        author: 'alice',
        firstPermlink: payload.permlink,
        accountname: 'bob',
        fetching: true,
        endOfData: false
      })));
    });
    it('should finish fetching data filtering 1 out', function () {
      var actual = gen.next().value;
      expect(actual).toEqual((0, _effects.call)([_blurtjs.api, _blurtjs.api.getDiscussionsByBlogAsync], {
        tag: payload.accountname,
        limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
        start_author: 'bob',
        start_permlink: 'post1'
      }));
      actual = gen.next([{
        author: 'bob',
        permlink: 'post2'
      }]).value;
      expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
        data: [{
          author: 'bob',
          permlink: 'post2'
        }],
        order: 'by_author',
        category: '',
        author: 'alice',
        firstPermlink: payload.permlink,
        accountname: 'bob',
        fetching: false,
        endOfData: true
      })));
      actual = gen.next().value;
      expect(actual).toEqual((0, _effects.put)(appActions.fetchDataEnd()));
    });
  });
  describe('should not fetch more batches than max batch size', function () {
    var payload = {
      order: 'by_author',
      author: 'alice',
      permlink: 'hair',
      accountname: 'bob',
      postFilter: function postFilter(value) {
        return value.author === 'bob';
      }
    };
    var action = {
      category: '',
      payload: payload
    };
    _constants["default"].FETCH_DATA_BATCH_SIZE = 2;
    _constants["default"].MAX_BATCHES = 2;
    var gen = (0, _FetchDataSaga.fetchData)(action);
    var actual = gen.next().value;
    expect(actual).toEqual((0, _effects.put)(globalActions.fetchingData({
      order: 'by_author',
      category: ''
    })));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.put)(appActions.fetchDataBegin()));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.call)([_blurtjs.api, _blurtjs.api.getDiscussionsByBlogAsync], {
      tag: payload.accountname,
      limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
      start_author: payload.author,
      start_permlink: payload.permlink
    })); // these all will not satisfy the filter

    actual = gen.next([{
      author: 'alice'
    }, {
      author: 'alice'
    }]).value;
    expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
      data: [{
        author: 'alice'
      }, {
        author: 'alice'
      }],
      order: 'by_author',
      category: '',
      author: 'alice',
      firstPermlink: payload.permlink,
      accountname: 'bob',
      fetching: true,
      endOfData: false
    })));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.call)([_blurtjs.api, _blurtjs.api.getDiscussionsByBlogAsync], {
      tag: payload.accountname,
      limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
      start_author: 'alice'
    }));
    actual = gen.next([{
      author: 'alice'
    }, {
      author: 'alice'
    }]).value;
    expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
      data: [{
        author: 'alice'
      }, {
        author: 'alice'
      }],
      order: 'by_author',
      category: '',
      author: 'alice',
      firstPermlink: payload.permlink,
      accountname: 'bob',
      fetching: false,
      endOfData: false
    })));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.put)(appActions.fetchDataEnd()));
  });
});