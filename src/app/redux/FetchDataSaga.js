import {
    call,
    put,
    select,
    fork,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';
import { api } from '@blurtfoundation/blurtjs';

import { loadFollows, fetchFollowCount } from 'app/redux/FollowSaga';
import { getContent } from 'app/redux/SagaShared';
import * as globalActions from './GlobalReducer';
import * as appActions from './AppReducer';
import constants from './constants';
import { fromJS, Map, Set } from 'immutable';
import { getStateAsync, callNotificationsApi } from 'app/utils/steemApi';

const REQUEST_DATA = 'fetchDataSaga/REQUEST_DATA';
const GET_CONTENT = 'fetchDataSaga/GET_CONTENT';
const FETCH_STATE = 'fetchDataSaga/FETCH_STATE';
const GET_ACCOUNT_NOTIFICATIONS = 'fetchDataSaga/GET_ACCOUNT_NOTIFICATIONS';
const GET_ACCOUNT_UNREAD_NOTIFICATIONS =
    'fetchDataSaga/GET_ACCOUNT_UNREAD_NOTIFICATIONS';

export const fetchDataWatches = [
    takeLatest(REQUEST_DATA, fetchData),
    takeEvery(GET_CONTENT, getContentCaller),
    takeLatest('@@router/LOCATION_CHANGE', fetchState),
    takeLatest(FETCH_STATE, fetchState),
    takeEvery('global/FETCH_JSON', fetchJson),
    takeEvery(GET_ACCOUNT_NOTIFICATIONS, getAccountNotifications),
    takeEvery(GET_ACCOUNT_UNREAD_NOTIFICATIONS, getAccountUnreadNotifications),
];

export function* getContentCaller(action) {
    yield getContent(action.payload);
}

let is_initial_state = true;
export function* fetchState(location_change_action) {
    const { pathname } = location_change_action.payload;
    const m = pathname.match(/^\/@([a-z0-9\.-]+)/);
    if (m && m.length === 2) {
        const username = m[1];
        yield fork(fetchFollowCount, username);
        yield fork(loadFollows, 'getFollowersAsync', username, 'blog');
        yield fork(loadFollows, 'getFollowingAsync', username, 'blog');
    }

    // `ignore_fetch` case should only trigger on initial page load. No need to call
    // fetchState immediately after loading fresh state from the server. Details: #593
    const server_location = yield select((state) =>
        state.offchain.get('server_location')
    );
    const ignore_fetch = pathname === server_location && is_initial_state;

    if (ignore_fetch) {
        return;
    }
    is_initial_state = false;
    if (process.env.BROWSER && window && window.optimize) {
        console.log('REFRESH ADS');
        window.optimize.refreshAll({ refresh: false });
    }
    const url = pathname;

    yield put(appActions.fetchDataBegin());
    try {
        const state = yield call(getStateAsync, url);
        yield put(globalActions.receiveState(state));
        yield call(syncSpecialPosts);
    } catch (error) {
        console.error('~~ Saga fetchState error ~~>', url, error);
        yield put(appActions.steemApiError(error.message));
    }

    yield put(appActions.fetchDataEnd());
}

function* syncSpecialPosts() {
    // Bail if we're rendering serverside since there is no localStorage
    if (!process.env.BROWSER) return null;

    // Get special posts from the store.
    const specialPosts = yield select((state) =>
        state.offchain.get('special_posts')
    );

    // Mark seen featured posts.
    const seenFeaturedPosts = specialPosts.get('featured_posts').map((post) => {
        const id = `${post.get('author')}/${post.get('permlink')}`;
        return post.set(
            'seen',
            localStorage.getItem(`featured-post-seen:${id}`) === 'true'
        );
    });

    // Mark seen promoted posts.
    const seenPromotedPosts = specialPosts.get('promoted_posts').map((post) => {
        const id = `${post.get('author')}/${post.get('permlink')}`;
        return post.set(
            'seen',
            localStorage.getItem(`promoted-post-seen:${id}`) === 'true'
        );
    });

    // Look up seen post URLs.
    yield put(
        globalActions.syncSpecialPosts({
            featuredPosts: seenFeaturedPosts,
            promotedPosts: seenPromotedPosts,
        })
    );

    // Mark all featured posts as seen.
    specialPosts.get('featured_posts').forEach((post) => {
        const id = `${post.get('author')}/${post.get('permlink')}`;
        localStorage.setItem(`featured-post-seen:${id}`, 'true');
    });

    // Mark all promoted posts as seen.
    specialPosts.get('promoted_posts').forEach((post) => {
        const id = `${post.get('author')}/${post.get('permlink')}`;
        localStorage.setItem(`promoted-post-seen:${id}`, 'true');
    });
}

/**
 * Request account data for a set of usernames.
 *
 * @todo batch the put()s
 *
 * @param {Iterable} usernames
 */
function* getAccounts(usernames) {
    const accounts = yield call([api, api.getAccountsAsync], usernames);
    yield put(globalActions.receiveAccounts({ accounts }));
}

/**
 * Request notifications for given account
 * @param {object} payload containing:
 *   - account (string)
 *   - last_id (string), optional, for pagination
 *   - limit (int), optional, defualt is 100
 */
export function* getAccountNotifications(action) {
    if (!action.payload) throw 'no account specified';
    try {
        const notifications = yield call(
            callNotificationsApi,
            action.payload.account
        );

        if (notifications && notifications.error) {
            console.error(
                '~~ Saga getAccountNotifications error ~~>',
                notifications.error
            );
            yield put(appActions.steemApiError(notifications.error.message));
        } else {
            yield put(
                globalActions.receiveNotifications({
                    name: action.payload.account,
                    notifications,
                })
            );
        }
    } catch (error) {
        console.error('~~ Saga getAccountNotifications error ~~>', error);
        yield put(appActions.steemApiError(error.message));
    }
}

export function* getAccountUnreadNotifications(action) {
    if (!action.payload) throw 'no account specified';
    try {
        const notifications = yield call(
            callNotificationsApi,
            action.payload.account
        );

        if (notifications && notifications.error) {
            console.error(
                '~~ Saga getAccountUnreadNotifications error ~~>',
                notifications.error
            );
            yield put(appActions.steemApiError(notifications.error.message));
        } else {
            yield put(
                globalActions.receiveUnreadNotifications({
                    name: action.payload.account,
                    notifications,
                })
            );
        }
    } catch (error) {
        console.error('~~ Saga getAccountUnreadNotifications error ~~>', error);
        yield put(appActions.steemApiError(error.message));
    }
}

export function* fetchData(action) {
    const { order, author, permlink, accountname, postFilter } = action.payload;
    let { category } = action.payload;
    if (!category) category = '';
    category = category.toLowerCase();

    yield put(globalActions.fetchingData({ order, category }));
    let call_name, args;
    if (order === 'trending') {
        call_name = 'getDiscussionsByTrendingAsync';
        args = [
            {
                tag: category,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'hot') {
        call_name = 'getDiscussionsByHotAsync';
        args = [
            {
                tag: category,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'promoted') {
        call_name = 'getDiscussionsByPromotedAsync';
        args = [
            {
                tag: category,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'payout') {
        call_name = 'getPostDiscussionsByPayoutAsync';
        args = [
            {
                tag: category,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'payout_comments') {
        call_name = 'getCommentDiscussionsByPayoutAsync';
        args = [
            {
                tag: category,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'created') {
        call_name = 'getDiscussionsByCreatedAsync';
        args = [
            {
                tag: category,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'by_replies') {
        call_name = 'getRepliesByLastUpdateAsync';
        args = [author, permlink, constants.FETCH_DATA_BATCH_SIZE];
    } else if (order === 'by_feed') {
        // https://github.com/steemit/steem/issues/249
        call_name = 'getDiscussionsByFeedAsync';
        args = [
            {
                tag: accountname,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'by_author') {
        call_name = 'getDiscussionsByBlogAsync';
        args = [
            {
                tag: accountname,
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else if (order === 'by_comments') {
        call_name = 'getDiscussionsByCommentsAsync';
        args = [
            {
                limit: constants.FETCH_DATA_BATCH_SIZE,
                start_author: author,
                start_permlink: permlink,
            },
        ];
    } else {
        // this should never happen. undefined behavior
        call_name = 'getDiscussionsByTrendingAsync';
        args = [{ limit: constants.FETCH_DATA_BATCH_SIZE }];
    }
    yield put(appActions.fetchDataBegin());
    try {
        const firstPermlink = permlink;
        let fetched = 0;
        let endOfData = false;
        let fetchLimitReached = false;
        let fetchDone = false;
        let batch = 0;
        while (!fetchDone) {
            const data = yield call([api, api[call_name]], ...args);

            endOfData = data.length < constants.FETCH_DATA_BATCH_SIZE;

            batch++;
            fetchLimitReached = batch >= constants.MAX_BATCHES;

            // next arg. Note 'by_replies' does not use same structure.
            const lastValue = data.length > 0 ? data[data.length - 1] : null;
            if (lastValue && order !== 'by_replies') {
                args[0].start_author = lastValue.author;
                args[0].start_permlink = lastValue.permlink;
            }

            // Still return all data but only count ones matching the filter.
            // Rely on UI to actually hide the posts.
            fetched += postFilter
                ? data.filter(postFilter).length
                : data.length;

            fetchDone =
                endOfData ||
                fetchLimitReached ||
                fetched >= constants.FETCH_DATA_BATCH_SIZE;

            yield put(
                globalActions.receiveData({
                    data,
                    order,
                    category,
                    author,
                    firstPermlink,
                    accountname,
                    fetching: !fetchDone,
                    endOfData,
                })
            );
        }
    } catch (error) {
        console.error('~~ Saga fetchData error ~~>', call_name, args, error);
        yield put(appActions.steemApiError(error.message));
    }
    yield put(appActions.fetchDataEnd());
}

/**
    @arg {string} id unique key for result global['fetchJson_' + id]
    @arg {string} url
    @arg {object} body (for JSON.stringify)
*/
function* fetchJson({
    payload: { id, url, body, successCallback, skipLoading = false },
}) {
    try {
        const payload = {
            method: body ? 'POST' : 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        };
        let result = yield skipLoading
            ? fetch(url, payload)
            : call(fetch, url, payload);
        result = yield result.json();
        if (successCallback) result = successCallback(result);
        yield put(globalActions.fetchJsonResult({ id, result }));
    } catch (error) {
        console.error('fetchJson', error);
        yield put(globalActions.fetchJsonResult({ id, error }));
    }
}

// Action creators
export const actions = {
    requestData: (payload) => ({
        type: REQUEST_DATA,
        payload,
    }),

    getContent: (payload) => ({
        type: GET_CONTENT,
        payload,
    }),

    fetchState: (payload) => ({
        type: FETCH_STATE,
        payload,
    }),
    getAccountNotifications: (payload) => ({
        type: GET_ACCOUNT_NOTIFICATIONS,
        payload,
    }),
    getAccountUnreadNotifications: (payload) => ({
        type: GET_ACCOUNT_UNREAD_NOTIFICATIONS,
        payload,
    }),
};
