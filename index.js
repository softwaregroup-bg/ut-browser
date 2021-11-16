const path = require('path');
const dispatch = require('ut-function.dispatch');

module.exports = () => function utBrowser({
    target = path.resolve('dist', 'admin.html'),
    help = path.resolve('help', 'index.html')
}) {
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
                            defaultExtension: 'html',
                            lookupCompressed: true,
                            index: false
                        }
                    }),
                    'help/': () => ({
                        file: help
                    }),
                    help: () => ({
                        directory: {
                            path: path.dirname(help),
                            defaultExtension: 'html',
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
