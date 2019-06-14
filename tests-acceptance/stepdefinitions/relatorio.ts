import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('alunoNome')).getText().then(text => text === name));
let sameNota = ((elem, nota) => elem.element(by.name('alunoNota')).getText().then(text => text === nota));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de relatórios$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='relatorio']").click;
    });

    Given(/^a nota do aluno "([^\"]*)" para o critério "([^\"]*)" foi cadastrada como "(\d*)"$/, async (nome,criterio,nota) => {
        await $("a[name='criterios']").click;
        var allalunos : ElementArrayFinder = element.all(by.name('alunoList'));
        allalunos.filter(elem => sameName(elem,name))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        let inputNota = allalunos.first().element(by.name('criterio'));
        inputNota.sendKeys(<string> nota);
        await $("a[name='relatorio']").click;
     });

     Given(/^o campo "([^\"]*)" está como "([^\"]*)"$/, async (nome,inicio) => {
        var allalunos : ElementArrayFinder = element.all(by.name('criterioList'));
        allalunos.filter(elem => pAND(sameNota(elem,inicio),sameName(elem,name)))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu gero um relatório$/, async (nome,peso) => {
        await element(by.buttonText('botaoGerarRelatorio')).click();
    });

    Then(/^eu visualizo o campo "([^\"]*)" como "(\d*)"$/, async (nome,nota) => {
        var allalunos : ElementArrayFinder = element.all(by.name('criterioList'));
        allalunos.filter(elem => pAND(sameNota(elem,nota),sameName(elem,name)))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
});