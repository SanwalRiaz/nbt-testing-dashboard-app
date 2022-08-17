describe('Company Page', () => {

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Lists companies', () => {
    cy.visit('/');
    cy.get('#formBasicEmail').type('user@test.com');
    cy.get('#formBasicPassword').type(`Joh:fai4`);
    cy.get('form > button').click();
    cy.get('.alert-heading').should('contain', 'Normal User');
    cy.get('#root').should('contain', 'Login successful!');
    cy.get('[href="/company"]').click();
    cy.get('h2').should('contain', 'Company List');
    cy.get('table').should('exist');
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Cannot create a new company', () => {
    cy.get('[href="/company"]').click();
    cy.get('.btn').should('not.exist', 'New Company');
  });

  it('Cannot Edit a company', () => {
    cy.get('table > tbody > tr > td:nth-child(2)')
      .should('have.length.gt', 1)
      .its('length')
      .then(cy.log)
      .then((n) => Cypress._.random(0, n - 1))
      .then(cy.log)
      .then((k) => {
        cy.get('table > tbody > tr > td:nth-child(2)').eq(k).click();
      });
    cy.get('h2').should('contain', 'Company Detail');
    cy.get('.ms-auto > a > .btn').should('contain', 'Edit Company').click();
    cy.get('.container').should(
      'contain.text',
      'You are not authorized to edit companies'
    );
  });

  it('Cannot create Company Project', () => {
    cy.get('[href="/company"]').click();
    cy.get('table > tbody > tr > td:nth-child(2)')
      .should('have.length.gt', 1)
      .its('length')
      .then(cy.log)
      .then((n) => Cypress._.random(0, n - 1))
      .then(cy.log)
      .then((k) => {
        cy.get('table > tbody > tr > td:nth-child(2)').eq(k).click();
      });
    cy.get('h2').should('contain', 'Company Detail');
    cy.get('.btn').eq(2).should('not.exist', 'New Project');
  });

  it('Checks Company Users list is available', () => {
    cy.get('.me-auto > [href="/company"]').click();
    cy.get('li').first().click();
    cy.get('table > tbody > tr > td:nth-child(2)')
      .should('have.length.gt', 1)
      .its('length')
      .then(cy.log)
      .then((n) => Cypress._.random(0, n - 1))
      .then(cy.log)
      .then((k) => {
        cy.get('table > tbody > tr > td:nth-child(2)').eq(k).click();
      });
    cy.get('h2').should('contain.text', 'Company Detail');
    cy.get('#uncontrolled-tab-example-tab-users').click();
    cy.get('#uncontrolled-tab-example-tabpane-users > .table > thead >tr')
      .should('contain', '#')
      .and('contain', 'Name')
      .and('contain', 'Username')
      .and('contain', 'Email')
      .and('contain', 'Title')
      .and('contain', 'Address');
    cy.get('#uncontrolled-tab-example-tabpane-users > table > tbody').should(
      'contain',
      'tr'
    );
  });
});
