import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

export const getBlogCategories = createAsyncThunk(
  "blog/get-categories",
  async (thunkAPI) => {
    try {
      const response = await blogCategoryService.getCategories();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogCategories.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getBlogCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.categories = action.payload;
    });
    builder.addCase(getBlogCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
  },
});

export default blogCategorySlice.reducer;
