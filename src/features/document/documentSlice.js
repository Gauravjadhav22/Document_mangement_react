import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const initialState = {
  documents: [],
  status: 'idle',
  error: null,
};

export const fetchDocuments = createAsyncThunk(
  'document/fetchDocuments',
  async (folderId) => {
    const response = await axios.get(`folders/${folderId}`);
    return response.data;
  }
);

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.documents = action.payload?.documents;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default documentSlice.reducer;
