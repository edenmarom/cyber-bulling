import {React, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import "../css/Messages.css";
import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import AdminSideBar from './AdminSideBar';
import {serverAddr} from "../utils/http-communication";


function Messages() {
    const [messages, setMessages] = useState([])
    const scenarioId = useParams();
    const [participants, setParticipats] = useState([])

    const getScenario = () => {
        fetch(serverAddr + `/scenario-reactions/${scenarioId.scenarioId}`)
            .then((res) => res.json())
            .then((response) => {
                console.log(response)
                setMessages(response.data.scenario.messages);
                setParticipats(response.data.participants);
            })
    }

    function changeOffset(value) {
        if(value/1000 >= 3600){
            if (String(Math.floor(value/1000 % 3600)).length === 1) {
                return Math.floor(value/1000 / 3600) + ":0" + Math.floor(value/1000 % 3600 /60) + ":" + Math.floor(value/1000 % 60)
            } else return Math.floor(value/1000 / 3600) + ":" + Math.floor(value/1000 % 3600 /60) + ":" + Math.floor((value/1000) % 60)
        }
        if (value/1000 >= 60) {
            if (String(Math.floor(value/1000 % 60)).length === 1) {
                return Math.floor(value/1000 / 60) + ":0" + Math.floor(value/1000 % 60)
            } else return Math.floor(value/1000 / 60) + ":" + Math.floor((value/1000) % 60)
        } else if (String(value/1000) < 10) {
            return "0:0" + Math.floor(value / 1000);
        } else {
            return "0:" + Math.floor(value / 1000);
        }
    }

    const columns = [
        {field: "nickname", headerName: "User", width: 300, editable: true, type: 'string'},
        {field: "text", headerName: "Message", width: 300, editable: true, type: 'string'},
        {
            field: "milliseconds_offset",
            headerName: "Offset",
            width: 200,
            editable: true,
            type: 'string',
            valueGetter: ({value}) => changeOffset(value)
        }
    ];

    useEffect(() => {
        getScenario();
    }, [])

    let tableUi = participants.map((participant, index) => {
        let array = []
        let length = messages.length
        for (let i = 0; i < length; i++) {
            let message = messages[i]
            array.push({
                nickname: message.nickname,
                text: message.text,
                milliseconds_offset: message.milliseconds_offset,
                participant: false,
                key: i
            })
        }
        for (let i = 0; i < participant.messages.length; i++) {
            let message = participant.messages[i]
            array.push({
                nickname: participant.nickname,
                text: message.text,
                milliseconds_offset: message.milliseconds_offset,
                participant: true,
                key: length + i
            })

        }
        array = array.sort((a, b) => a.milliseconds_offset - b.milliseconds_offset)
        return (
            <Box sx={{height: '90%', width: '100%', marginBottom: "20px"}} key={index}>
                <DataGrid
                    editMode="row"
                    rows={array}
                    getRowId={(row) => row.key}
                    columns={columns}
                    experimentalFeatures={{newEditingApi: true}}
                    getRowHeight={() => 'auto'}
                    autoHeight={true}
                    getRowClassName={(params) => {
                        return params.row.participant === true ? 'participant' : 'noParticipant';
                    }}
                />
            </Box>
        )
    })

    return (
        <div className="background">
            <h2 id="scenarioTitle">Scenario Reactions</h2>
            <div className='element3'>
                <div className="tableScenario" style={{padding: "20px"}}>
                    <div className='titleDiv'>
                        <p></p>
                        <h2 id="scenarioMiniTitle">Scenario result</h2>
                    </div>
                    {tableUi}
                </div>
            </div>
            <AdminSideBar/>
        </div>
    );
}

export default Messages;