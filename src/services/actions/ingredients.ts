import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients as getIngredientsApi } from "../../utils/api/ingredients";
import { convert } from "../../utils/common";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    try {
      const response = await getIngredientsApi();
      return response.data.map(convert);
    } catch (e) {
      throw new Error(`Ошибка ${e}`);
    }
  }
);
