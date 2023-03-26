import {React, useEffect, useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import AdminSideBar from './AdminSideBar';
import "../css/AdminScenarioManagement.css";
import "./ScenarioDetails"
import ScenarioDetails from "./ScenarioDetails";
import AddScenario from './AddScenario';
import Box from '@mui/material/Box';
import {serverAddr} from "../utils/http-communication";


export default function ScenarioReactions() {
    const [scenario, setScenarios] = useState([]);
    const [selectedSenario, setSelectedScenario] = useState(null)
    const [add, setAdd] = useState(false);
    const navigate = useNavigate();


    const getScenarios = () => {
        fetch(serverAddr + "/scenario-reactions")
            .then((res) => res.json())
            .then((response) => {
                console.log(response.data)
                let array = [];
                response.data.forEach((element) => {
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
        {
            field: "_id", headerName: "Scenario id", width: 300,
            renderCell: (params) => {
                let scenario = params.row;
                return (<NavLink to={`/scenarioReactions/${scenario._id}`} key={scenario._id}>{scenario._id}</NavLink>)
            }
        },
        {field: "numberOfUsers", headerName: "Num Of Users", width: 120, editable: true, type: 'number'},
        {field: "commentType", headerName: "commentType", width: 150, editable: true, type: 'text'},
        // { field: "CreationDate", headerName: "Creation Date", width: 120 , editable: true , type:'number'},//TODO CHENA waiting for Peleg
        {field: "severity", headerName: "Severity", width: 130, editable: true, type: 'string'}
    ];

    const logout = () => {
    navigate(-2);
    };

    return (
      <div className="background">
        <button className="button-81" onClick={logout}>
          Logout
        </button>
        <h2 id="scenarioTitle">Scenario Reactions</h2>
        <div className="element" style={{ width: "750px" }}>
          <div className="tableScenario">
            <div className="titleDiv">
              <p></p>
              <h2 id="scenarioMiniTitle">All scenarios</h2>
            </div>
            <Box sx={{ height: "90%", width: "100%" }}>
              <DataGrid
                editMode="row"
                rows={scenario}
                getRowId={(row) => row._id}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
                getRowHeight={() => "auto"}
                getCellClassName={(params) => {
                  if (params.field !== "severity") {
                    return "";
                  }
                  return params.value == "bad" ? "bad" : "good";
                }}
              />
            </Box>
          </div>
        </div>
        {selectedSenario ? (
          <ScenarioDetails
            scenario={selectedSenario}
            setSelectedScenario={setSelectedScenario}
          />
        ) : (
          <></>
        )}
        {add ? <AddScenario /> : <></>}
        <AdminSideBar />
      </div>
    );
}