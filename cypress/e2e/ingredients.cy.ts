/// <reference types="cypress" />
import {
	baseUrl,
	user,
	ingredients,
	accessToken,
	orders,
} from "../../src/config";

describe("React-Burger tests", () => {
	const bunTop = '[data-cy="bun-top"]';
	const bunBottom = '[data-cy="bun-bottom"]';
	const orderButton = "[data-cy='order']";
	const ingredientItem = '[data-cy="constructor"] [data-cy="constructor-item"]';
	const closeModal = "[data-cy='close-modal']";
	const craterBun = "Краторная булка N-200i";
	const fluorescentBun = "Флюоресцентная булка R2-D3";
	const biocotlet = "Биокотлета из марсианской Магнолии";
	const spicyX = "Соус Spicy-X";

	const craterBunId = "643d69a5c3f7b9001cfa093c";
	const fluorescentBunId = "643d69a5c3f7b9001cfa093d";
	const biocotletId = "643d69a5c3f7b9001cfa0941";
	const spicyXId = "643d69a5c3f7b9001cfa0942";

	beforeEach(() => {
		Cypress.config();
		cy.intercept("GET", `${baseUrl}${ingredients}`, {
			fixture: "ingredients",
		});
		cy.intercept("GET", `${baseUrl}${user}`, {
			fixture: "user",
		});
		cy.intercept("POST", `${baseUrl}${orders}`, {
			fixture: "order",
		});
		cy.visit("");
	});

	it("Dragging to constructor", () => {
		//cy.drag кастомная команда
		cy.drag(craterBunId);

		cy.get(bunTop).should("contains.text", `${craterBun} (верх)`);
		cy.get(bunBottom).should("contains.text", `${craterBun} (низ)`);
		//cy.getCount - кастомная команда
		cy.getCount(craterBunId).should("eq", 2);
		cy.drag(fluorescentBunId);
		cy.get(bunTop).should("contains.text", `${fluorescentBun} (верх)`);
		cy.get(bunBottom).should("contains.text", `${fluorescentBun} (низ)`);
		cy.getCount(fluorescentBunId).should("eq", 2);
		cy.doesNotHaveCount(craterBunId);
		cy.drag(biocotletId);
		cy.get(`${ingredientItem}:first-child`).should("contains.text", biocotlet);
		cy.getCount(biocotletId).should("eq", 1);
		cy.drag(spicyXId);
		cy.get(`${ingredientItem}:last-child`).should("contains.text", spicyX);
		cy.getCount(spicyXId).should("eq", 1);
		cy.drag(biocotletId).as("dragBiocotlet");
		cy.getCount(biocotletId).should("eq", 2);
		cy.drag(biocotletId);
		cy.getCount(biocotletId).should("eq", 3);
	});

	it("Open/Close modal of ingredient", () => {
		cy.checkModalIsClosed();
		cy.get(`[data-cy="card_${fluorescentBunId}"]`).click();

		cy.checkModalIsOpen();
		cy.reload();
		cy.checkModalIsOpen(); //проверяем, что модалка остаётся

		cy.get(closeModal).click();
		cy.checkModalIsClosed();
	});

	it("Check data in modal of ingredient", () => {
		cy.get(`[data-cy="ingredient_${fluorescentBunId}"]`).should(
			"have.text",
			fluorescentBun,
		);
		cy.get(`[data-cy="card_${fluorescentBunId}"]`).click();
		cy.get('[data-cy="calories"]').should("have.text", "643");
		cy.get('[data-cy="proteins"]').should("have.text", "44");
		cy.get('[data-cy="fat"]').should("have.text", "26");
		cy.get('[data-cy="carbohydrates"]').should("have.text", "85");
		cy.get('[data-cy="ingredient_name"]').should("have.text", fluorescentBun);
	});

	it("Make order", () => {
		localStorage.setItem(accessToken, "Bearer test");
		cy.reload();
		cy.checkModalIsClosed();

		cy.get(orderButton).should("be.disabled");
		cy.drag(craterBunId);
		cy.drag(biocotletId);
		cy.drag(spicyXId);
		cy.get(orderButton).should("not.be.disabled");
		cy.get(orderButton).click();

		cy.checkModalIsOpen();
		cy.get("[data-cy='order-number']").should("have.text", 45815);
		cy.get(closeModal).click();
		cy.checkModalIsClosed();
		cy.get(ingredientItem).should("not.exist");
		cy.get(bunTop).should("not.exist");
		cy.get(bunBottom).should("not.exist");
	});
});
