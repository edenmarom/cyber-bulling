import {React, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import "../css/Messages.css";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import AdminSideBar from './AdminSideBar';


function Messages(){
    const [messages,setMessages] = useState([])
    const scenarioId = useParams();

    const getScenario = () => {
        fetch(`http://localhost:3000/scenario-reactions/${scenarioId.scenarioId}`)
            .then((res) => res.json())
            .then((response) => {
                let array = []
                let length = response.data.scenario.messages.length
                for (let i=0;i<length;i++){
                    let message = response.data.scenario.messages[i]
                    array.push({
                        nickname: message.nickname,
                        text: message.text,
                        milliseconds_offset:message.milliseconds_offset,
                        participant: false ,
                        key: i
                    })
                }
                response.data.participants.forEach(element => {
                    for(let i=0; i< element.messages.length;i++){
                        let message = element.messages[i]
                        array.push({
                            nickname: element.nickname,
                            text: message.Text,
                            milliseconds_offset:message.milliseconds_offset,
                            participant: true ,
                            key: length + i
                        })
                    }
                });
                array = array.sort((a,b)=>a.milliseconds_offset - b.milliseconds_offset)
                setMessages(array)
            })
    }

    function changeOffset(value){
        if(value >=60){
            return Math.floor(value/60) + ":" + value%60
        } else {
            return "0:" + value
        }
    }

    const columns = [
        {field: "nickname", headerName: "User", width:300, editable: true, type: 'string'},
        {field: "text", headerName: "Message", width: 300, editable: true, type: 'string'},
        {field: "milliseconds_offset", headerName: "Offset", width: 200, editable: true, type: 'string' ,  valueGetter: ({ value }) => changeOffset(value)}
    ];

    useEffect(()=>{
        getScenario();
    },[])

    return(
        <div className="background">
            <h2 id="scenarioTitle">Scenario Reactions</h2>
            <div className='element3'>
                <div className="tableScenario" style={{padding:"20px"}}>
                    <div className='titleDiv'>
                        <p></p>
                        <h2 id="scenarioMiniTitle">Scenario result</h2>
                    </div>
                    <Box sx={{ height: '90%', width: '100%'}}>
                        <DataGrid
                            editMode="row"
                            rows={messages}
                            getRowId={(row) => row.key}
                            columns={columns}
                            experimentalFeatures={{newEditingApi: true}}
                            getRowHeight={() => 'auto'}
                            getRowClassName={(params) => {
                                return params.row.participant == true ? 'participant' : 'noParticipant';
                            }}
                        />
                    </Box>
                </div>
            </div>
            <AdminSideBar/>
        </div>
    );
}
export default Messages;