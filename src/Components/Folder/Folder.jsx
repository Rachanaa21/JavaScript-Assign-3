import './Folder.css'
const FolderComponent = (props) => {
    return (
        <div className="folderWrapper">
            <span className='toggleBtn'> ▶ </span>
            <span>{props.folderData.name}</span>
            <span>
                <span
                    className="createFolderBtn"
                    onClick={() => props.addFolder(props.store, props.folderData.id)}
                >
                    📁
                </span>
                <span
                    className="createFileBtn"
                    onClick={() => props.addFile(props.store, props.folderData.id)}
                >
                    📄
                </span>
                <span
                    className="deleteBtn"
                    onClick={() =>
                        props.deleteElem(
                            props.store,
                            props.folderData.id,
                            props.folderData.parentNodeId
                        )
                    }
                >
                    🗑️
                </span>
            </span>

        </div>
    );
}

export default FolderComponent;