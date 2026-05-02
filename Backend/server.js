const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// initialize socket with the HTTP server instance
initializeSocket(server);

server.on('error', (err) => {
   if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. If you have another server running, stop it or change PORT.`);
      process.exit(1);
   } else {
      console.error('Server error:', err);
      process.exit(1);
   }
});

server.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});
 