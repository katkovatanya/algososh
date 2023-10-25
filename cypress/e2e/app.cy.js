describe('Запуск приложения', function () {
  it('Запущено на локальном сервере', function () {
    cy.visit('http://localhost:3000');
  });
}); 