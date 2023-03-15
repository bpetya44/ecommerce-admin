import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//login Admin
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//get user orders
// export const getUserOrders = createAsyncThunk(
//   "order/get-orders",
//   async (userData, thunkAPI) => {
//     try {
//       const response = await authService.getUserOrders(userData);
//       return response;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

//Get All Orders
export const getAllOrders = createAsyncThunk(
  "order/get-all-orders",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.getAllOrders(userData);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
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
      state.isError = false;
      state.message = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });

    // get User orders
    // builder.addCase(getUserOrders.pending, (state) => {
    //   state.isLoading = true;
    //   state.isSuccess = false;
    //   state.isError = false;
    //   state.message = "";
    // });
    // builder.addCase(getUserOrders.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isError = false;
    //   state.message = action.payload;
    //   state.orders = action.payload;
    // });
    // builder.addCase(getUserOrders.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });

    //get All Orders
    builder.addCase(getAllOrders.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.orders = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default authSlice.reducer;
