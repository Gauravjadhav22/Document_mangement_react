import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFolders } from '../features/folder/folderSlice';

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
      <h2>Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id} onClick={() => onSelectFolder(folder.id)}>
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
