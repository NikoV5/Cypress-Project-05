import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import PaginationPage from "../pages/PaginationPage";

const pagination = new PaginationPage();

Given("the user is on {string}", (url) => {
  pagination.goToTheWebPage(url);
});

Then(/^the user should see the "([^"]*)" heading$/, (heading) => {
  pagination.getMainHeader().should("have.text", heading);
});

Then(/^the user should see the "World City Populations 2022" sub heading$/, () => {
  pagination.getSubHeader().should("have.text", "World City Populations 2022");
});

Then(/^the user should see the "([^"]*)" paragraph$/, (paragraph) => {
  pagination.getParagraph().should("contain", paragraph);
});

// Second Scenario

Then(/^the user should see the “Previous” button is disabled$/, () => {
  pagination.getPrevButton().should("be.disabled");
});

Then(/^the user should see the “Next” button is enabled$/, () => {
  pagination.getNextButton().should("be.enabled");
});

When(/^the user clicks on the “Next” button$/, () => {
  pagination.getNextButton().click();
});

Then(/^the user should see the “Previous” button is enabled$/, () => {
  pagination.getPrevButton().should("be.enabled");
});

When(/^the user clicks on the “Next” button till it becomes disabled$/, () => {
  cy.reload();
  for (let i = 0; i < 4; i++) {
    pagination.getNextButton().click();
  }
});

Then(/^the user should see the “Next” button is disabled$/, () => {
  pagination.getNextButton().should("be.disabled");
});

// Third Scenario

Then(/^the user should see “Tokyo” City with the info below and an image$/, (dataTable) => {
  pagination.getCityImage().should("be.visible");
  const tokyoInfo = dataTable.rawTable.flat();
  pagination.getCityInfo().each(($el, index) => {
    cy.wrap($el).should("have.text", tokyoInfo[index]);
  });
});

Then(/^the user should see “Delhi” City with the info below and an image$/, (dataTable) => {
  pagination.getCityImage().should("be.visible");
  const DelhiInfo = dataTable.rawTable.flat();
  pagination.getCityInfo().each(($el, index) => {
    cy.wrap($el).should("have.text", DelhiInfo[index]);
  });
});

Then(/^the user should see “Shangai“ City with the info below and an image$/, (dataTable) => {
  pagination.getCityImage().should("be.visible");
  const shangiInfo = dataTable.rawTable.flat();
  pagination.getCityInfo().each(($el, index) => {
    cy.wrap($el).should("have.text", shangiInfo[index]);
  });
});

Then(/^the user should see “Sao Paulo“ City with the info below and an image$/, (dataTable) => {
  pagination.getCityImage().should("be.visible");
  const saoPauloInfo = dataTable.rawTable.flat();
  pagination.getCityInfo().each(($el, index) => {
    cy.wrap($el).should("have.text", saoPauloInfo[index]);
  });
});

Then(/^the user should see “Mexico City” City with the info below and an image$/, (dataTable) => {
  pagination.getCityImage().should("be.visible");
  const mexicoInfo = dataTable.rawTable.flat();
  pagination.getCityInfo().each(($el, index) => {
    cy.wrap($el).should("have.text", mexicoInfo[index]);
  });
});