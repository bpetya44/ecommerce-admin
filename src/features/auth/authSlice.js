import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const userDefaultState = {
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  token: null,
};

const initialState = {
  user: userDefaultState,
  isErr: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isErr = false;
      state.message = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isErr = false;
      state.message = action.payload;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isErr = true;
      state.message = action.payload;
    });
  },
});

export default authSlice.reducer;
