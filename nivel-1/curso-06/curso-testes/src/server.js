import app from './app.js';
import { serverConfig } from './config/server.config.js';

app.listen(serverConfig.port, () => {
  console.log(`Servidor rodando na porta ${serverConfig.port}`);
});
