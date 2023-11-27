const getLastUrlPath = (url) => url.split('/').pop();

describe('a user rates the last two thumbnails in the backlog', () => {
  before(() => {
    cy.exec(
      'copy .\\cypress\\fixtures\\good.png .\\public\\images\\backlog\\good.png',
      { failOnNonZeroExit: false }
    );
    cy.exec(
      'copy .\\cypress\\fixtures\\bad.png .\\public\\images\\backlog\\bad.png',
      { failOnNonZeroExit: false }
    );
  });

  after(() => {
    cy.exec('del .\\public\\images\\backlog\\good.png', {
      failOnNonZeroExit: false,
    });
    cy.exec('del .\\public\\images\\backlog\\bad.png', {
      failOnNonZeroExit: false,
    });
    cy.exec('del .\\public\\images\\good\\good.png', {
      failOnNonZeroExit: false,
    });
    cy.exec('del .\\public\\images\\good\\bad.png', {
      failOnNonZeroExit: false,
    });
    cy.exec('del .\\public\\images\\bad\\bad.png', {
      failOnNonZeroExit: false,
    });
    cy.exec('del .\\public\\images\\bad\\good.png', {
      failOnNonZeroExit: false,
    });
  });
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('user can see the thumbnail on the page and vote on it via buttons', () => {
    cy.get('#image')
      .should('have.attr', 'src')
      .as('firstThumbnailId')
      .should('matches', /(good\.png)|(bad\.png)/g);
    cy.get('@firstThumbnailId').then((firstThumbnailId) => {
      this.firstThumbnailId = firstThumbnailId;
    });
    cy.get('#upvote').should('exist');
    cy.get('#downvote').should('exist');
  });

  it('user can upvote on the thumbnail which moves it to the good directory', () => {
    // cy.get('#image').as('thumbnail');
    cy.get('#upvote').click().should('exist');
    // cy.get('@thumbnail').then((thumbnail) => {
    //   const thumbnailId = getLastUrlPath(thumbnail.attr('src'));
    //   cy.exec(
    //     `copy .\\public\\images\\backlog\\${thumbnailId} .\\public\\images\\good\\${thumbnailId}`,
    //     {
    //       failOnNonZeroExit: false,
    //     }
    //   );
    cy.exec(
      `if exist .\\public\\images\\good\\${getLastUrlPath(
        this.firstThumbnailId
      )} echo File exists`,
      { failOnNonZeroExit: false }
    );
    cy.exec(
      `if not exist .\\public\\images\\backlog\\${getLastUrlPath(
        this.firstThumbnailId
      )} echo File does not exist`,
      { failOnNonZeroExit: false }
    );
  });

  it('user sees a new thumbnail on the screen', () => {
    cy.get('#image')
      .should('have.attr', 'src')
      .as('secondThumbnailId')
      .then((secondThumbnailId) => {
        this.secondThumbnailId = secondThumbnailId;
        expect(secondThumbnailId).to.not.equal(this.firstThumbnailId);
      });
  });

  it('user downvotes the thumnbail wich moves it to the bad directiry', () => {
    cy.get('#downvote').click();
    cy.exec(
      `
      if exist .\\public\\images\\bad\\${getLastUrlPath(
        this.secondThumbnailId
      )} echo File exists`
    );
    cy.exec(
      `if not exist .\\public\\images\\backlog\\${getLastUrlPath(
        this.secondThumbnailId
      )} echo File does not exist`
    );
  });

  it('user no longer sees any thumbail since the backlog is empty', () => {
    cy.get('#image')
      .should('have.attr', 'src')
      .then((finalThumbnailId) => {
        expect(getLastUrlPath(finalThumbnailId)).to.equal('');
      });
  });
});
