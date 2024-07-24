import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments } from "../features/document/documentSlice";
import fileLogo from "../assets/document.png";
import shareLogo from "../assets/share.png";
import Loading from "../assets/loading.png";
import deleteLogo from "../assets/remove.png";
import axios from "../config/axios/axiosInstance";
import { getAllUsers } from "../features/auth/authSlice";
const FolderDetails = ({ folderId, folderNameValue }) => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.document.documents);
  const folders = useSelector((state) => state.folder.folders);
  const status = useSelector((state) => state.document.status);
  const users = useSelector((state) => state.auth.users);
  const error = useSelector((state) => state.document.error);
  const [showUsers, setShowUsers] = useState(false);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    if (folderId) {
      dispatch(fetchDocuments(folderId));
    }
  }, [folderId, dispatch]);
  useEffect(() => {
    if (folders[0]?.id) {
      dispatch(fetchDocuments(folderId));
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center absolute">
        <img src={Loading} className="h-56" />
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const handleDownload = async (id, fileName) => {
    try {
      const response = await axios.get(`documents/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      if (error?.response?.status === 403) {
        alert("you dont have access");
      } else {
        alert(error?.message || "Error downloading file");
      }
      console.error("Error downloading file:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("documents/" + id); // Replace with your endpoint
      dispatch(fetchDocuments(folderId));
      alert("Document deleted successfully:");
    } catch (error) {
      console.log(error);
    }
  };
  const handleShare = async ( userEmail) => {
    try {
      const response = await axios.post("documents/" + docId + "/share", {
        email:userEmail ,
        permission: "read",
      }); // Replace with your endpoint
      dispatch(fetchDocuments(folderId));
      alert("Document shared successfully:");
      setShowUsers(false)
      setDocId(null)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className="flex justify-center pr-48 pl-10 gap-10 flex-wrap mt-10 border-2 h-full p-10">
      <div className="flex items-center gap-2">
        <span>Inside Of</span>{" "}
        <span className="bg-blue-800 h-fit w-fit p-0.5 text-white text-xl">
          {folderNameValue}
        </span>
      </div>
      {documents?.map((doc) => (
        <div className="flex items-center flex-col-reverse">
        

      {folderId?.includes("shared")&&    <div className="flex items-center justify-between gap-8">  <img
            src={deleteLogo}
            className="h-10 self-end cursor-pointer"
            onClick={() => handleDelete(doc?.id)}
            alt="delete"
          />
          <img
            src={shareLogo}
            className="h-10 mt-4 self-end cursor-pointer"
            onClick={() => {
              setDocId(doc?.id)
              dispatch(getAllUsers());
              setShowUsers(true);
            }}
            alt="share"
          />
          </div>
          }

          <li
            key={doc?.id}
            className="flex flex-col items-start gap-2 shadow rounded-sm p-2"
          >
            <a
              href="#"
              onClick={() => handleDownload(doc?.id, doc?.name)}
              className="pointer"
            >
              <img src={fileLogo} className="h-12" alt="File" />
              {doc?.name}
            </a>
          </li>
          
        </div>
      ))}
      {showUsers && (
        <div className="h-screen absolute flex justify-center">
          <ul className="flex flex-col items-center justify-start p-2 absolute h-72 gap-1 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
          <button
              className="rounded-md bg-red-500 px-2.5 p-1.5 text-white"
              onClick={() => setShowUsers(false)}
            >
              Cancel
            </button>
          <span className="mb-4 text-blue-500 text-xl">
              Select user to share file
            </span>
         
       
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => handleShare(user?.email)}
                className="p-1 cursor-pointer hover:bg-gray-200 bg-gray-100 text-center w-72"
              >
                {user?.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ul>
  );
};

export default FolderDetails;
