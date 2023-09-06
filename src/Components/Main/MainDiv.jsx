import Folder from '../Folder/Folder'
import File from '../File/File'
let uniqueId = -1;
const generateUniqueId = () => {
    uniqueId++;
    return uniqueId;
}

const MainDiv = (props) => {
    const addFolder = (stateStore, id) => {
        let newObj = {
            id: generateUniqueId(),
            parentNodeId: id,
            name: props.name,
            children: [],
            type: "folder",
        };
        stateStore.forEach((elem) => {
            let nameExist = false;
            if (elem.id === id) {
                elem.children.forEach((elem) => {
                    if (elem.name === props.name) {
                        window.alert("Folder Already Exist With Given Name!");
                        nameExist = true;
                    }
                });
                if (props.name === " " || props.name === "") {
                    window.alert("Please Enter Folder Name")
                }
                else if (!nameExist) {
                    elem.children.push(newObj);
                }
                props.setName("");
            }

            else if (elem.children) {
                addFolder(elem.children, id);
            }
        });
    };

    const addFile = (stateStore, id) => {
        let newObj = {
            id: generateUniqueId(),
            parentNodeId: id,
            name: props.name,
            children: null,
            type: "file",
        };
        stateStore.forEach((elem) => {
            let nameExist = false;
            if (elem.id === id) {
                elem.children.forEach((elem) => {
                    if (elem.name === props.name) {
                        window.alert("File Already Exist With Given Name!");
                        nameExist = true;
                    }
                });
                if (props.name === " " || props.name === "") {
                    window.alert("Please Enter File Name")
                }
                else if (!nameExist) {
                    elem.children.push(newObj);
                }
                props.setName("");
            }

            else if (elem.children) {
                addFile(elem.children, id);
            }
        });
    };

    const deleteElem = (stateStore, id, parentNodeId) => {
        if (id === 'id1') {
            window.alert("Root cannot be Deleted!");
        }
        else {
            stateStore.forEach((elem) => {
                if (elem.id === parentNodeId) {
                    let children = elem.children;
                    for (let i = 0; i < children.length; i++) {
                        if (children[i].id === id) {
                            children.splice(i, 1);
                        }
                    }
                    elem.children = children;
                    props.setData([...props.store]);
                }
                if (elem.children !== null) {
                    deleteElem(elem.children, id, parentNodeId);
                }
            });
        }
    };

    return (
        <div>
            {props.data.map((elem) =>
                elem.type === "folder" ? (
                    <div style={{ paddingLeft: "20px" }}>
                        {
                            <Folder folderData={elem} data={props.data} name={props.name} setData={props.setData} addFolder={addFolder} addFile={addFile} store={props.store} deleteElem={deleteElem} />
                        }
                        {elem.children && (
                            <MainDiv data={elem.children} store={props.store} name={props.name} setName={props.setName} setData={props.setData} />
                        )}
                    </div>
                ) : (
                    <div style={{ paddingLeft: "20px" }}>
                        {
                            <File fileData={elem} store={props.store} name={props.name} data={props.data} setData={props.setData} deleteElem={deleteElem} />
                        }
                    </div>
                )
            )}
        </div>
    );
};

export default MainDiv;
