import { inputSelector, circleSelector } from "../../src/constants/cypress";

describe('Проверка работы страницы "Последовательность Фибоначчи"', function () {

  beforeEach(() => {
    cy.visit("/fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.get(inputSelector).first().as('input');
    cy.contains('Рассчитать').first().as('button');
  });

  it('кнопка отключена при пустом инпуте', function () {
    cy.get('@input').should('be.empty').get('@button').should('be.disabled');
  });

  it('числа генерируются корректно', function () {
    const inputValue = 2;
    const result = '011';
    cy.get('@input').should('be.empty').type(inputValue);
    cy.get('@button').click();
    cy.wait(1000);
    cy.get(circleSelector).each(($el, index) => {
      cy.get($el)
        .contains(result[index])
    });
  })

});