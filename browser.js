module.exports = () => function utBrowser() {
    return {
        browser: () => [
            require('./backend')
        ]
    };
};
