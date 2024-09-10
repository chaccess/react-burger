import {
  constructorIngredients,
  addIngredient,
  changeOrder,
  clear,
  removeIngredient,
  setBun,
  ConstructorIngredientsState,
  initialState,
} from "./constructor-ingredients";
import {
  ingredient1WithUniqId,
  bun,
  ingredient2WithUniqId,
  ingredient3WithUniqId,
} from "../../constants";
const reducer = constructorIngredients.reducer;

const initialStateWithOneIngredient: ConstructorIngredientsState = {
  ...initialState,
  ingredients: [ingredient1WithUniqId],
};

//#region Tests
describe("Constructor-ingredients reducer tests", () => {
  it("Test of initial of state", () => {
    //act
    const state = reducer(undefined, { type: "" });
    //assert
    expect(state).toStrictEqual(initialState);
  });

  it("setBun: if we add a bun, it should be added to the bun property", () => {
    //act
    const state = reducer(initialState, setBun(bun));
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      bun: bun,
    });
  });

  it("addIngredient: if we add an ingredient to the empty list, it should be added to the ingredients property", () => {
    //act
    const state = reducer(initialState, addIngredient(ingredient1WithUniqId));
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      ingredients: [ingredient1WithUniqId],
    });
  });

  it("addIngredient: if we add the second ingredient, it should be the last ingredient in the ingredients property", () => {
    //act
    const state = reducer(
      initialStateWithOneIngredient,
      addIngredient(ingredient2WithUniqId)
    );
    //assert
    expect(state).toStrictEqual({
      ...initialStateWithOneIngredient,
      ingredients: [ingredient1WithUniqId, ingredient2WithUniqId],
    });
  });

  it("removeIngredient: if we delete the ingredient, it should be deleted from the ingredients property", () => {
    //arrange
    const initialStateWithTwoIngredients: ConstructorIngredientsState = {
      ...initialState,
      ingredients: [ingredient1WithUniqId, ingredient2WithUniqId],
    };
    //act
    const state = reducer(
      initialStateWithTwoIngredients,
      removeIngredient(ingredient2WithUniqId.uniqId)
    );
    //assert
    expect(state).toStrictEqual({
      ...initialStateWithTwoIngredients,
      ingredients: [ingredient1WithUniqId],
    });
  });

  it("changeOrder: if we move the ingredient from the last place to the first place, it should be the first in the ingredients property", () => {
    //arrange
    const initialStateWithThreeIngredients: ConstructorIngredientsState = {
      ...initialState,
      ingredients: [
        ingredient1WithUniqId,
        ingredient2WithUniqId,
        ingredient3WithUniqId,
      ],
    };
    //act
    const state = reducer(
      initialStateWithThreeIngredients,
      changeOrder({ fromIndex: 2, toIndex: 0 })
    );
    //assert
    expect(state).toStrictEqual({
      ...initialStateWithThreeIngredients,
      ingredients: [
        ingredient3WithUniqId,
        ingredient1WithUniqId,
        ingredient2WithUniqId,
      ],
    });
  });

  it("clear: it should return initialState always", () => {
    //act
    const state = reducer(initialStateWithOneIngredient, clear());
    //assert
    expect(state).toStrictEqual({
      ...initialStateWithOneIngredient,
      ingredients: [],
    });
  });
});
//#endregion
