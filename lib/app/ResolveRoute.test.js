"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

var _ResolveRoute = _interopRequireWildcard(require("./ResolveRoute"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

jest.mock('./utils/GDPRUserList');
describe('routeRegex', function () {
  it('should produce the desired regex patterns', function () {
    var test_cases = [['PostsIndex', /^\/(@[\w\.\d-]+)\/feed\/?$/], ['UserProfile1', /^\/(@[\w\.\d-]+)\/?$/], ['UserProfile2', /^\/(@[\w\.\d-]+)\/(blog|posts|comments|transfers|curation-rewards|author-rewards|permissions|created|recent-replies|notifications|feed|password|followed|followers|settings)\/?$/], ['UserProfile3', /^\/(@[\w\.\d-]+)\/[\w\.\d-]+/], ['CategoryFilters', /^\/(hot|trending|promoted|payout|payout_comments|created)\/?$/gi], ['PostNoCategory', /^\/(@[\w\.\d-]+)\/([\w\d-]+)/], ['Post', /^\/([\w\d\-\/]+)\/(\@[\w\d\.-]+)\/([\w\d-]+)\/?($|\?)/], ['PostJson', /^\/([\w\d\-\/]+)\/(\@[\w\d\.-]+)\/([\w\d-]+)(\.json)$/], ['UserJson', /^\/(@[\w\.\d-]+)(\.json)$/], ['UserNameJson', /^.*(?=(\.json))/]];
    test_cases.forEach(function (r) {
      expect(_ResolveRoute.routeRegex[r[0]]).toEqual(r[1]);
    });
  });
});
describe('resolveRoute', function () {
  var test_cases = [['/', {
    page: 'PostsIndex',
    params: ['hot']
  }], ['/about.html', {
    page: 'About'
  }], ['/dapps', {
    page: 'Dapps'
  }], ['/faq.html', {
    page: 'Faq'
  }], ['/login.html', {
    page: 'Login'
  }], ['/privacy.html', {
    page: 'Privacy'
  }], ['/support.html', {
    page: 'Support'
  }], ['/tos.html', {
    page: 'Tos'
  }], ['/submit.html', {
    page: 'SubmitPost'
  }], ['/@maitland/feed', {
    page: 'PostsIndex',
    params: ['home', '@maitland']
  }], ['/@gdpr/feed', {
    page: 'NotFound'
  }], ['/@maitland/blog', {
    page: 'UserProfile',
    params: ['@maitland', 'blog']
  }], ['/@gdpr/blog', {
    page: 'NotFound'
  }], ['/@cool/nice345', {
    page: 'PostNoCategory',
    params: ['@cool', 'nice345']
  }], ['/@gdpr/nice345', {
    page: 'NotFound'
  }], ['/ceasar/@salad/circa90', {
    page: 'Post',
    params: ['ceasar', '@salad', 'circa90', '']
  }], ['/taggy/@gdpr/nice345', {
    page: 'NotFound'
  }]];
  test_cases.forEach(function (r) {
    it("should resolve the route for the ".concat(r[1].page, " page"), function () {
      expect((0, _ResolveRoute["default"])(r[0])).toEqual(r[1]);
    });
  });
  it('should resolve xss test route in development environment', function () {
    expect((0, _ResolveRoute["default"])('/xss/test')).toEqual({
      page: 'NotFound'
    });
    process.env.NODE_ENV = 'development';
    expect((0, _ResolveRoute["default"])('/xss/test')).toEqual({
      page: 'XSSTest'
    });
    delete process.env.NODE_ENV;
  });
  it('should resolve benchmark route in development environment', function () {
    expect((0, _ResolveRoute["default"])('/benchmark')).toEqual({
      page: 'NotFound'
    });
    process.env.OFFLINE_SSR_TEST = true;
    expect((0, _ResolveRoute["default"])('/benchmark')).toEqual({
      page: 'Benchmark'
    });
    delete process.env.OFFLINE_SSR_TEST;
  });
  it('should resolve an unknown route to NotFound', function () {
    expect((0, _ResolveRoute["default"])('/randomness')).toEqual({
      page: 'NotFound'
    });
  });
});