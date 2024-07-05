import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients as getIngredientsApi } from "../api/ingredients";
import { convert } from "../../utils/common";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    try {
      const response = await getIngredientsApi();
      return response.data.map(convert);
    } catch (e) {
      //Так как эта функция объявлена как async её возвращаемый результат будет типа Promise.
      //Выбрасывание здесь ошибки зареджектит этот промис
      throw new Error(`Ошибка ${e}`);
    }
  }
);
