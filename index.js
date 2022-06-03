const path = require('path');
const dispatch = require('ut-function.dispatch');

module.exports = () => function utBrowser({
    target = path.resolve('dist', 'admin.html'),
    helpTarget = path.resolve('dist', 'help', 'index.html')
}) {
    return {
        config: require('./config'),
        gateway: () => [
            function browser() {
                return dispatch({namespace: 'browser'})(...arguments);
            },
            function asset({ config: { home, help }}) {
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
                        },
                        redirect: home
                    }),
                    'help/': () => ({
                        file: helpTarget
                    }),
                    help: () => ({
                        directory: {
                            path: path.dirname(helpTarget),
                            defaultExtension: 'html',
                            lookupCompressed: true,
                            index: true
                        },
                        redirect: help
                    })
                };
            }
        ],
        test: () => require('./test/jobs')
    };
};
