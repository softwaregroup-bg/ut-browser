module.exports = () => function utBrowser() {
    return {
        browser: () => [
            function ui() {
                // return require('./ui/react').ui(...arguments);
            }
        ]
    };
};
