import _ from 'lodash';

/**
 * Regular expressions for detecting and validating provider URLs
 * @type {{htmlReplacement: RegExp, main: RegExp, sanitize: RegExp}}
 */
const regex = {
    main: /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/i,
    sanitize: /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/i,
    htmlReplacement: /<blockquote[^>]*?><p[^>]*?>(.*?)<\/p>.*?mdash; (.*)<a href="(https:\/\/twitter.com\/.*?(.*?\/status\/(.*?))\?.*?)">(.*?)<\/a><\/blockquote>/i,
};

export default regex;

/**
 * Extract the content ID and other metadata from the URL
 * @param data
 * @returns {null|{id: *, canonical: string, url: *}}
 */
export function extractMetadataFromEmbedCode(data) {
    if (!data) return null;

    const match = data.match(regex.htmlReplacement);
    if (match) {
        const description = match[1];
        const author = match[2];
        const url = match[3];
        const fullId = match[4];
        const id = match[5];
        const date = match[5];

        return {
            id,
            fullId,
            url,
            canonical: url,
            thumbnail: null,
            date,
            author,
            description,
        };
    }

    return null;
}

/**
 * Extract the content ID and other metadata from the URL
 * @param data
 * @returns {null|{id: *, canonical: string, url: *}}
 */
export function extractMetadata(data) {
    if (!data) return null;

    const match = data.match(regex.main);
    if (match) {
        const url = match[0];
        const author = match[1];
        const id = match[2];

        return {
            id,
            fullId: id,
            url,
            canonical: null,
            thumbnail: null,
            date: '',
            author,
            description: '',
        };
    }

    return null;
}

/**
 * Check if the iframe code in the post editor is to an allowed URL
 * @param url
 * @returns {boolean|*}
 */
export function validateIframeUrl(url) {
    const match = url.match(regex.sanitize);

    if (match) {
        return url;
    }

    return false;
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
export function normalizeEmbedUrl(url) {
    const match = url.match(regex.main);

    if (match && match.length >= 2) {
        const tweetId = match[2].split('?').shift();
        return `https://twitter.com/${match[1]}/status/${tweetId}`;
    }

    return false;
}

function generateTwitterCode(metadata) {
    let twitterCode =
        '<blockquote className="twitter-tweet"><p lang="en" dir="ltr"></p>&mdash; <a href=""></a></blockquote>';
    if (metadata) {
        let [author, date, url, description] = atob(metadata).split('|');

        // Sanitizing input
        author = author.replace(/(<([^>]+)>)/gi, '');
        date = date.replace(/(<([^>]+)>)/gi, '');
        url = url.replace(/(<([^>]+)>)/gi, '');
        description = description.replace(/(<([^>]+)>)/gi, '');
        if (description === '') {
            description = url;
        }

        twitterCode =
            '<blockquote class="twitter-tweet">' +
            `<p lang="en" dir="ltr">${description}</p>` +
            `&mdash; ${author} <a href="${url}">${date}</a>` +
            '</blockquote>';

        const twttr = _.get(window, 'twttr');
        if (twttr && twttr.widgets) {
            twttr.widgets.load();
        }
    }

    return {
        __html: twitterCode,
    };
}

/**
 * Generates the Markdown/HTML code to override the detected URL with an iFrame
 * @param idx
 * @param threespeakId
 * @param w
 * @param h
 * @returns {*}
 */
export function genIframeMd(idx, twitterId, w, h, metadata) {
    if (typeof window !== 'undefined') {
        return (
            <div
                key={`twitter-${twitterId}-${idx}`}
                className="tweetWrapper"
                dangerouslySetInnerHTML={generateTwitterCode(metadata)}
            />
        );
    }

    return null;
}

/**
 * Replaces the URL with a custom Markdown for embedded players
 * @param child
 * @param links
 * @returns {*}
 */
export function embedNode(child) {
    try {
        const { data } = child;
        const twitter = extractMetadata(data);

        if (twitter) {
            const metadata = btoa(
                `${twitter.author}|${twitter.date}|${twitter.url}|${twitter.description}`
            );
            child.data = data.replace(
                regex.main,
                `~~~ embed:${twitter.id} twitter metadata:${metadata} ~~~`
            );
        }
    } catch (error) {
        console.log(error);
    }

    return child;
}

/**
 * Pre-process HTML codes from the Markdown before it gets transformed
 * @param child
 * @returns {string}
 */
export function preprocessHtml(child) {
    try {
        if (typeof child === 'string') {
            // If typeof child is a string, this means we are trying to process the HTML
            // to replace the image/anchor tag created by 3Speak dApp
            const twitter = extractMetadataFromEmbedCode(child);
            if (twitter) {
                const metadata = btoa(
                    `${twitter.author}|${twitter.date}|${twitter.url}|${twitter.description}`
                );
                child = child.replace(
                    regex.htmlReplacement,
                    `~~~ embed:${twitter.id} twitter metadata:${metadata} ~~~`
                );
            }
        }
    } catch (error) {
        console.log(error);
    }

    return child;
}
