import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/axiosInstance"; // Ensure axios is correctly configured

const initialState = {
  folders: [],
  status: "idle",
  error: null,
};

export const fetchFolders = createAsyncThunk(
  "folder/fetchFolders",
  async () => {
    const response = await axios.get(`folders`);
    return response.data;
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default folderSlice.reducer;
