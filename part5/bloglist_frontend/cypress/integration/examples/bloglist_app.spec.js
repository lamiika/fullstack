describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.createUser(user)
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

  describe('When logged in', function() {
    beforeEach(function() {
      const credentials = {
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.login(credentials)
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

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'First title', author: 'First author', url: 'first-url.com' })
        cy.createBlog({ title: 'Second title', author: 'Second author', url: 'second-url.com' })
        cy.createBlog({ title: 'Third title', author: 'Third author', url: 'third-url.com' })
      })

      it('a blog can be liked', function() {
        cy.get('.togglableInfoDiv')
          .contains('first-url.com')
          .parent()
          .as('likeDiv')

        cy.get('.blogVisibleDiv')
          .contains('First title')
          .click()

        cy.get('@likeDiv')
          .contains('likes 0')
        cy.get('@likeDiv')
          .contains('like')
          .click()
        cy.get('@likeDiv')
          .contains('likes 1')
      })

      it('a logged in user can delete a blog they created', function() {
        cy.get('.blogVisibleDiv')
          .contains('First title')
          .click()
        cy.get('.togglableInfoDiv')
          .contains('first-url.com')
          .parent()
          .contains('remove')
          .click()
        cy.get('.blogVisibleDiv')
          .should('not.contain', 'First title')
      })

      it('a logged in user cannot delete a blog they didn\'t create', function() {
        cy.createUser({ username: 'wrong', password: 'salainen', name: 'very wrong' })
        cy.login({ username: 'wrong', password: 'salainen' })

        cy.get('.togglableInfoDiv')
          .contains('first-url.com')
          .parent()
          .contains('remove')
          .as('deleteButton')

        cy.get('.blogVisibleDiv')
          .contains('First title')
          .click()
        cy.get('@deleteButton')
          .should('not.be.visible')
        cy.get('@deleteButton')
          .click({ force: true })
        cy.get('.blogVisibleDiv')
          .should('contain', 'First title')
      })
    })
  })
})