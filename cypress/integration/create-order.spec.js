describe('Tests burger constructor', function() {
	beforeEach(() => {
		cy.visit('http://localhost:3000');

		cy.get('[data-test-id="list-bun"]').as('listBun');
		cy.get('[data-test-id="list-sauce"]').as('listSauce');
		cy.get('[data-test-id="list-main"]').as('listMain');
		cy.get('[data-test-id="burger-constructor"]').as('burgerConstructor');
	});

	it('has burger ingredients and constructor', () => {
		cy.get('@listBun').should('have.length.above', 0);
		cy.get('@listSauce').should('have.length.above', 0);
		cy.get('@listMain').should('have.length.above', 0);
		cy.get('@burgerConstructor').should('have.length.above', 0);
	});

	it('modal window showing description of ingredients', () => {
		cy.get('@listBun').find('li').eq(0).click();

		cy.get('[data-test-id="modal-details"]')
			.as('modalDetails')
			.should('exist');
		cy.get('@modalDetails')
			.find('[data-test-id="ingredient-name"]')
			.should('exist');
		cy.get('@modalDetails')
			.find('[data-test-id="ingredient-calorie"]')
			.should('exist');

		cy.get('@modalDetails').find('.btn-clear').click();
		cy.get('@modalDetails').should('not.exist');
	});

	it('order must be created', () => {
		cy.get('@listBun').find('li').eq(0).trigger('dragstart');
		cy.get('@burgerConstructor').trigger('drop');

		cy.get('@listSauce').find('li').eq(0).trigger('dragstart');
		cy.get('@burgerConstructor').trigger('drop');

		cy.get('@listMain').find('li').eq(0).trigger('dragstart');
		cy.get('@burgerConstructor').trigger('drop');

		cy.get('[data-test-id="constructor-list"]').should('have.length.above', 0);
		cy.get('[data-test-id="total-order"]').as('totalOrder').should('have.length.above', 0);

		cy.get('@totalOrder').find('button').click();

		cy.get('[data-test-id="form-login"]').as('formLogin').should('have.length.above', 0);
		cy.get('@formLogin').find('input[name="email"]').type('test777@gmail.com');
		cy.get('@formLogin').find('input[name="password"]').type('test777');
		cy.get('@formLogin').find('button').contains('Войти').click();

		cy.get('@totalOrder').find('button').click();
		cy.wait(15000);
		cy.get('[data-test-id="modal-order"]').as('modalOrder').should('have.length.above', 0);
		cy.get('[data-test-id="modal-order"]').as('modalOrder').should('have.length.above', 0)
		cy.get('@modalOrder').find('[data-test-id="order-number"]').should('exist');
		cy.get('@modalOrder').find('.btn-clear').click();
		cy.get('@modalOrder').should('not.exist');
	});
});
