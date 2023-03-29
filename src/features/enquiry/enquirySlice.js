import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      const response = await enquiryService.getEnquiries();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      const response = await enquiryService.deleteEnquiry(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getEnquiryById = createAsyncThunk(
  "enquiry/get-enquiry",
  async (id, thunkAPI) => {
    try {
      const response = await enquiryService.getEnquiryById(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (enquiry, thunkAPI) => {
    try {
      const response = await enquiryService.updateEnquiry(enquiry);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetState = createAction("enquiry/reset-state");

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEnquiries.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getEnquiries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.enquiries = action.payload;
    });
    builder.addCase(getEnquiries.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // Delete Enquiry
    builder.addCase(deleteEnquiry.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(deleteEnquiry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
    });
    builder.addCase(deleteEnquiry.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // Get Enquiry By Id
    builder.addCase(getEnquiryById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getEnquiryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.enquiryName = action.payload.name;
      state.enquiryEmail = action.payload.email;
      state.enquiryMobile = action.payload.mobile;
      state.enquiryComment = action.payload.comment;
      state.enquiryStatus = action.payload.status;
    });
    builder.addCase(getEnquiryById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // Update Enquiry
    builder.addCase(updateEnquiry.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(updateEnquiry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
      state.updatedEnquiry = action.payload;
    });
    builder.addCase(updateEnquiry.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.error;
    });

    // Reset State
    builder.addCase(resetState, (state) => initialState);
  },
});

export default enquirySlice.reducer;
