// eslint-disable-next-line import/prefer-default-export
export const htmlDecode = (txt) =>
    txt.replace(/&[a-z]+;/g, (ch) => {
        const char = htmlCharMap[ch.substring(1, ch.length - 1)];
        return char || ch;
    });

const htmlCharMap = {
    amp: '&',
    quot: '"',
    lsquo: '‘',
    rsquo: '’',
    sbquo: '‚',
    ldquo: '“',
    rdquo: '”',
    bdquo: '„',
    hearts: '♥',
    trade: '™',
    hellip: '…',
    pound: '£',
    copy: '',
};
