import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/axiosInstance";
import { getValuesLocalStorage, setValuesLocalStorage } from "../../utils/localStorageFunctions";
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../../constants";

const initialState = {
  user:  getValuesLocalStorage(LOCAL_STORAGE_USER)||null,
  token: getValuesLocalStorage(LOCAL_STORAGE_TOKEN)||null,
  status: "idle",
  users:[],
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await axios.post(`auth/login`, credentials);
    setValuesLocalStorage(LOCAL_STORAGE_TOKEN, response?.data?.token);
    setValuesLocalStorage(LOCAL_STORAGE_USER, response?.data?.data?.email);
    return response.data;
  }
);
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (credentials) => {
    const response = await axios.get(`auth/users`);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(`auth/register`, userData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(LOCAL_STORAGE_TOKEN)
      localStorage.removeItem(LOCAL_STORAGE_USER)
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload?.data?.email;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        console.log(action.payload,"payload");
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout, setAuthToken } = authSlice.actions;

export default authSlice.reducer;
