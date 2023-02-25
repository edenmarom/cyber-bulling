import {React, useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AdminSideBar from './AdminSideBar';
import "../css/AdminScenarioManagement.css"
import "./ScenarioDetails"
import {
    GridRowModes,
    GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import ScenarioDetails from "./ScenarioDetails";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddScenario from './AddScenario';
import Box from '@mui/material/Box';


export default function AdminScenarioManagement() {
    const [scenario, setScenarios] = useState([]);
    const [selectedSenario, setSelectedScenario] = useState(null)
    const [add , setAdd] = useState(false);

    const getScenarios = () => {
        fetch("http://localhost:3000/scenarios")
            .then((res) => res.json())
            .then((response) => setScenarios(response.data))
    }

    useEffect(() => {
        getScenarios();
        console.log(scenario)
    }, []);

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
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            let result = await fetch(`http://localhost:3000/scenarios/${id}`, options);
            await result.json().then(() => {
                getScenarios();//TODO CHENA - check its refresh
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

        const editedRow = scenario.find((row) => row.scenarioId === id);
        if (editedRow.isNew) {
            setScenarios(scenario.filter((row) => row.scenarioId !== id));
        }
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
        scenario.forEach((scenario) => {
            if (scenario._id === newRow._id) {
                call(updatedRow);
                console.log(scenario);
            }
        })
        return updatedRow;
    };

    const columns = [
        {field: "_id", headerName: "Scenario id", width: 300,},
        {field: "numberOfUsers", headerName: "Num Of Users", width: 120, editable: true, type: 'number'},
        {field: "commentType", headerName: "commentType", width: 150, editable: true, type: 'text'},
        // { field: "CreationDate", headerName: "Creation Date", width: 120 , editable: true , type:'number'},//TODO CHENA waiting for Peleg
        {field: "severity", headerName: "Severity", width: 120, editable: true, type: 'string'},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
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
                        <p style={{marginBotton:"0px"}}>delete</p>
                    </div>  ,
                    <div style={{textAlign:"center"}}>
                        <GridActionsCellItem
                            icon={<EditIcon/>}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />
                        <p style={{marginBotton:"0px"}}>edit</p>
                    </div>
                ];
            },
        },
    ];

    function onScenarioClick(event) {
        if(selectedSenario){
            if(selectedSenario._id === event.row._id) {
                setSelectedScenario(null)
            } else {
                setSelectedScenario(event.row)
            }}else {
            setSelectedScenario(event.row)
        }
        setAdd(false)
    }

    function addScenario(){
        setAdd(true)
    }

    return (
        <div className="background">
            <h2 id="scenarioTitle">Scenario Management</h2>
            <div className='element'>
                <div className="tableScenario" >
                    <div className='titleDiv'>
                        <AddCircleOutlineIcon onClick={addScenario}/>
                        <h2 id="scenarioMiniTitle">all scenarios</h2>
                    </div>
                    <Box sx={{ height: '90%', width: '100%'}}>
                        <DataGrid
                            editMode="row"
                            rows={scenario}
                            getRowId={(row) => row._id}
                            columns={columns}
                            rowModesModel={rowModesModel}
                            onRowEditStart={handleRowEditStart}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            experimentalFeatures={{newEditingApi: true}}
                            onRowClick={onScenarioClick}
                            getRowHeight={() => 'auto'}
                            getCellClassName={(params) => {
                                if (params.field !== 'severity') {
                                    return '';
                                }
                                return params.value === "bad" ? 'bad' : 'good';
                            }}
                        />
                    </Box>
                </div>
            </div>
            {selectedSenario ? <ScenarioDetails scenario={selectedSenario} setSelectedScenario={setSelectedScenario}/> : <></>}
            {add ? <AddScenario setAdd={setAdd}/> : <></>}
            <AdminSideBar/>
        </div>
    );
}