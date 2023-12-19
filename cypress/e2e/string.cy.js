import { greenCircle, purpleCircle, blueCircle, inputSelector, circleSelector } from '../../src/constants/cypress'

describe('Проверка работы страницы "строка"', function () {
  beforeEach(() => {
    cy.visit("/recursion");
    cy.contains("Строка");
    cy.get(inputSelector).first().as('input');
    cy.contains('Развернуть').first().as('button');
  });
  it('кнопка отключена при пустом инпуте', function () {
    cy.get('@input').should('be.empty').get('@button').should('be.disabled');
  });
  it('анимация разворота строки', function () {
    const step1 = '1234';
    const step2 = '4231';
    const step3 = '4321';
    const step1color = [
      purpleCircle,
      blueCircle,
      blueCircle,
      purpleCircle,
    ];
    const step2color = [
      greenCircle,
      blueCircle,
      blueCircle,
      greenCircle,
    ];
    const step3color = [
      greenCircle,
      purpleCircle,
      purpleCircle,
      greenCircle,
    ];
    cy.get('@input').should('be.empty').type(step1);
    cy.get('@button').click();
    cy.get(circleSelector).each(($el, index) => {
      cy.get($el)
        .should("have.css", "border-color", step1color[index])
        .contains(step2[index])
    });
    cy.get(circleSelector).each(($el, index) => {
      cy.get($el)
        .should("have.css", "border-color", step2color[index])
        .contains(step2[index])
    });
    cy.get(circleSelector).each(($el, index) => {
      cy.get($el)
        .should("have.css", "border-color", step3color[index])
        .contains(step3[index])
    });
  })
});