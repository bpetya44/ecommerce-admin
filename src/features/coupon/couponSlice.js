import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "../../features/coupon/couponService";

export const getCoupons = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPI) => {
    try {
      const response = await couponService.getCoupons();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/create-coupon",
  async (data, thunkAPI) => {
    try {
      const response = await couponService.createCoupon(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getCouponById = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPI) => {
    //console.log(id);
    try {
      const response = await couponService.getCouponById(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (data, thunkAPI) => {
    try {
      const response = await couponService.updateCoupon(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPI) => {
    try {
      const response = await couponService.deleteCoupon(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetState = createAction("coupon/reset-state");

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.coupons = action.payload;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // create coupon
    builder.addCase(createCoupon.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(createCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.createdCoupon = action.payload;
    });
    builder.addCase(createCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // get coupon by id
    builder.addCase(getCouponById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getCouponById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.couponName = action.payload.name;
      state.couponExpiry = action.payload.expiry;
      state.couponDiscount = action.payload.discount;
    });
    builder.addCase(getCouponById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // update coupon
    builder.addCase(updateCoupon.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.updatedCoupon = action.payload;
    });
    builder.addCase(updateCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // delete coupon
    builder.addCase(deleteCoupon.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.deletedCoupon = action.payload;
    });
    builder.addCase(deleteCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    builder.addCase(resetState, (state) => initialState);
  },
});

export default couponSlice.reducer;
