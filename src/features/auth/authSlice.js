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

//get user order
export const getUserOrder = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      const response = await authService.getOrder(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//update order status by id
export const updateOrderStatus = createAsyncThunk(
  "order/update-order",
  async (data, thunkAPI) => {
    try {
      const response = await authService.updateOrder(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

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

//Get Monthly Orders
export const getMonthlyData = createAsyncThunk(
  "order/get-monthly-orders",
  async (thunkAPI) => {
    try {
      const response = await authService.getMonthlyOrders();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//Get Yearly Orders
export const getYearlyData = createAsyncThunk(
  "order/get-year-orders",
  async (thunkAPI) => {
    try {
      const response = await authService.getYearlyOrders();
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
      state.message = action.error;
    });

    // get User order
    builder.addCase(getUserOrder.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.singleOrder = action.payload;
    });
    builder.addCase(getUserOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

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
      state.message = action.error;
    });

    //get Monthly Orders
    builder.addCase(getMonthlyData.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getMonthlyData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.monthlyData = action.payload;
    });
    builder.addCase(getMonthlyData.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    //get Yearly Orders
    builder.addCase(getYearlyData.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getYearlyData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.yearlyData = action.payload;
    });
    builder.addCase(getYearlyData.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    //update Order Status
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.orderStatus = action.payload;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });
  },
});

export default authSlice.reducer;
