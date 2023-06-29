const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/solr', createProxyMiddleware({
  target: 'http://localhost:8983',
  changeOrigin: true,
}));

app.listen(3001, () => {
  console.log('Proxy server is running on http://localhost:3001');
});
