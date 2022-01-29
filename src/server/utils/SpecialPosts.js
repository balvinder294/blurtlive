import * as config from 'config';
import * as https from 'https';
import * as blurtjs from '@blurtfoundation/blurtjs';
/**
 * Load special posts - including notices,contests, featured, and promoted.
 *
 * @returns {promise} resolves to object of {featured_posts:[], promoted_posts:[], notices:[], contests: []}
 */
function loadSpecialPosts() {
    return new Promise((resolve, reject) => {
        const emptySpecialPosts = {
            featured_posts: [],
            promoted_posts: [],
            notices: [],
            contests: [],
        };

        if (!config.special_posts_url) {
            resolve(emptySpecialPosts);
            return;
        }

        const request = https.get(config.special_posts_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                const json = JSON.parse(data);
                console.info('Received special posts payload', json);
                if (json === Object(json)) {
                    resolve(json);
                }
            });
        });

        request.on('error', (e) => {
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
export async function specialPosts() {
    console.info('Loading special posts');

    const postData = await loadSpecialPosts();
    console.info('Loading special posts', postData);
    const loadedPostData = {
        featured_posts: [],
        promoted_posts: [],
        notices: [],
        contests: [],
    };

    for (const url of postData.featured_posts) {
        const [username, postId] = url.split('@')[1].split('/');
        const post = await blurtjs.api.getContentAsync(username, postId);
        post.special = true;
        loadedPostData.featured_posts.push(post);
    }

    for (const url of postData.promoted_posts) {
        const [username, postId] = url.split('@')[1].split('/');
        const post = await blurtjs.api.getContentAsync(username, postId);
        post.special = true;
        loadedPostData.promoted_posts.push(post);
    }

    for (const notice of postData.notices) {
        if (notice.permalink) {
            const [username, postId] = notice.permalink
                .split('@')[1]
                .split('/');
            const post = await blurtjs.api.getContentAsync(username, postId);
            loadedPostData.notices.push(Object.assign({}, notice, post));
        } else {
            loadedPostData.notices.push(notice);
        }
    }

    for (const contest of postData.contests) {
        if (contest.permalink) {
            const [username, postId] = contest.permalink
                .split('@')[1]
                .split('/');
            const post = await blurtjs.api.getContentAsync(username, postId);
            loadedPostData.contests.push(Object.assign({}, contest, post));
        } else {
            loadedPostData.contests.push(contest);
        }
    }

    console.info(
        `Loaded special posts: featured: ${loadedPostData.featured_posts.length}, 
        promoted: ${loadedPostData.promoted_posts.length}, notices: ${loadedPostData.notices.length}, contest: ${loadedPostData.contests.length}`
    );

    return loadedPostData;
}
