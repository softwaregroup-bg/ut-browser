module.exports = (...params) => class backend extends require('ut-port-jsonrpc')(...params) {
    get defaults() {
        return {
            imports: [/\.backend$/],
            logLevel: 'trace',
            method: 'post'
        };
    }

    handlers() {
        const {send} = super.handlers();
        return {
            start() {
                if (!process.browser) {
                    const server = this.bus && typeof this.bus.config.server === 'function' && this.bus.config.server();
                    const rpc = (server && server.serviceBus && server.serviceBus.rpc) || this.bus;
                    const status = rpc && rpc.info;
                    const {host, port, protocol} = typeof status === 'function' && rpc.info();
                    if (host && port && protocol) this.config.url = `${protocol}://${host}:${port}`;
                }
            },
            send(params, {method}) {
                if (!params.$http) params.$http = {};
                if (!params.$http.uri) params.$http.uri = `/rpc/${method.replace(/\//ig, '%2F').replace(/\./g, '/')}`;
                return send.apply(this, arguments);
            }
        };
    }
};
