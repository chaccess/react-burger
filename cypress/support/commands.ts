/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("drag", (ingredientId: string) => {
	cy.get(`[data-cy='ingredient_${ingredientId}']`).trigger("dragstart");
	cy.get("[data-cy='dropTarget']").trigger("drop");
});

Cypress.Commands.add("getCount", (ingredientId: string) => {
	return cy
		.get(`[data-cy='card_${ingredientId}'] .counter__num`)
		.invoke("text")
		.then(parseInt);
});

Cypress.Commands.add("doesNotHaveCount", (ingredientId: string) => {
	cy.get(`[data-cy='card_${ingredientId}'] .counter__num`).should("not.exist");
});

Cypress.Commands.add("checkModalIsOpen", () => {
	cy.get("#modal > *:first-child").as("modal-child");
	cy.get("@modal-child").should("exist");
	cy.get("@modal-child")
		.should("have.css", "position", "absolute")
		.should("have.css", "z-index", "101");
	cy.get("#modal-overlay > *:first-child").as("overlay-child");
	cy.get("@overlay-child").should("exist");
	cy.get("@overlay-child")
		.should("have.css", "position", "absolute")
		.should("have.css", "z-index", "100");
});

Cypress.Commands.add("checkModalIsClosed", () => {
	cy.get("#modal > *").should("not.exist");
	cy.get("#modal-overlay > *").should("not.exist");
});

declare namespace Cypress {
	interface Chainable {
		getCount(ingredientId: string): Chainable<number>;
		doesNotHaveCount(ingredientId: string): Chainable<void>;
		drag(ingredientId: string): Cypress.Chainable<JQuery<HTMLElement>>;
		checkModalIsOpen(): Chainable<void>;
		checkModalIsClosed(): Chainable<void>;
	}
}
