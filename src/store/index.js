import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import folderReducer from '../features/folder/folderSlice';
import documentReducer from '../features/document/documentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    folder: folderReducer,
    document: documentReducer,
  },
});

export default store;
