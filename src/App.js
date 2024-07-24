import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FolderList from "./components/FolderList";
import FolderDetails from "./components/FolderDetails";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { logout, setAuthToken } from "./features/auth/authSlice";
import { getValuesLocalStorage } from "./utils/localStorageFunctions";
import { LOCAL_STORAGE_TOKEN } from "./constants";
import axios from "./config/axios";
import { fetchFolders } from "./features/folder/folderSlice";
const App = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folderName, setFolderName] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(auth);
  const handleSelectFolder = (folderId, name) => {
    setSelectedFolderId(folderId);
    setFolderName(name);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/documents");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = getValuesLocalStorage(LOCAL_STORAGE_TOKEN);
    if (token) {
      dispatch(setAuthToken(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <div className="flex-col md:flex-row items-center justify-between">
          <h1 className="w-full text-center text-2xl text-blue-800 my-4">
            Document Management System
          </h1>

       { auth?.user&&  <div className="italic flex-col md:flex-row">logged in as <span className="bg-green-100 p-1 rounded-md">{auth?.user}</span></div>
         } <div>
            {auth?.token && (
              <button
                className="bg-red-600 p-1 text-white mr-12 rounded-md text-xl"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {auth?.token ? (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FolderList onSelectFolder={handleSelectFolder} />
                  {selectedFolderId && (
                    <FolderDetails
                      folderId={selectedFolderId}
                      folderNameValue={folderName}
                    />
                  )}
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
