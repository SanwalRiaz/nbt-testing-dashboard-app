describe('Company Page', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  it('Lists companies', () => {
    cy.visit('/');
    cy.get('#formBasicEmail').type('admin@test.com');
    cy.get('#formBasicPassword').type(`Oufo@i8a`);
    cy.get('form > button').click();
    cy.get('.alert-heading').should('contain', 'Admin User');
    cy.get('#root').should('contain', 'Login successful!');
    cy.get('[href="/company"]').click();
    cy.get('h2').should('contain', 'Company List');
    cy.get('table').should('exist');
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Creates a new company with empty fields', () => {
    cy.get('[href="/company"]').click();
    cy.get('.btn').should('contain', 'New Company').click();
    cy.get(':nth-child(1) > .form-control').clear();
    cy.get(':nth-child(2) > .form-control').clear();
    cy.get(':nth-child(3) > .form-control').clear();
    cy.get(':nth-child(4) > .form-control').clear();
    cy.get(':nth-child(5) > .form-control').clear();
    cy.get('form > button').should('be.disabled');
    cy.get(':nth-child(1) > .text-danger').should(
      'contain',
      'Please enter company name.'
    );
    cy.get(':nth-child(3) > .text-danger').should(
      'contain',
      'Please enter company address.'
    );
    cy.get(':nth-child(2) > .text-danger').should(
      'contain',
      'Please enter company email.'
    );
    cy.get(':nth-child(4) > .text-danger').should(
      'not.exist',
      'Please enter company phone number.'
    );
    cy.get(':nth-child(5) > .text-danger').should(
      'not.exist',
      'Please enter company website.'
    );
  });

  it('Creates a new company with valid data', () => {
    cy.get('div > a:nth-child(2)').click();
    cy.get('.btn').should('contain', 'New Company').click();
    cy.get(':nth-child(1) > .form-control').type('Test Company 123');
    cy.get(':nth-child(2) > .form-control').type('testing123@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('Dresden Germany');
    cy.get(':nth-child(4) > .form-control').type('123455667990');
    cy.get(':nth-child(5) > .form-control').type('www.testing1234.com');
    cy.get('form > button').should('be.enabled').click();
  });

  it('Finds the saved company on last page', () => {
    cy.get('li')
      .should('have.length.gt', 0)
      .its('length')
      .then((n) => {
        cy.get('li')
          .eq(n - 1)
          .click();
      });
    cy.get('table > tbody')
      .find('tr')
      .find('td:nth-child(1)')
      .then((row) => {
        const rowCount = row.length;
        cy.get('table > tbody > tr')
          .find('td:nth-child(1)')
          .eq(rowCount - 1);
        cy.get(
          `table > tbody > tr:nth-child(${rowCount}) > td:nth-child(1)`
        ).then(($last) => {
          const lastItem = $last.text();
          let lastID = parseInt(lastItem);
          cy.get(
            `table > tbody > tr:nth-child(${rowCount}) > td:nth-child(1)`
          ).should('contain.text', lastID + 1);
        });
      });
    cy.get('table > tbody > tr > td').should(
      'contain.text',
      'Test Company 123'
    );
  });
  it('Creates a new company with invalid data', () => {
    cy.get('div > a:nth-child(2)').click();
    cy.get('.btn').should('contain', 'New Company').click();
    cy.get(':nth-child(1) > .form-control').type('Test Company 1234');
    cy.get(':nth-child(2) > .form-control').type('testing123m');
    cy.get(':nth-child(3) > .form-control').type('1234');
    cy.get(':nth-child(4) > .form-control').type('phone number');
    cy.get(':nth-child(5) > .form-control').type('testing1234');
    cy.get('form > button').should('be.disabled');
    cy.get(':nth-child(3) > .text-danger').should(
      'contain',
      'Please enter valid company address.'
    );
    cy.get(':nth-child(2) > .text-danger').should(
      'contain',
      'Please enter valid company email.'
    );
    cy.get(':nth-child(4) > .text-danger').should(
      'contain',
      'Please enter valid company phone number.'
    );
    cy.get(':nth-child(5) > .text-danger').should(
      'contain',
      'Please enter valid company website.'
    );
  });

  it('Edit a company with empty data', () => {
    cy.get('div > a:nth-child(2)').click();
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
    cy.get('.btn').should('contain', 'Edit Company').click();
    cy.get('h2').should('contain', 'Update Company');
    cy.get(':nth-child(1) > .form-control').clear();
    cy.get(':nth-child(2) > .form-control').clear();
    cy.get(':nth-child(3) > .form-control').clear();
    cy.get(':nth-child(4) > .form-control').clear();
    cy.get(':nth-child(5) > .form-control').clear();
    cy.get('form > button').should('be.disabled');
    cy.get(':nth-child(1) > .text-danger').should(
      'contain',
      'Please enter company name.'
    );
    cy.get(':nth-child(3) > .text-danger').should(
      'contain',
      'Please enter company address.'
    );
    cy.get(':nth-child(2) > .text-danger').should(
      'contain',
      'Please enter company email.'
    );
    cy.get(':nth-child(4) > .text-danger').should(
      'not.exist',
      'Please enter company phone number.'
    );
    cy.get(':nth-child(5) > .text-danger').should(
      'not.exist',
      'Please enter company website.'
    );
  });

  it('Edit a company with valid data', () => {
    cy.get(':nth-child(1) > .form-control').type('Test Company abc1');
    cy.get(':nth-child(2) > .form-control').type('testingabc1@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('Dresden Germany GmbH');
    cy.get(':nth-child(4) > .form-control').type('5555');
    cy.get(':nth-child(5) > .form-control').type('www.testingabc1.com');
    cy.get('form > button').should('be.enabled').click();
    cy.get('.card-title').should('contain.text', 'Test Company abc1');
    cy.get('.card-text >br')
      .eq(1)
      .should('contain.text', 'testingabc1@gmail.com');
    cy.get('.card-text >br').eq(2).should('www.testingabc1.com');
    cy.get('p:nth-child(2)').should('contain.text', 'Dresden Germany GmbH');
  });

  it('Edit a company with invalid data', () => {
    cy.get('.btn').eq(1).click();
    cy.get('h2').should('contain.text', 'Update Company');
    cy.get(':nth-child(1) > .form-control').type('Test Company abc1');
    cy.get(':nth-child(2) > .form-control').type('testingabc1');
    cy.get(':nth-child(3) > .form-control').type('1234');
    cy.get(':nth-child(4) > .form-control').type('phone nhumber');
    cy.get(':nth-child(5) > .form-control').type('testingabc1');
    cy.get('form > button').should('be.disabled');
    cy.get(':nth-child(3) > .text-danger').should(
      'contain',
      'Please enter valid company address.'
    );
    cy.get(':nth-child(2) > .text-danger').should(
      'contain',
      'Please enter valid company email.'
    );
    cy.get(':nth-child(4) > .text-danger').should(
      'contain',
      'Please enter valid company phone number.'
    );
    cy.get(':nth-child(5) > .text-danger').should(
      'contain',
      'Please enter valid company website.'
    );
  });

  it('Create Company Project with empty fields', () => {
    cy.get('.btn').eq(0).click();
    cy.get('#uncontrolled-tab-example-tabpane-projects > table > thead > tr')
      .should('contain', '#')
      .and('contain', 'Name')
      .and('contain', 'Description')
      .and('contain', 'Start Date')
      .and('contain', 'End Date');
    cy.get('.btn').eq(2).should('contain.text', 'New Project').click();
    cy.get(':nth-child(1) > .form-control').clear();
    cy.get(':nth-child(2) > .form-control').clear();
    cy.get(':nth-child(3) > .form-control').clear();
    cy.get(':nth-child(4) > .form-control').clear();
    cy.get(':nth-child(3) > .form-control').click();
    cy.get('button').eq(4).should('be.disabled');
    cy.get(':nth-child(1) > .text-danger').should(
      'contain',
      'Please enter project name.'
    );
    cy.get(':nth-child(2) > .text-danger').should(
      'contain',
      'Please enter project description.'
    );
    cy.get(':nth-child(3) > .text-danger').should(
      'not.exist',
      'Please enter Start Date'
    );
    cy.get(':nth-child(4) > .text-danger').should(
      'not.exist',
      'Please enter End Date'
    );
  });

  it('Create Company Project with valid data', () => {
    cy.get(':nth-child(1) > .form-control').type('Test Project1');
    cy.get(':nth-child(2) > .form-control').type('Test Project, assignment');
    cy.get(':nth-child(3) > .form-control').type('10/10/2010');
    cy.get(':nth-child(4) > .form-control').type('12/12/2028');
    cy.get('button').eq(4).should('be.enabled').click();
  });

  it('finds if the project is saved', () => {
    cy.get('table > tbody')
      .find('tr')
      .find('td:nth-child(1)')
      .then((row) => {
        const rowCount = row.length;
        cy.get('table > tbody > tr')
          .find('td:nth-child(1)')
          .eq(rowCount - 1);
        cy.get(
          `table > tbody > tr:nth-child(${rowCount}) > td:nth-child(1)`
        ).then(($last) => {
          const lastItem = $last.text();
          let lastID = parseInt(lastItem);
          cy.get(
            `table > tbody > tr:nth-child(${rowCount}) > td:nth-child(1)`
          ).should('contain.text', lastID + 1);
        });
      });
    cy.get('table > tbody > tr > td').should('contain.text', 'Test Project1');
  });

  it('Creates a new project with invalid data', () => {
    cy.get('#uncontrolled-tab-example-tabpane-projects > table > thead > tr')
      .should('contain', '#')
      .and('contain', 'Name')
      .and('contain', 'Description')
      .and('contain', 'Start Date')
      .and('contain', 'End Date');
    cy.get('.btn').eq(2).should('contain.text', 'New Project').click();
    cy.get(':nth-child(1) > .form-control').type('%%§§%%%""');
    cy.get(':nth-child(2) > .form-control').type('§§$$%%%&&&');
    cy.get(':nth-child(3) > .form-control').type('13/13/3344');
    cy.get(':nth-child(4) > .form-control').type('-1/13/0000');
    cy.get('form > button').should('be.disabled');
    cy.get(':nth-child(1) > .text-danger').should(
      'contain',
      'Please enter valid project name.'
    );
    cy.get(':nth-child(2) > .text-danger').should(
      'contain',
      'Please enter valid project description.'
    );
    cy.get(':nth-child(3) > .text-danger').should(
      'not.exist',
      'Please enter valid Start Date'
    );
    cy.get(':nth-child(4) > .text-danger').should(
      'not.exist',
      'Please enter valid End Date'
    );
  });

  it('checks Company Users list is available', () => {
    cy.get('.me-auto > [href="/company"]').click();
    cy.get('li').eq(-4).click();
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
