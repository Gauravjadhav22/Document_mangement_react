import React, { useState } from "react";
import axios from "../config/axios";
import AddLogo from "../assets/add.png";
import AddFolder from "../assets/add-folder.png";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [showFolders, setShowFolders] = useState(false);
  const [showCreateFolders, setShowCreateFolder] = useState(false);
  const [folders, setFolders] = useState([]);

  const fetchFolders = async () => {
    try {
      const response = await axios.get("folders");
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle folder selection
  const handleFolderSelection = (folderId) => {
    setSelectedFolderId(folderId);
    setShowFolders(false); // Hide folder list after selection
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile || !selectedFolderId) {
      alert("Please select a file and a folder");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folderId", selectedFolderId);

    try {
      const response = await axios.post("documents", formData); // Replace with your endpoint
      console.log("File uploaded successfully:", response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setShowFolders(false);
      setSelectedFile(null);
      setSelectedFolderId(null);
    }
  };

  const createFolder = async () => {
    try {
      const response = await axios.post("folders", { name: folderName }); // Replace with your endpoint
      console.log("Folder created successfully:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setShowFolders(false);
      setShowCreateFolder(false);
      setSelectedFile(null);
      setFolderName(null);
      setSelectedFolderId(null);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <img
        src={AddLogo}
        alt="Upload"
        style={{ cursor: "pointer" }}
        className="h-32 absolute top-1/2 right-10"
        onClick={() => {
          fetchFolders();
          setShowFolders(true);
        }}
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <img
        src={AddFolder}
        alt="Add Folder"
        style={{ cursor: "pointer" }}
        className="h-32 absolute mt-36 top-1/2 right-10"
        onClick={() => {
          fetchFolders();
          setShowCreateFolder(true);
        }}
      />
      {showCreateFolders && (
        <div className="flex flex-col items-center justify-center absolute h-72 p-8 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Enter folder name"
            className="text-center"
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            className="rounded-md mt-4 bg-green-500 px-2.5 p-1.5 text-white"
            onClick={() => createFolder()}
          >
            Create
          </button>
          <button
            className="rounded-md mt-4 bg-red-500 px-2.5 p-1.5 text-white"
            onClick={() => setShowCreateFolder(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {showFolders && (
        <>
          <ul className="flex flex-col items-center justify-center absolute h-72 gap-1 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
            <span className="mb-4 text-blue-500 text-xl">Select Folder To Upload File</span>
            {folders.map((folder) => (
              <li
                key={folder.id}
                onClick={() => handleFolderSelection(folder.id)}
                className="p-1 cursor-pointer hover:bg-gray-200 bg-gray-100 text-center w-72"
              >
                {folder.name}
              </li>
            ))}
          </ul>
          <button
            className="rounded-md mt-4 bg-red-500 px-2.5 p-1.5 text-white"
            onClick={() => setShowFolders(false)}
          >
            Cancel
          </button>
        </>
      )}
      {selectedFolderId && (
        <div className="flex flex-col items-center justify-center absolute h-72 w-72 gap-1 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Select File
        </button>
        {selectedFile && (
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Upload
        </button>
      )}</div>
      )}
    </div>
  );
};

export default FileUpload;
