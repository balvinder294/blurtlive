"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _counterpart = _interopRequireDefault(require("counterpart"));

var _reactRouter = require("react-router");

var _TimeAgoWrapper = _interopRequireDefault(require("app/components/elements/TimeAgoWrapper"));

function Contest(_ref) {
  var contest = _ref.contest;

  if (!contest || !contest.title) {
    return null;
  }

  var url = contest.permalink ? "/@".concat(contest.author, "/").concat(contest.permlink) : contest.url;
  var tag = contest.tag ? /*#__PURE__*/_react["default"].createElement("p", {
    className: "Notices__featured"
  }, contest.tag) : null;
  var title = url ? /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
    className: "Notices__title-link",
    to: url
  }, contest.title) : contest.title;
  var by = contest.author ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "Notices__by"
  }, " ", (0, _counterpart["default"])('g.by'), "\xA0") : null;
  var author = contest.author ? /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
    className: "Notices__author-link",
    to: '/@' + contest.author
  }, contest.author) : null;
  var date = contest.created ? /*#__PURE__*/_react["default"].createElement("span", null, ' . ', /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
    date: contest.created
  })) : null;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "Notices__notice"
  }, tag, /*#__PURE__*/_react["default"].createElement("p", {
    className: "Notices__title"
  }, title), /*#__PURE__*/_react["default"].createElement("p", {
    className: "Notices__metadata"
  }, by, author, date));
}

function BlurtContests(_ref2) {
  var contests = _ref2.contests;

  if (!contests || contests.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__module"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__header"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "c-sidebar__h3"
  }, "Contests")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__content"
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: "Notices"
  }, contests.map(function (contest, i) {
    return /*#__PURE__*/_react["default"].createElement(Contest, {
      key: i,
      contest: contest
    });
  }))));
}

var _default = BlurtContests;
exports["default"] = _default;