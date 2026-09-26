import { describe, test, after } from "node:test";
import request from "supertest";
import app from "#src/app.js";
import conexao from "#db/singleton-connection.js";
import assert from "node:assert";

describe("Buscar Autor por ID", () => {
  after(async () => {
    await conexao.destroy();
  });

  test("Retorna os dados de um autor existente (200).", async () => {
    const respostaCadastro = await request(app)
      .post("/autores")
      .send({
        nome: "J.R.R. Tolkien",
        nacionalidade: "Inglês",
      })
      .expect(201);
    const idAutor = respostaCadastro.body.content.id;

    await request(app)
      .get(`/autores/${idAutor}`)
      .expect(200)
      .expect((res) => {
        const dadosResposta = res.body;
        assert.strictEqual(dadosResposta.id, idAutor);
        assert.strictEqual(dadosResposta.nome, "J.R.R. Tolkien");
        assert.strictEqual(dadosResposta.nacionalidade, "Inglês");
      });
  });

  test("Retorna os dados de um autor existente (200) (Usando Banco de Dados).", async () => {
    const resultado = await conexao("autores")
      .insert({
        nome: "J.R.R. Tolkien",
        nacionalidade: "Inglês",
      }, 'id');

    const idAutor = resultado[0].id;

    await request(app)
      .get(`/autores/${idAutor}`)
      .expect(200)
      .expect((res) => {
        const dadosResposta = res.body;
        assert.strictEqual(dadosResposta.id, idAutor);
        assert.strictEqual(dadosResposta.nome, "J.R.R. Tolkien");
        assert.strictEqual(dadosResposta.nacionalidade, "Inglês");
      });
  });

  test("Retorna um erro quando o autor não existe (404).", async () => {
    await request(app)
      .get("/autores/9999")
      .expect(404)
      .expect((res) => {
        const codigoErro = res.body.type;
        assert.strictEqual(codigoErro, "NOT_FOUND");
      });
  });
});
