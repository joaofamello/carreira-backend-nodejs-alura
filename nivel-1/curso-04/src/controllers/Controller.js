class Controller {
  constructor (entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);
    } catch (erro) {
      // erro
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const registro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(registro);
    } catch (erro) {
      // erro
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistro = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(201).json(novoRegistro);
    } catch (erro) {
      // erro
    }
  }

  async atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const foiAtualizado = this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
      if (!foiAtualizado) {
        return res.status(400).json({ message: 'Registro não foi atualizado' });
      }
      return res.status(200).json({ message: 'Registro atualizado com sucesso' });
    } catch (erro) {
      // erro
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ message: 'Registro excluído com sucesso' });
    } catch (erro) {
      // erro
    }
  }
}

module.exports = Controller;