module.exports = () => ({
    // environments
    storybook: {
        browser: true,
        backend: {
            namespace: [
                'login',
                'identity'
            ]
        }
    }
});
