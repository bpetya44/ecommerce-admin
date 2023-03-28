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

//get blog category by id
export const getBlogCategoryById = createAsyncThunk(
  "blog/get-blog-category",
  async (id, thunkAPI) => {
    //console.log(id);
    try {
      const response = await blogCategoryService.getBlogCategoryById(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//update blog category
export const updateBlogCategory = createAsyncThunk(
  "blog/update-blog-category",
  async (data, thunkAPI) => {
    try {
      const response = await blogCategoryService.updateBlogCategory(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//delete blog category
export const deleteBlogCategory = createAsyncThunk(
  "blog/delete-blog-category",
  async (id, thunkAPI) => {
    try {
      const response = await blogCategoryService.deleteBlogCategory(id);
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

    //get blog category by id
    builder.addCase(getBlogCategoryById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getBlogCategoryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.blogCategoryName = action.payload.title;
    });
    builder.addCase(getBlogCategoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    //update blog category
    builder.addCase(updateBlogCategory.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(updateBlogCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.updatedBlogCategory = action.payload;
    });
    builder.addCase(updateBlogCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    //delete blog category
    builder.addCase(deleteBlogCategory.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(deleteBlogCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.deletedBlogCategory = action.payload;
    });
    builder.addCase(deleteBlogCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    builder.addCase(resetState, (state) => initialState);
  },
});

export default blogCategorySlice.reducer;
