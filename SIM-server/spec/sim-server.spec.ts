import request = require("request-promise");
import { closeServer } from '../sim-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../sim-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de alunos vazia", () => {
    return request.get(base_url + "alunos").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
  })

  it("só cadastra alunos", () => {
    var options:any = {method: 'POST', uri: (base_url + "aluno"), body:{nome: "Rodrigo", cpf: "962"}, json: true};
    return request(options).then(body =>
         expect(body).toEqual({failure: "O aluno não pode ser cadastrado"})
    ).catch(e =>
         expect(e).toEqual(null)
    )
  });

  it("não cadastra alunos com login duplicado", () => {
    return request.post(base_url + "aluno", {"json":{"nome": "Rodrigo", "login" : "rap2"}}).then(body => {
         expect(body).toEqual({success: "O aluno foi cadastrado com sucesso"});
         return request.post(base_url + "aluno", {"json":{"nome": "Ruan", "login" : "rap2"}}).then(body => {
             expect(body).toEqual({failure: "O aluno não pode ser cadastrado"});
             return request.get(base_url + "alunos").then(body => {
                 expect(body).toContain('{"nome":"Rodrigo","login":"rap2","criterios":{}}');
                 expect(body).not.toContain('{"nome":"Ruan","login":"rap2","criterios":{}}');
             });
         });
     });
  });

  it("atualiza alunos corretamente", () => {
    return request.post(base_url + "aluno", {"json":{"nome": "Rodrigo", "login" : "rap"}}).then(body => {
         expect(body).toEqual({success: "O aluno foi cadastrado com sucesso"});
         return request.put(base_url + "aluno", {"json":{"nome": "Ruan", "login" : "rap"}}).then(body => {
             expect(body).toEqual({"success": "O aluno foi atualizado com sucesso"});
             return request.get(base_url + "alunos").then(body => {
                 expect(body).not.toContain('{"nome":"Rodrigo","login":"rap","criterios":{}}');
                 expect(body).toContain('{"nome":"Ruan","login":"rap","criterios":{}}');
             });
         });
     });
  });

})