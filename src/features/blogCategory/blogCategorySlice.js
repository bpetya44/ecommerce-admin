import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

export const getBlogCategories = createAsyncThunk(
  "blog/get-categories",
  async (thunkAPI) => {
    try {
      const response = await blogCategoryService.getBlogCategories();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//create blog category
export const createBlogCategory = createAsyncThunk(
  "blog/create-category",
  async (data, thunkAPI) => {
    try {
      const response = await blogCategoryService.createBlogCategory(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetState = createAction("blog/reset-state");

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

    //create blog category
    builder.addCase(createBlogCategory.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(createBlogCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.createdBlogCategory = action.payload;
    });
    builder.addCase(createBlogCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(resetState, (state) => initialState);
  },
});

export default blogCategorySlice.reducer;
