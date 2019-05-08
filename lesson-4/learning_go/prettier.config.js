module.exports = {
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.rc',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '.*rc',
            options: {
                tabWidth: 2,
            },
        },
    ],
};