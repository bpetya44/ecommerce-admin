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

//get blog by id
export const getBlogById = createAsyncThunk(
  "blog/get-blog",
  async (id, thunkAPI) => {
    //console.log(id);
    try {
      const response = await blogService.getBlogById(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//update blog
export const updateBlog = createAsyncThunk(
  "blog/update-blog",
  async (data, thunkAPI) => {
    try {
      const response = await blogService.updateBlog(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//delete blog
export const deleteBlog = createAsyncThunk(
  "blog/delete-blog",
  async (id, thunkAPI) => {
    try {
      const response = await blogService.deleteBlog(id);
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

    //get blog by id
    builder.addCase(getBlogById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getBlogById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.blogName = action.payload.title;
      state.blogDescription = action.payload.description;
      state.blogCategory = action.payload.category;
      state.blogImages = action.payload.images;
    });
    builder.addCase(getBlogById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    //update blog
    builder.addCase(updateBlog.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.updatedBlog = action.payload;
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    //delete blog
    builder.addCase(deleteBlog.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.deletedBlog = action.payload;
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    builder.addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
