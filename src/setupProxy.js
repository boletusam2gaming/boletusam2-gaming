const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = function(app) { // eslint-disable-line no-unused-vars
  app.use(// eslint-disable-line no-unused-vars
    '/api',// eslint-disable-line no-unused-vars
    createProxyMiddleware({// eslint-disable-line no-unused-vars
      target: 'https://api.forthwall.com',// target is the URL to the API server
      changeOrigin: true, // changeOrigin allows the proxy to send requests to a different domain
      pathRewrite: {// pathRewrite rewrites the URL to remove the /api prefix
        '^/api': '',// This will remove the /api prefix from the URL
      },
      headers: {// headers sets the headers for the request
        'Authorization': `Bearer ${process.env.REACT_APP_FORTHWALL_STOREFRONT_API_KEY}`
      }
    })
  );
};