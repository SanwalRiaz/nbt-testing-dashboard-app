describe('The Login Page', () => {

  it('Login with correct Username and Password as a Normal User successfully', function () {
    cy.visit('/')
    cy.get('#formBasicEmail').type('user@test.com')
    cy.get('#formBasicPassword').type(`Joh:fai4`)
    cy.get('form > button').click()
    cy.get('.alert-heading').should('contain', 'Normal User')
    cy.get('#root').should('contain', 'Login successful!')
  })

  it('Login with correct Username and incorrect Password as a Normal User unsuccessfully', function () {
    cy.visit('/')
    cy.get('#formBasicEmail').type('user@test.com')
    cy.get('#formBasicPassword').type(`testing`)
    cy.get('form > button').click()
    cy.get('#root').should('contain', 'Invalid email or password')
  })

  it('Login with incorrect Username and incorrect Password unsuccessfully', function () {
    cy.visit('/')
    cy.get('#formBasicEmail').type('testing123@test.com')
    cy.get('#formBasicPassword').type(`testing`)
    cy.get('form > button').click()
    cy.get('#root').should('contain', 'Invalid email or password')
  })

  it('Login with empty Username and empty Password unsuccessfully', function () {
    cy.visit('/')
    cy.get('#formBasicEmail').clear()
    cy.get('#formBasicPassword').clear()
    cy.get('form > button').should('be.disabled')
    cy.get('#root').should('contain', 'Please enter your e-mail.')
  })

  it('Login with correct Username and Password as Admin User successfully', function () {
    cy.visit('/')
    cy.get('#formBasicEmail').type('admin@test.com')
    cy.get('#formBasicPassword').type(`Oufo@i8a`)
    cy.get('form > button').click()
    cy.get('.alert-heading').should('contain', 'Admin User')
    cy.get('#root').should('contain', 'Login successful!')
  })

  it('Login with correct Username and incorrect Password as a Admin User unsuccessfully', function () {
    cy.visit('/')
    cy.get('#formBasicEmail').type('admin@test.com')
    cy.get('#formBasicPassword').type(`fasdas`)
    cy.get('form > button').click()
    cy.get('#root').should('contain', 'Invalid email or password')
  })

})
