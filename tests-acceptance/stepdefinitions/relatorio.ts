import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('MediaNotasValor')).getText().then(text => text === name));
let sameNota = ((elem, nota) => elem.element(by.name('alunoNota')).getText().then(text => text === nota));
let sameSome = ((elem, param, tagName) => elem.element(by.id(tagName)).getText().then(text => text === param));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de relatórios$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='relatorio']").click();
    });

    Given(/^a nota do aluno "([^\"]*)" para o critério "([^\"]*)" foi cadastrada como "(\d*)"$/, async (nome,criterio,nota) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='correcao']").click();
        var nota2 = <string> nota;
        var nomeInput = <string> nome + <string> criterio;
        await $("input[ng-reflect-name='"+nomeInput+"']").sendKeys(<string> nota);
        await element(by.name("botaoAdicionar" + <string>nome)).click();
     });

     Given(/^o campo "([^\"]*)" está como "([^\"]*)"$/, async (nome,inicio) => {
        var allalunos : ElementArrayFinder = element.all(by.name('criterioList'));
        allalunos.filter(elem => sameSome(elem,inicio,nome))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu gero um relatório$/, async () => {
        await element(by.name("botaoRelatorio")).click();
    });

    Then(/^eu visualizo o campo "([^\"]*)" como "(\d*)"$/, async (nome,nota) => {
        var allcriterios : ElementArrayFinder = element.all(by.name('criterioList'));
        allcriterios.filter(elem => pAND(sameNota(elem,nota),sameName(elem,nome)))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
});