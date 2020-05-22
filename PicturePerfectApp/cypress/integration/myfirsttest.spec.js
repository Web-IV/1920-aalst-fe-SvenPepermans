describe('My First Test', function() {
    it('our app runs', function() {
      cy.visit('/');
      cy.get('[data-cy=filterInput]').type('wan');
      cy.get('[data-cy=postCard]').should('have.length', 1);
    });
  
    it('mock post get', function() {
      cy.server({ delay: 1000 });
      cy.route({
        method: 'GET',
        url: '/api/posts',
        status: 200,
        response: 'fixture:posts.json'
      });
  
      cy.visit('/');
      cy.get('[data-cy=postCard]').should('have.length', 2);
    });
    it('on error should show error message', function() {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/posts',
        status: 500,
        response: 'ERROR'
      });
      cy.visit('/');
      cy.get('[data-cy=appError]').should('be.visible');
    });
  });