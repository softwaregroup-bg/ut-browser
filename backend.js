module.exports = (...params) => class backend extends require('ut-port-jsonrpc')(...params) {
    get defaults() {
        return {
            imports: [/\.backend$/],
            logLevel: 'trace',
            method: 'post'
        };
    }

    handlers() {
        const {send, receive} = super.handlers();
        let utVersion = null;
        return {
            start() {
                if (!process.browser && !this.config.url) {
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
            },
            receive(msg, $meta) {
                const headers = $meta?.response?.headers;
                const serverVersion = headers?.['x-ut-version'];
                utVersion = utVersion ?? serverVersion;
                if (serverVersion && utVersion !== serverVersion) {
                    // refresh the current page in order to fetch the latest ui assets
                    window?.location?.reload?.();
                }
                return receive.apply(this, arguments);
            }
        };
    }
};
