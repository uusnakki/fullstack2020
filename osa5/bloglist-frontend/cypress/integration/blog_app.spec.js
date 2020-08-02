describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      user: 'Joonas',
      username: 'sanooj',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('#username').type('sanooj')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Logged in!')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login')
      cy.get('#username').type('sanooj')
      cy.get('#password').type('tamaonvaarin')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.contains('login')
      cy.get('#username').type('sanooj')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Logged in!')
    })

    it('A blog can be created', function() {
     cy.contains('new blog').click()
     cy.get('#title').type('IT Wars')
     cy.get('#author').type('Steve Jobs')
     cy.get('#url').type('www.google.com')
     cy.get('#create-button').click()
     cy.contains('IT Wars - Steve Jobs')
    })
    it('A blog can be created and deleted', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Its Like that')
      cy.get('#author').type('Bill Gates')
      cy.get('#url').type('www.microsoftmediaplayer.com')
      cy.get('#create-button').click()
      cy.contains('Its Like that - Bill Gates')
      cy.contains('delete').click()
      cy.contains('Its Like that deleted')
     })
  })
})