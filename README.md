# Prerequisites

After cloning repository, you need to install these dependencies:
- NPM
- Cypress
- Cucumber -> @badeball/cypress-cucumber-preprocessor
- Cucumber -> @bahmutov/cypress-esbuild-preprocessor -D

If you dont have the extensions already installed in VScode, you will need these for cucumber to work:
- Cucumber (Gherkin) Full Support -> Alexander Krechik
- Cuke Step Definition Generator -> Muralidharan Rajendran

## Initialize The Project

Once you open your framework, initialize it as a node.js project with the following command:

```bash
npm init -y
```

## Install Cypress

```bash
npm install cypress -D
```

## Install @badeball/cypress-cucumber-preprocessor
This preprocessor aims to provide a developer experience and behavior similar to that of Cucumber, to Cypress.

```bash
npm install @badeball/cypress-cucumber-preprocessor -D
```

## Install @bahmutov/cypress-esbuild-preprocessor

```bash
npm install @bahmutov/cypress-esbuild-preprocessor -D
```

## Write Your Actual Code
``` javascript
/// <reference types="cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the TechGlobal Home Page", () => {
    cy.visit('https://techglobal-training.com/')
});

Then("I should see the url and title properly displayed", () => {
    cy.title().should('eq', 'TechGlobal Training | Home')
    cy.url().should('contain', 'techglobal-training')
});
```

# Configure Environment Variables

This is used to protect sensitive or environment-specific data

Advantage: Secure and flexible test configurations

## Install the dotenv dependency

```
npm install dotenv -D
```

## Create a .env File

```
touch .env
```

## Add Environment Variables

```
baseURL=https://www.techglobal-training.com/
```

## Modify cypress.config.js file

``` javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

require('dotenv').config();

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  env: { ...process.env },
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
```

## Use Environment Variables in Step Definitions

``` javascript
/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();

Given("I am on the TechGlobal Home Page", function () {
    cy.visit(Cypress.env('baseURL'))
});

Then("I should see the url and title properly displayed", () => {
    cy.title().should('eq', 'TechGlobal Training | Home')
    cy.url().should('contain', 'techglobal-training')
});

Given("I am on the TechGlobal Login Project", () => {
    cy.visit(`${Cypress.env('baseURL')}frontend/project-2`)
});

When("I enter username as {string}", (username) => {
    loginPage.enterUsername(username)
});

When("I enter password as {string}", (password) => {
    loginPage.enterPassword(password)
});

When("I click on the login button", () => {
    loginPage.clickOnLoginButton()
});

Then("I should see the success message as {string}", (message) => {
    loginPage.getSuccessMessage().should('be.visible').and('have.text', message)
});
```

## Diagnostics / dry run

A diagnostics utility is provided to verify that each step matches one, and only one, step definition. This can be run as shown below.

``` bash
npx cypress-cucumber-diagnostics
```

## Tags

Integrating tags with Cypress feature files involves leveraging Cucumber tags to organize and selectively run your tests based on predefined criteria.

``` gherkin
@Smoke @Regression
Feature: TechGlobal Validation

  Scenario: Validate the Home Page Visit
    Given I am on the TechGlobal Home Page
    Then I should see the url and title properly displayed

  Scenario: Validate the Successful Login
    Given I am on the TechGlobal Login Project
    When I enter username as "TechGlobal"
    And I enter password as "Test1234"
    And I click on the login button
    Then I should see the success message as "You are logged in"
```

### Configure cypress.config.js
Normally when running a subset of scenarios using cypress run --env tags=@foo, you could potentially encounter files containing no matching scenarios. These can be pre-filtered away by setting filterSpecs to true, thus saving you execution time.

By default, all filtered tests are made pending using it.skip method. If you want to completely omit them, set omitFiltered to true.

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

require('dotenv').config();

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  env: { 
    ...process.env,
    filterSpecs: true,
    omitFiltered: true
   },
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
```
