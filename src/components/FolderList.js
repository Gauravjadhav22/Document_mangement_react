import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFolders } from '../features/folder/folderSlice';
import UploadDocument from './UploadDocument';
import FolderLogo from "../assets/folder.png"

const FolderList = ({ onSelectFolder }) => {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folder.folders);
  const folderStatus = useSelector((state) => state.folder.status);

  useEffect(() => {
    if (folderStatus === 'idle') {
      dispatch(fetchFolders());
    }
  }, [folderStatus, dispatch]);

  return (
    <div>
      <h2 className="text-xl text-amber-800">Folders</h2>
      <ul className="flex flex-wrap gap-4">
        {folders?.map((folder) => (
          <li key={folder.id} onClick={() => onSelectFolder(folder.id,folder?.name)} className="flex flex-col items-start justify-center">
            <img src={FolderLogo} className="h-24"/>
            <span>
            {folder.name}

            </span>
          </li>
        ))}
      </ul>
      <UploadDocument onUpload={()=>{}}/>
    </div>
  );
};

export default FolderList;
