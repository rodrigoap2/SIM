import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameCriterio = ((elem, criterio) => elem.element(by.name('criterioNome')).getText().then(text => text == criterio));
let sameName = ((elem, name) => elem.element(by.name('alunoNome')).getText().then(text => text == name));
let sameNota = ((elem, nota,nome) => elem.element(by.id('alunoNota'+nome)).getText().then(text => text == nota));
let sameLogin = ((elem, login) => elem.element(by.name('alunoLogin')).getText().then(text => text == login));
let sameSome = ((elem, param, tagName) => elem.element(by.name(tagName)).getText().then(text => text == param));
let sameSome2 = ((elem, param, tagName) => elem.element(by.id(tagName)).getText().then(text => text == param));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de cadastro de notas$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='correcao']").click();
    });

    Given(/^o aluno "([^\"]*)" foi cadastrado com login "([^\"]*)"$/, async (nome,login) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='alunos']").click();
        await $("input[name='nomeAluno']").sendKeys(<string> nome);
        await $("input[name='loginAluno']").sendKeys(<string> login);
        await element(by.name("botaoCriarAluno")).click();
    });

    Given(/^o critério "([^\"]*)" foi cadastrado com peso caracterizado como "(\d*)"$/, async (nome,peso) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='criterios']").click();
        await $("input[name='criterioNomeInput']").sendKeys(<string> nome);
        await $("input[name='criterioPesoInput']").sendKeys(<string> peso);
        await element(by.name("botaoCriarCriterio")).click();
    });

    When(/^a nota do aluno "([^\"]*)" para o critério "([^\"]*)" é cadastrada como "(\d*)"$/, async (nome,criterio,nota) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='correcao']").click();
        var allalunos : ElementArrayFinder = element.all(by.id('alunos')); 
        await allalunos;
        var aluno = allalunos.filter(elem => sameSome(elem,nome,'alunoNome'));
        await aluno.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findCriterio = aluno.all(by.name('allCriterios'));
        await findCriterio;
        var nota2 = <string> nota;
        var nomeInput = <string> nome + <string> criterio;
        await $("input[ng-reflect-name='"+nomeInput+"']").sendKeys(<string> nota);
        //await $("input[name='{{aluno.nome}}{{criterio.nome}}']").sendKeys(<string> nota);
        await element(by.name("botaoAdicionar" + <string>nome)).click();
     });

    Then(/^é possível ver o campo "([^\"]*)" como "(\d*)"$/, async (nome,nota) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunoList'));
        allalunos.filter(elem => pAND(sameNota(elem,nota,nome),sameName(elem,nome)))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^uma mensagem de erro é visualizada$/, async () => {
        expect(element(by.name('erro')).getText()).toBe('Erro: Existem critérios com nota menor que 0 ou maior que 10 ou vazios');
    });
});