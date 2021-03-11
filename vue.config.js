module.exports = {
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://localhost:10000",
                changeOrigin: true,
                pathRewrite: {"^/api": ""},
                onProxyReq: function onProxyReq(proxyReq, req, res) {
                    if (req.headers.Authorization) {
                        proxyReq.setHeader("Authorization", req.headers.Authorization);
                    }
                },
                logLevel: "debug"
            },
        }
    }
}
