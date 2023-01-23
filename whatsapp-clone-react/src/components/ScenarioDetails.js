import Table from 'rc-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {React, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {GridActionsCellItem, GridRowModes} from "@mui/x-data-grid-pro";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import "../css/ScenarioDetails.css"

function ScenarioDetails(props){
    console.log(props.scenario)
const [data,setData] = useState([])

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
        console.log(id);
        // let scenario = scenario.find((row) => row._id === id)
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            let result = await fetch(`http://localhost:3000/scenarios/${id}`, options);
            await result.json().then(() => {
            })
        } catch {
            alert("Can't delete scenario")
        }
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
                alert(res)
            })
        } catch {
            alert("Can't update scenario")
        }
    }

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow, isNew: false};
        console.log(updatedRow);
        // scenario.forEach((scenario) => {
            // if (scenario._id === newRow._id) {
            //     call(updatedRow);
            //     console.log(scenario);
            // }
        // })
        return updatedRow;
    };

    const columns = [
        {field: "nickname", headerName: "User", width:200, editable: true, type: 'string'},
        {field: "text", headerName: "Message", width: 200, editable: true, type: 'string'},
        // { field: "CreationDate", headerName: "Creation Date", width: 200 , editable: true , type:'number'},//TODO CHENA waiting for
        {field: "milliseconds_offset", headerName: "Offset", width: 200, editable: true, type: 'string'},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    useEffect(()=>{
        let array = []
        for (let i=0;i<props.scenario.messages.length;i++){
            let message = props.scenario.messages[i]
            console.log(message)
            array.push({
                nickname: message.nickname,
                text: message.text,
                milliseconds_offset:message.milliseconds_offset,
                key: i
            })
        }
        setData(array)
    },[])
    // const data = [
    //     { name: '', Message: 28, Offset: 'some where', key: '1' },
    //     { name: 'Rose', age: 36, address: 'some where', key: '2' },
    // ];
    return(
        <div className="popup">
            <div className="table">
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
    );
}
export default ScenarioDetails;