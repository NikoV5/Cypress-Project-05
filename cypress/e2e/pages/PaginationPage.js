class PaginationPage {
  // locators
  getMainHeader() {
    return cy.get(".is-size-3");
  }
  getSubHeader() {
    return cy.get("#sub_heading");
  }
  getParagraph() {
    return cy.get("#content");
  }
  getPrevButton() {
    return cy.get("#previous");
  }
  getNextButton() {
    return cy.get("#next");
  }
  getCityImage() {
    return cy.get(".city_image");
  }
  getCityInfo() {
    return cy.get(".Pagination_pagBodyData__vG6oj > p");
  }
  // methods
  goToTheWebPage(url) {
    return cy.visit(url);
  }
}

export default PaginationPage;