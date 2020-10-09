describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('[data-cy=username]').should('be.visible')
    cy.get('[data-cy=password]').should('be.visible')
    cy.get('[data-cy=loginSubmit]')
      .should('be.visible')
      .and('contain', 'login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-cy=username]').type('mluukkai')
      cy.get('[data-cy=password]').type('salainen')
      cy.get('[data-cy=loginSubmit').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[data-cy=username]').type('mluukkai')
      cy.get('[data-cy=password]').type('wrong')
      cy.get('[data-cy=loginSubmit').click()
      cy.contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})