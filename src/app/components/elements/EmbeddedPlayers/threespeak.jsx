const regex = {
    // eslint-disable-next-line no-useless-escape
    sanitize: /^https:\/\/3speak\.tv\/embed\?v=([A-Za-z0-9_\-\/]+)(&.*)?$/,
    // eslint-disable-next-line no-useless-escape
    main: /(?:https?:\/\/(?:(?:3speak\.tv\/watch\?v=)|(?:3speak\.tv\/embed\?v=)))([A-Za-z0-9_\-\/]+)(&.*)?/i,
    // eslint-disable-next-line no-useless-escape
    htmlReplacement: /<a href="(https?:\/\/3speak\.tv\/watch\?v=([A-Za-z0-9_\-\/]+))".*<img.*?><\/a>/i,
    embedShorthand: /~~~ embed:(.*?)\/(.*?) threespeak ~~~/,
};

export default regex;
export const sandboxConfig = {
    useSandbox: true,
    sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-popups'],
};

export function genIframeMd(idx, threespeakId, w, h) {
    const url = `https://3speak.tv/embed?v=${threespeakId}`;
    return (
        <div key={`threespeak-${threespeakId}-${idx}`} className="videoWrapper">
            <iframe
                title="3Speak embedded player"
                key={idx}
                src={url}
                width={w}
                height={h}
                frameBorder="0"
                allowFullScreen
                allow="fullscreen"
                sandbox={
                    sandboxConfig.useSandbox
                        ? sandboxConfig.sandboxAttributes
                            ? sandboxConfig.sandboxAttributes.join(' ')
                            : true
                        : ''
                }
            />
        </div>
    );
}

export function validateIframeUrl(url) {
    const match = url.match(regex.sanitize);

    if (match) {
        return url;
    }

    return false;
}

export function normalizeEmbedUrl(url) {
    const match = url.match(regex.contentId);

    if (match && match.length >= 2) {
        return `https://3speak.tv/embed?v=${match[1]}`;
    }

    return false;
}

export function extractMetadata(data) {
    if (!data) return null;

    const match = data.match(regex.main);
    const url = match ? match[0] : null;
    if (!url) return null;
    const fullId = match[1];
    const id = fullId.split('/').pop();

    return {
        id,
        fullId,
        url,
        thumbnail: `https://img.3speakcontent.co/${id}/poster.png`,
    };
}

export function embedNode(child, links, images) {
    try {
        const { data } = child;
        const threespeak = extractMetadata(data);

        if (threespeak) {
            child.data = data.replace(
                threespeak.url,
                `~~~ embed:${threespeak.id} threespeak ~~~`
            );

            if (links) {
                links.add(threespeak.canonical);
            }

            if (images) {
                images.add(threespeak.thumbnail);
            }
        } else {
            // Because we are processing 3speak embed player with the preprocessHtml() method below
            // extractMetadata won't be able to extract the thumbnail from the shorthand.
            // So we are handling thumbnail URL extraction differently.
            const match = data.match(regex.embedShorthand);
            if (match && images) {
                const imageUrl = `https://img.3speakcontent.co/${match[2]}/poster.png`;
                images.add(imageUrl);
            }
        }
    } catch (error) {
        console.log(error);
    }

    return child;
}

export function preprocessHtml(child) {
    try {
        if (typeof child === 'string') {
            // If typeof child is a string, this means we are trying to process the HTML
            // to replace the image/anchor tag created by 3Speak dApp
            const threespeak = extractMetadata(child);
            if (threespeak) {
                child = child.replace(
                    regex.htmlReplacement,
                    `~~~ embed:${threespeak.fullId} threespeak ~~~`
                );
            }
        }
    } catch (error) {
        console.log(error);
    }

    return child;
}
