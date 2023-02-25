import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {React, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {GridActionsCellItem, GridRowModes} from "@mui/x-data-grid-pro";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import "../css/ScenarioDetails.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddMessage from './AddMessage';


function ScenarioDetails(props){
    // console.log(props.scenario)
    const [data,setData] = useState([])
    const [add , setAdd] = useState(false);

    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id) => async () => {
        console.log(id)
        props.scenario.messages.splice(id,1);
        console.log(props.scenario)
        call(props.scenario)
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        // const editedRow = scenario.find((row) => row.scenarioId === id);
        // if (editedRow.isNew) {
        //     setScenarios(scenario.filter((row) => row.scenarioId !== id));
        // }
    };

    const call = async (scenario) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scenario)
        }
        try {
            let result = await fetch(`http://localhost:3000/scenarios/${scenario._id}`, options);
            result.json().then((res) => {
                console.log(res)
            })
        } catch {
            alert("Can't update scenario")
        }
    }

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow, isNew: false};
        console.log(updatedRow);
        //call(updatedRow);
        props.scenario.messages[updatedRow.key] = updatedRow
        call(props.scenario)
        return updatedRow;
    };

    function changeOffset(value){
        if(value >=60){
            if(String(value%60).length == 1){
                return Math.floor(value/60) + ":0" + value%60
            }
            else return Math.floor(value/60) + ":" + value%60
        } else if(String(value).length == 1){
            return "0:0" + value
        }
        else {
            return "0:" + value
        }
    }

    const columns = [
        {field: "nickname", headerName: "User", width:200, editable: true, type: 'string'},
        {field: "text", headerName: "Message", width: 200, editable: true, type: 'string'},
        // { field: "CreationDate", headerName: "Creation Date", width: 200 , editable: true , type:'number'},//TODO CHENA waiting for
        {field: "milliseconds_offset", headerName: "Offset", width: 100, editable: true, type: 'string' ,  valueGetter: ({ value }) => changeOffset(value)},
        {
            field: 'actions',
            type: 'actions',
            headerName: <AddCircleOutlineIcon onClick={()=>setAdd(true)}/>,
            width: 200,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <div style={{textAlign:"center"}}>
                            <GridActionsCellItem
                                icon={<SaveIcon/>}
                                label="Save"
                                onClick={handleSaveClick(id)}
                            />
                            <p style={{marginBotton:"0px"}}>save</p>
                        </div> ,
                        <div style={{textAlign:"center"}}>
                            <GridActionsCellItem
                                icon={<CancelIcon/>}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="inherit"
                            />
                            <p style={{marginBotton:"0px"}}>cancel</p>
                        </div>
                    ];
                }

                return [
                    <div style={{textAlign:"center"}}>
                        <GridActionsCellItem
                            icon={<DeleteIcon/>}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />
                        {/* <p style={{marginBotton:"0px"}}>delete</p>  */}
                    </div>  ,
                    <div style={{textAlign:"center"}}>
                        <GridActionsCellItem
                            icon={<EditIcon/>}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />
                        {/* <p style={{marginBotton:"0px"}}>edit</p>  */}
                    </div>
                ];
            },
        }
    ];

    useEffect(()=>{
        let array = []
        let sorted = props.scenario.messages.sort((a,b)=>a.milliseconds_offset - b.milliseconds_offset)
        for (let i=0;i<sorted.length;i++){
            let message = sorted[i]
            array.push({
                nickname: message.nickname,
                text: message.text,
                milliseconds_offset:message.milliseconds_offset,
                key: i
            })
        }
        console.log(array)
        setData(array)
    },[])

    function close(e){
        if(e.target.className == "popup"){
            props.setSelectedScenario(null);
        }
    }

    return(
        <div>
            <div className="popup" onClick={(e)=>close(e)}>
                <div className='element2'>
                    <div className="table1">
                        <DataGrid
                            editMode="row"
                            rows={data}
                            getRowId={(row) => row.key}
                            columns={columns}
                            rowModesModel={rowModesModel}
                            onRowEditStart={handleRowEditStart}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            experimentalFeatures={{newEditingApi: true}}
                        />
                    </div>
                </div>
                {add ? <AddMessage scenario={props.scenario} setData={setData}/> : <></>}
            </div>
        </div>
    );
}
export default ScenarioDetails;