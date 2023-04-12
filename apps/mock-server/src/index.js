import mb from 'mountebank';
import userService from './services/user-service.js';
import settings from './settings.js';

const mbServerInstance = mb.create({
  port: settings.port,
  pidfile: '../mb.pid',
  logfile: '../mb.log',
  protofile: '../protofile.json',
  ipWhitelist: ['*'],
});

mbServerInstance.then(() => {
  userService();
});
