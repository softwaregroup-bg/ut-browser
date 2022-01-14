module.exports = () => ({
    common: {
        asset: {
            home: '/a/browser/admin.html',
            help: '/a/help/index.html'
        }
    },
    validation: ({ joi }) =>
        joi.object({
            gateway: joi.boolean(),
            browser: joi.boolean(),
            backend: joi.any(),
            asset: joi.object({
                home: joi.string(),
                help: joi.string()
            })
        })
});
