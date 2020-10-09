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

  describe.only('When logged in', function() {
    beforeEach(function() {
      const credentials = {
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/login', credentials)
        .then((response) => {
          localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
      })
    })
    
    it('A blog can be created', function() {
      cy.contains('create new blog')
        .click()
      cy.get('[data-cy=title]')
        .type('Creating a blog with Cypress')
      cy.get('[data-cy=author]')
        .type('Full stack developer')
      cy.get('[data-cy=url]')
        .type('https://github.com/lamiika')
      cy.get('[data-cy=blogSubmit]')
        .contains('create')
        .click()
      cy.get('.blogVisibleDiv')
        .contains('Creating a blog with Cypress')
        .contains('Full stack developer')
        .should('be.visible')
    })
  })
})