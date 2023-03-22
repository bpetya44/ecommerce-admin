import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {
  try {
    const response = await blogService.getBlogs();
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async (data, thunkAPI) => {
    try {
      const response = await blogService.createBlog(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetState = createAction("Reset_State");

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.blogs = action.payload;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    //create blog
    builder.addCase(createBlog.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.createdBlog = action.payload;
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
