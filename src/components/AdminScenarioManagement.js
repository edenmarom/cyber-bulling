import { React, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
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
import { useNavigate, Link } from "react-router-dom";
import { serverAddr } from "../utils/http-communication";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function AdminScenarioManagement() {
    const [scenario, setScenarios] = useState([]);
    const [selectedSenario, setSelectedScenario] = useState(null)
    const [add, setAdd] = useState(false);
    const navigate = useNavigate();

    const getScenarios = () => {
        fetch(serverAddr + "/scenarios")
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
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            let result = await fetch(serverAddr + `/scenarios/${id}`, options);
            await result.json().then(() => {
                getScenarios();
            })
        } catch {
            alert("Can't delete scenario")
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = scenario.find((row) => row._id === id);
        if (editedRow.isNew) {
            setScenarios(scenario.filter((row) => row._id !== id));
        }
    };

    const handleDuplicate = (id) => async () => {
        let chosenScenario = null
        scenario.forEach((scenario1) => {
            if (scenario1._id === id) {
                console.log(scenario1);
                chosenScenario = scenario1
            }
        })
        if (chosenScenario) {
            delete chosenScenario._id
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chosenScenario)
            }
            try {
                let result = await fetch(serverAddr + '/scenarios', options);
                await result.json().then((res) => {
                    console.log(res)
                    getScenarios();
                })
            }
            catch {
                alert("Can't insert to scenarios")
            }

        }
    }

    const call = async (scenario) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scenario)
        }
        try {
            let result = await fetch(serverAddr + `/scenarios/${scenario._id}`, options);
            result.json().then((res) => {
                console.log(res)
            })
        } catch {
            alert("Can't update scenario")
        }
    }

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        if (updatedRow.commentType !== "against" && updatedRow.commentType !== "noComment" && updatedRow.commentType !== "pro") {
            alert("commentType need to be against or noComment or pro");
            setRowModesModel({
                ...rowModesModel,
                [updatedRow._id]: { mode: GridRowModes.View, ignoreModifications: true },
            });
            return;
        }
        if (updatedRow.severity !== "bad" && updatedRow.severity !== "good") {
            alert("severity need to be bad or good");
            setRowModesModel({
                ...rowModesModel,
                [updatedRow._id]: { mode: GridRowModes.View, ignoreModifications: true },
            });
            return;
        }
        scenario.forEach((scenario) => {
            if (scenario._id === newRow._id) {
                call(updatedRow);
                console.log(scenario);
            }
        })
        return updatedRow;
    };

    const columns = [
        { field: "_id", headerName: "Scenario id", width: 300, },
        { field: "numberOfUsers", headerName: "Num Of Users", width: 120, editable: true, type: 'number' },
        { field: "commentType", headerName: "commentType", width: 150, editable: true, type: 'text' },
        // { field: "CreationDate", headerName: "Creation Date", width: 120 , editable: true , type:'number'},//TODO CHENA waiting for Peleg
        { field: "severity", headerName: "Severity", width: 130, editable: true, type: 'string' },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 220,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <div style={{ textAlign: "center" }}>
                            <GridActionsCellItem
                                icon={<SaveIcon />}
                                label="Save"
                                onClick={handleSaveClick(id)}
                            />
                            <p style={{ marginBotton: "0px" }}>save</p>
                        </div>,
                        <div style={{ textAlign: "center" }}>
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="inherit"
                            />
                            <p style={{ marginBotton: "0px" }}>cancel</p>
                        </div>
                    ];
                }

                return [
                    <div style={{ textAlign: "center" }}>
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />
                        <p style={{ marginBotton: "0px" }}>delete</p>
                    </div>,
                    <div style={{ textAlign: "center" }}>
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />
                        <p style={{ marginBotton: "0px" }}>edit</p>
                    </div>,
                    <div style={{ textAlign: "center" }}>
                        <GridActionsCellItem
                            icon={<ContentCopyIcon />}
                            label="duplicate"
                            onClick={handleDuplicate(id)}
                            color="inherit"
                        />
                        <p style={{ marginBotton: "0px" }}>duplicate</p>
                    </div>
                ];
            },
        },
    ];

    function onScenarioClick(event) {
        if (selectedSenario) {
            if (selectedSenario._id === event.row._id) {
                setSelectedScenario(null)
            } else {
                setSelectedScenario(event.row)
            }
        } else {
            setSelectedScenario(event.row)
        }
        setAdd(false)
    }

    function addScenario() {
        setAdd(true)
    }

    const logout = () => {
        navigate(-2);
    };

    return (
        <div className="background">
            <button className="button-81" onClick={logout}>
                Logout
            </button>
            <h2 id="scenarioTitle">Scenario Management</h2>
            <div className="element">
                <div className="tableScenario">
                    <div className="titleDiv">
                        <AddCircleOutlineIcon onClick={addScenario} />
                        <h2 id="scenarioMiniTitle">All scenarios</h2>
                    </div>
                    <Box sx={{ height: "90%", width: "100%" }}>
                        <DataGrid
                            editMode="row"
                            rows={scenario}
                            getRowId={(row) => row._id}
                            columns={columns}
                            rowModesModel={rowModesModel}
                            onRowEditStart={handleRowEditStart}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            experimentalFeatures={{ newEditingApi: true }}
                            onRowClick={onScenarioClick}
                            getRowHeight={() => "auto"}
                            getCellClassName={(params) => {
                                if (params.field !== "severity") {
                                    return "";
                                }
                                return params.value === "bad" ? "bad" : "good";
                            }}
                        />
                    </Box>
                </div>
            </div>
            {selectedSenario ? (
                <ScenarioDetails
                    scenario={selectedSenario}
                    setSelectedScenario={setSelectedScenario}
                    getScenarios={getScenarios}
                />
            ) : (
                <></>
            )}
            {add ? (
                <AddScenario
                    setAdd={setAdd}
                    setScenarios={setScenarios}
                    scenario={scenario}
                />
            ) : (
                <></>
            )}
            <AdminSideBar />
        </div>
    );
}