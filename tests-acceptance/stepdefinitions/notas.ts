import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameCriterio = ((elem, criterio) => elem.element(by.name('criterioNome')).getText().then(text => text === criterio));
let sameName = ((elem, name) => elem.element(by.name('alunoNome')).getText().then(text => text === name));
let sameNota = ((elem, nota) => elem.element(by.name('alunoNota')).getText().then(text => text === nota));
let sameLogin = ((elem, login) => elem.element(by.name('alunoLogin')).getText().then(text => text === login));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de cadastro de notas$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='cadastroNotas']").click;
    });

    Given(/^o aluno "([^\"]*)" foi cadastrado com login "([^\"]*)"$/, async (nome,login) => {
        await $("a[name='alunos']").click;
        await $("input[name='nomeAluno']").sendKeys(<string> nome);
        await $("input[name='loginAluno']").sendKeys(<string> login);
        await $("a[name='cadastroNotas']").click;
    });

    Given(/^o critério "([^\"]*)" foi cadastrado com peso caracterizado como "(\d*)"$/, async (nome,peso) => {
        await $("a[name='criterios']").click;
        await $("input[name='criterioNomeInput']").sendKeys(<string> nome);
        await $("input[name='criterioPesoInput']").sendKeys(<string> peso);
    });

    When(/^a nota do aluno "([^\"]*)" para o critério "([^\"]*)" é cadastrada como "(\d*)"$/, async (nome,criterio,nota) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunoList'));
        allalunos.filter(elem => sameName(elem,name))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        let inputNota = allalunos.first().element(by.name('criterio'));
        inputNota.sendKeys(<string> nota);
     });

    Then(/^é possível ver o campo "([^\"]*)" como "(\d*)"$/, async (nome,nota) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunoList'));
        allalunos.filter(elem => pAND(sameNota(elem,nota),sameName(elem,name)))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
});