import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments } from "../features/document/documentSlice";
import fileLogo from "../assets/document.png";
import Loading from "../assets/loading.png";
import deleteLogo from "../assets/remove.png";
import axios from "../config/axios/axiosInstance";
const FolderDetails = ({ folderId, folderNameValue }) => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.document.documents);
  const status = useSelector((state) => state.document.status);
  const error = useSelector((state) => state.document.error);

  useEffect(() => {
    if (folderId) {
      dispatch(fetchDocuments(folderId));
    }
  }, [folderId, dispatch]);

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
      const response = await axios.delete("documents/"+id); // Replace with your endpoint
      dispatch(fetchDocuments(folderId))
     alert("Document deleted successfully:");
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
        <li
          key={doc?.id}
          className="flex flex-col items-center gap-2 shadow rounded-sm"
        >
          <img
            src={deleteLogo}
            className="h-8"
            onClick={() => handleDelete(doc?.id)}
          />
          <a
            href="#"
            onClick={() => handleDownload(doc?.id, doc?.name)}
            className="pointer"
          >
            <img src={fileLogo} className="h-12" alt="File" />
            {doc?.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FolderDetails;
