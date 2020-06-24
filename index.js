const path = require('path');
const dispatch = require('ut-function.dispatch');

module.exports = () => function utBrowser({target = path.resolve('dist', 'admin.html')}) {
    return {
        gateway: () => [
            function browser() {
                return dispatch({namespace: 'browser'})(...arguments);
            },
            function asset() {
                return {
                    'browser/': () => ({
                        file: target
                    }),
                    browser: () => ({
                        directory: {
                            path: path.dirname(target),
                            lookupCompressed: true,
                            index: false
                        }
                    })
                };
            }
        ],
        test: () => require('./test/jobs')
    };
};
