const cors_proxy = require('cors-anywhere');
const https = require('https');

function main() {
    const host = process.env.HOST || '0.0.0.0';
    const port = process.env.PORT || 8080;

    // Majority of offerings using the BIG IoT Java lib
    // use an expired self-signed certificate
    const ignoreSSLAgent = new https.Agent({rejectUnauthorized: false});

    const proxy = cors_proxy.createServer({
        originWhitelist: [], // Allow all origins
        requireHeader: ['origin', 'x-requested-with'],
        removeHeaders: ['cookie', 'cookie2'],
        httpProxyOptions: {
            agent: ignoreSSLAgent,
        },
    }).listen(port, host, function() {
        console.log('Running CORS Anywhere on ' + host + ':' + port);
    });
}

if (!module.parent) {
    main()
}

