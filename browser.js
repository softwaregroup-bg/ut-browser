module.exports = () => function utBrowser() {
    return {
        config: require('./browserConfig'),
        browser: () => [
            require('./backend')
        ]
    };
};
