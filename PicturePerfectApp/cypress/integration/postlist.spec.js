describe("Post List tests", function() {
  beforeEach(function() {
    cy.login();
  });

  it("delayed response brings state out of sync", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/posts",
      status: 200,
      response: "fixture:posts.json"
    });
    cy.route({
      delay: 2000,
      method: "GET",
      url: "/api/posts/?beschrijving=wan",
      status: 200,
      response: "fixture:lentewandeling.json"
    }).as("getWANposts");
    cy.route({
      method: "GET",
      url: "/api/recipes/?beschrijving=fi",
      status: 200,
      response: "fixture:fietsen.json"
    }).as("getFIposts");

    cy.visit("/");
    cy.get("[data-cy=filterInput]").type("wan");
    cy.wait(300);
    cy.get("[data-cy=filterInput]").type("{backspace}{backspace}{backspace}fi");
    cy.wait(["@getWANposts", "@getFIposts"]);
    cy.get("[data-cy=postCard]").should("have.length", 1);
    cy.get("[data-cy=post-title]").should("contain", "SvenP");
  });

  it("delete while showing", () => {
    cy.server();

    // add a recipe using a direct request
    cy.request({
      method: "POST",
      url: "/api/posts",
      body: {
        beschrijving: "Ons lekkere avondeten",
        categorieNaam: "food",
        fotos: [{
        naam: "tomahowksteak.png",
        url: "C:\Users\svenp\Documents\GitHub\1920-aalst-be-SvenPepermans\PicturePerfectAPI\PicturePerfectAPI\Resources\Images\tomahowksteak.png",
        base64: "ookditiseenbase64"
        }],
        datePosted: "2018-03-13T12:40:03.184905",
        gebruiker: {
            gebruikersId: 1,
            voornaam: "Sven",
            achternaam: "Pepermans",
            gebruikersnaam: "SvenP",
            email: "svenp@gmail.com"
        }
      },
      auth: {
        bearer: localStorage.getItem("currentUser")
      }
    }).then(postJson => {
      // check we have two before we start
      cy.visit("/");
      cy.get("[data-cy=filterInput]").type("wan");
      cy.wait(300);
      cy.get("[data-cy=postCard]").should("have.length", 1);
      // click the second delete button
      cy.get("[data-cy=postList")
        .find("button")
        .eq(1)
        .click();
      // the newly added one should be deleted (and our view automatically updated)
      cy.get("[data-cy=postCard]").should("have.length", 1);
    });
  });
});
