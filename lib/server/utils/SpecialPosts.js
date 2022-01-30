"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specialPosts = specialPosts;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var config = _interopRequireWildcard(require("config"));

var https = _interopRequireWildcard(require("https"));

var blurtjs = _interopRequireWildcard(require("@blurtfoundation/blurtjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Load special posts - including notices,contests, featured, and promoted.
 *
 * @returns {promise} resolves to object of {featured_posts:[], promoted_posts:[], notices:[], contests: []}
 */
function loadSpecialPosts() {
  return new Promise(function (resolve, reject) {
    var emptySpecialPosts = {
      featured_posts: [],
      promoted_posts: [],
      notices: [],
      contests: []
    };

    if (!config.special_posts_url) {
      resolve(emptySpecialPosts);
      return;
    }

    var request = https.get(config.special_posts_url, function (resp) {
      var data = '';
      resp.on('data', function (chunk) {
        data += chunk;
      });
      resp.on('end', function () {
        var json = JSON.parse(data);
        console.info('Received special posts payload', json);

        if (json === Object(json)) {
          resolve(json);
        }
      });
    });
    request.on('error', function (e) {
      console.error('Could not load special posts', e);
      resolve(emptySpecialPosts);
    });
  });
}
/**
 * [async] Get special posts - including notices, featured, and promoted.
 *
 * @returns {object} object of {featured_posts:[], promoted_posts:[], notices:[]}
 */


function specialPosts() {
  return _specialPosts.apply(this, arguments);
}

function _specialPosts() {
  _specialPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var postData, loadedPostData, _iterator, _step, url, _url$split$1$split, _url$split$1$split2, username, postId, post, _iterator2, _step2, _url, _url$split$1$split3, _url$split$1$split4, _username, _postId, _post, _iterator3, _step3, notice, _notice$permalink$spl, _notice$permalink$spl2, _username2, _postId2, _post2, _iterator4, _step4, contest, _contest$permalink$sp, _contest$permalink$sp2, _username3, _postId3, _post3;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.info('Loading special posts');
            _context.next = 3;
            return loadSpecialPosts();

          case 3:
            postData = _context.sent;
            console.info('Loading special posts', postData);
            loadedPostData = {
              featured_posts: [],
              promoted_posts: [],
              notices: [],
              contests: []
            };
            _iterator = _createForOfIteratorHelper(postData.featured_posts);
            _context.prev = 7;

            _iterator.s();

          case 9:
            if ((_step = _iterator.n()).done) {
              _context.next = 19;
              break;
            }

            url = _step.value;
            _url$split$1$split = url.split('@')[1].split('/'), _url$split$1$split2 = (0, _slicedToArray2["default"])(_url$split$1$split, 2), username = _url$split$1$split2[0], postId = _url$split$1$split2[1];
            _context.next = 14;
            return blurtjs.api.getContentAsync(username, postId);

          case 14:
            post = _context.sent;
            post.special = true;
            loadedPostData.featured_posts.push(post);

          case 17:
            _context.next = 9;
            break;

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](7);

            _iterator.e(_context.t0);

          case 24:
            _context.prev = 24;

            _iterator.f();

            return _context.finish(24);

          case 27:
            _iterator2 = _createForOfIteratorHelper(postData.promoted_posts);
            _context.prev = 28;

            _iterator2.s();

          case 30:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 40;
              break;
            }

            _url = _step2.value;
            _url$split$1$split3 = _url.split('@')[1].split('/'), _url$split$1$split4 = (0, _slicedToArray2["default"])(_url$split$1$split3, 2), _username = _url$split$1$split4[0], _postId = _url$split$1$split4[1];
            _context.next = 35;
            return blurtjs.api.getContentAsync(_username, _postId);

          case 35:
            _post = _context.sent;
            _post.special = true;
            loadedPostData.promoted_posts.push(_post);

          case 38:
            _context.next = 30;
            break;

          case 40:
            _context.next = 45;
            break;

          case 42:
            _context.prev = 42;
            _context.t1 = _context["catch"](28);

            _iterator2.e(_context.t1);

          case 45:
            _context.prev = 45;

            _iterator2.f();

            return _context.finish(45);

          case 48:
            _iterator3 = _createForOfIteratorHelper(postData.notices);
            _context.prev = 49;

            _iterator3.s();

          case 51:
            if ((_step3 = _iterator3.n()).done) {
              _context.next = 64;
              break;
            }

            notice = _step3.value;

            if (!notice.permalink) {
              _context.next = 61;
              break;
            }

            _notice$permalink$spl = notice.permalink.split('@')[1].split('/'), _notice$permalink$spl2 = (0, _slicedToArray2["default"])(_notice$permalink$spl, 2), _username2 = _notice$permalink$spl2[0], _postId2 = _notice$permalink$spl2[1];
            _context.next = 57;
            return blurtjs.api.getContentAsync(_username2, _postId2);

          case 57:
            _post2 = _context.sent;
            loadedPostData.notices.push(Object.assign({}, notice, _post2));
            _context.next = 62;
            break;

          case 61:
            loadedPostData.notices.push(notice);

          case 62:
            _context.next = 51;
            break;

          case 64:
            _context.next = 69;
            break;

          case 66:
            _context.prev = 66;
            _context.t2 = _context["catch"](49);

            _iterator3.e(_context.t2);

          case 69:
            _context.prev = 69;

            _iterator3.f();

            return _context.finish(69);

          case 72:
            _iterator4 = _createForOfIteratorHelper(postData.contests);
            _context.prev = 73;

            _iterator4.s();

          case 75:
            if ((_step4 = _iterator4.n()).done) {
              _context.next = 88;
              break;
            }

            contest = _step4.value;

            if (!contest.permalink) {
              _context.next = 85;
              break;
            }

            _contest$permalink$sp = contest.permalink.split('@')[1].split('/'), _contest$permalink$sp2 = (0, _slicedToArray2["default"])(_contest$permalink$sp, 2), _username3 = _contest$permalink$sp2[0], _postId3 = _contest$permalink$sp2[1];
            _context.next = 81;
            return blurtjs.api.getContentAsync(_username3, _postId3);

          case 81:
            _post3 = _context.sent;
            loadedPostData.contests.push(Object.assign({}, contest, _post3));
            _context.next = 86;
            break;

          case 85:
            loadedPostData.contests.push(contest);

          case 86:
            _context.next = 75;
            break;

          case 88:
            _context.next = 93;
            break;

          case 90:
            _context.prev = 90;
            _context.t3 = _context["catch"](73);

            _iterator4.e(_context.t3);

          case 93:
            _context.prev = 93;

            _iterator4.f();

            return _context.finish(93);

          case 96:
            console.info("Loaded special posts: featured: ".concat(loadedPostData.featured_posts.length, ", \n        promoted: ").concat(loadedPostData.promoted_posts.length, ", notices: ").concat(loadedPostData.notices.length, ", contest: ").concat(loadedPostData.contests.length));
            return _context.abrupt("return", loadedPostData);

          case 98:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 21, 24, 27], [28, 42, 45, 48], [49, 66, 69, 72], [73, 90, 93, 96]]);
  }));
  return _specialPosts.apply(this, arguments);
}