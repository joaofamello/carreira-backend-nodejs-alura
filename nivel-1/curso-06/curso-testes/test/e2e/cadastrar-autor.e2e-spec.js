import { describe, test, after } from "node:test";
import request from "supertest";
import app from "#src/app.js";
import conexao from "#db/singleton-connection.js";
import assert from "node:assert";

describe("Cadastrar Autor", () => {
  after(async () => {
    await conexao.destroy();
  });

  test("Retorna os dados do autor cadastrado quando os dados são válidos (201).", async () => {
    const response = await request(app)
      .post("/autores")
      .send({
        nome: "H.P. Lovecraft Novo",
        nacionalidade: "Inglês",
      })
      .expect(201)
      .expect((res) => {
        const dadosResposta = res.body.content;
        assert.strictEqual(typeof dadosResposta.id, "number");
        assert.strictEqual(dadosResposta.nome, "H.P. Lovecraft Novo");
        assert.strictEqual(dadosResposta.nacionalidade, "Inglês");
      })
      .then((response) => response.body.content);

    const autorNoBanco = await conexao("autores")
      .where({ id: response.id })
      .first();

    assert.ok(autorNoBanco);
    assert.strictEqual(autorNoBanco.nome, "H.P. Lovecraft Novo");
    assert.strictEqual(autorNoBanco.nacionalidade, "Inglês");
  });

  test("Retorna um erro ao tentar cadastrar um autor com dados inválidos (400).", async () => {
    await request(app)
      .post("/autores")
      .send({
        nome: "",
        nacionalidade: "",
      })
      .expect(400)
      .expect((res) => {
        const codigoErro = res.body.type;
        assert.strictEqual(codigoErro, "INVALID_DATA");
      });
  });
});
