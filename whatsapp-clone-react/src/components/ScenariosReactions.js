import {React, useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import AdminSideBar from './AdminSideBar';
import "../css/AdminScenarioManagement.css"
import "./ScenarioDetails"
import {
    GridRowModes,
    GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import ScenarioDetails from "./ScenarioDetails";
import AddScenario from './AddScenario';
import Box from '@mui/material/Box';


export default function ScenariosReactions() {
    const [scenario, setScenarios] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [selectedSenario, setSelectedScenario] = useState(null)
    const [add , setAdd] = useState(false);

    const getScenarios = () => {
        fetch("http://localhost:3000/scenario-reactions")
            .then((res) => res.json())
            .then((response) => {
                console.log(response.data)
                let array = [];
                response.data.forEach((element)=>{
                    array.push(element.scenario)
                })
                setScenarios(array)
            })
    }

    useEffect(() => {
        getScenarios();
        console.log(scenario)
    }, []);

    const columns = [
        {field: "_id", headerName: "Scenario id", width: 300,
            renderCell: (params) => {
                let scenario = params.row;
                return (<NavLink to={`/scenarioReactions/${scenario._id}`} key={scenario._id}>{scenario._id}</NavLink>)
            }},
        {field: "numberOfUsers", headerName: "Num Of Users", width: 120, editable: true, type: 'number'},
        {field: "commentType", headerName: "commentType", width: 150, editable: true, type: 'text'},
        // { field: "CreationDate", headerName: "Creation Date", width: 120 , editable: true , type:'number'},//TODO CHENA waiting for Peleg
        {field: "severity", headerName: "Severity", width: 120, editable: true, type: 'string'}
    ];

    return (
        <div className="background">
            <h2 id="scenarioTitle">Scenario Management</h2>
            <div className='element' style={{width:"750px"}}>
                <div className="tableScenario" >
                    <div className='titleDiv'>
                        <p></p>
                        <h2 id="scenarioMiniTitle">all scenarios</h2>
                    </div>
                    <Box sx={{ height: '90%', width: '100%'}}>
                        <DataGrid
                            editMode="row"
                            rows={scenario}
                            getRowId={(row) => row._id}
                            columns={columns}
                            experimentalFeatures={{newEditingApi: true}}
                            getRowHeight={() => 'auto'}
                            getCellClassName={(params) => {
                                if (params.field !== 'severity') {
                                    return '';
                                }
                                return params.value == "bad" ? 'bad' : 'good';
                            }}
                        />
                    </Box>
                </div>
            </div>
            {selectedSenario ? <ScenarioDetails scenario={selectedSenario} setSelectedScenario={setSelectedScenario}/> : <></>}
            {add ? <AddScenario/> : <></>}
            <AdminSideBar/>
        </div>
    );
}