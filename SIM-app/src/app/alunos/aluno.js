"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aluno {
    constructor() {
        this.clean();
    }
    clean() {
        this.nome = "";
        this.login = "";
        this.criterios = new Map();
        this.nota = 0;
    }
    clone() {
        var aluno = new Aluno();
        aluno.criterios = new Map();
        aluno.copyFrom(this);
        return aluno;
    }
    copyFrom(from) {
        this.nome = from.nome;
        this.login = from.login;
        this.nota = from.nota;
        this.copyCriteriosFrom(from.criterios);
    }
    copyCriteriosFrom(from) {
        this.criterios = new Map();
        for (let key in from) {
            this.criterios[key] = from[key];
        }
    }
    verificaAluno() {
        var conceitos = [];
        for (let key in this.criterios) {
            if (this.criterios[key] <= 0 || this.criterios[key] > 10) {
                this.criterios[key] = '';
                conceitos.push(key);
            }
        }
        return conceitos;
    }
}
exports.Aluno = Aluno;
//# sourceMappingURL=aluno.js.map