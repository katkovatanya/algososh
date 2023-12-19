import { purpleCircle, blueCircle, inputSelector, circleSelector } from '../../src/constants/cypress'

describe('Проверка работы страницы "Очередь"', function () {
  beforeEach(() => {
    cy.visit("/queue");
    cy.contains("Очередь");
    cy.get(inputSelector).first().as('input');
    cy.contains('Добавить').first().as('add');
    cy.contains('Удалить').first().as('del');
    cy.contains('Очистить').first().as('clear');
  });
  it('кнопки отключены при пустом инпуте', function () {
    cy.get('@input')
      .should('be.empty')
      .get('@add')
      .should('be.disabled')
      .get('@del')
      .should('be.disabled')
      .get('@clear')
      .should('be.disabled');
  });
  it('добавление работает корректно', function () {
    const inputValue = 2;
    cy.get('@input').should('be.empty').type(inputValue);
    cy.get('@add').click();
    cy.get(circleSelector)
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
      .parent()
      .parent()
      .contains('head')
      .parent()
      .contains('tail')
    cy.get(circleSelector)
      .should("have.css", "border-color", blueCircle)
  });
  it('удаление работает корректно', function () {
    if (cy.get(circleSelector).first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@del').click();
    cy.get(circleSelector)
      .first()
      .should("have.css", "border-color", purpleCircle)
    cy.get(circleSelector)
      .first()
      .should("have.css", "border-color", blueCircle)
    cy.get(circleSelector).each( ($el) => {
      cy.get($el).contains('tail').should("have.length", 0);
    });
  });
  it('очистка работает корректно', function () {
    if (cy.get(circleSelector).first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@clear').click();
    cy.get(circleSelector).each( ($el) => {
      cy.get($el).contains('head').should("have.length", 0);
      cy.get($el).should("have.css", "border-color", blueCircle);
    });
  });
});