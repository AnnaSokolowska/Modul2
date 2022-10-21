/// <reference types="cypress" />

describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  it('Открыть модальное окно', () => {
    cy.get('.js-add').click();
    cy.get('.form-overlay').should('have.class', 'is-visible');
  });
  it('Добавить контакт', () => {
    cy.get('.js-add').click();
    cy.get('[name="name"]').type('Иван');
    cy.get('[name="surname"]').type('Петров');
    cy.get('[name="phone"]').type('89993452334');
    cy.get('[type="submit"]').click();
    cy.get('tbody').get('.contact').should('contain.html','<td class="delete"><button class="del-icon"></button></td><td>Иван</td><td>Петров</td><td><a href="tel:89993452334">+89993452334</a></td>');
  });
  it('Открыть блок удаления', () => {
    cy.contains('Удалить').click();
    cy.get('.delete').should('have.class', 'is-visible');
  });
  it('Удалить контакт', () => {
    cy.get('.js-add').click();
    cy.get('[name="name"]').type('Иван');
    cy.get('[name="surname"]').type('Петров');
    cy.get('[name="phone"]').type('89993452334');
    cy.get('[type="submit"]').click();
    cy.contains('Удалить').click();
    cy.get('.delete').should('have.class', 'is-visible');
    cy.get('.del-icon').click();
    cy.get('tbody').should('be.empty');
  });
});
