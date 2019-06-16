import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { Alert } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let samePeso = ((elem, peso) => elem.element(by.id('criterioPeso')).getText().then(text => text === peso));
let sameName = ((elem, name) => elem.element(by.id('criterioNome')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de cadastro de critérios$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='criterios']").click();
    });

    When(/^eu cadastro o critério "([^\"]*)" com peso caracterizado como "(\d*)"/, async (nome,peso) => {
        await browser.get("http://localhost:4200/");
        await $("a[name='criterios']").click();
        await $("input[name='criterioNomeInput']").sendKeys(<string> nome);
        await $("input[name='criterioPesoInput']").sendKeys(<string> peso);
        await element(by.name("botaoCriarCriterio")).click();
    });

     Then(/^eu vejo "([^\"]*)" como critério com peso "(\d*)"$/, async (nome,peso) => {
        var allalunos : ElementArrayFinder = element.all(by.name('criterioList'));
        allalunos.filter(elem => pAND(samePeso(elem,peso),sameName(elem,nome)))
        .then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
     });  
});