module.exports = () => ({
    common: {
        asset: {
            home: '/a/browser/admin',
            help: '/a/help/index'
        }
    },
    validation: ({ joi }) =>
        joi.object({
            target: joi.string(),
            helpTarget: joi.string(),
            gateway: joi.boolean(),
            browser: joi.boolean(),
            backend: joi.any(),
            asset: joi.object({
                home: joi.string(),
                help: joi.string()
            })
        })
});
