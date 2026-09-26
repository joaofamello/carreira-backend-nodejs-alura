import autoresRoutes from './autores.routes.js';
import editorasRoutes from './editoras.routes.js';
import livrosRoutes from './livros.routes.js';

export function routes(app) {
  app.route('/').get((_req, res) => {
    res.send({ titulo: 'Curso de Testes' });
  });

  app.use(autoresRoutes);
  app.use(editorasRoutes);
  app.use(livrosRoutes);
}
