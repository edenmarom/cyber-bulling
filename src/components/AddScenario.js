import { React, useState } from 'react';
import { TextField } from '@material-ui/core';
import '../css/AddScenario.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {serverAddr} from "../utils/http-communication"


export default function AddScenario(props) {

    let firstScenario = {
        tag: "",
        severity: "",
        commentType: "",
        numberOfUsers: 2,
        messages: []
    }

    let firstMessage = {
        text: "",
        milliseconds_offset: 0,
        nickname: ""
    }

    const [scenario, setScenario] = useState(firstScenario);
    const [message, setMessage] = useState(firstMessage);

    const save = async () => {
        scenario.numberOfUsers = Number(scenario.numberOfUsers)
        message.milliseconds_offset = Number(message.milliseconds_offset) *1000
        for (let key in scenario) {
            if (key !== "messages") {
                if (scenario[key] === "") {
                    alert("You need to fill all the inputs");
                    return;
                }
            }
        }
        for (let key in message) {
            if (message[key] === "") {
                alert("You need to fill all the inputs");
                return;
            }
        }
        scenario.messages.push(message)
        console.log(scenario)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scenario)
        }
        try {
            let result = await fetch(serverAddr + '/scenarios', options);
            await result.json().then((res) => {
                console.log(res)
                props.setScenarios([...props.scenario, res.data])
                props.setAdd(false);
            })
        }
        catch {
            alert("Can't insert to scenarios")
        }
    }

    function close(e) {
        if (e.target.className === "popup") {
            props.setAdd(false);
        }
    }

    return (
        <div className='popup' onClick={(e) => close(e)}>
            <div className='app1'>
                <div>
                    <h2 className='h2'>Add Scenario</h2>
                    <form>
                        <div className='links'>
                            <div className='divLabel'>
                                {/* <label htmlFor='tag'>:tag</label> */}
                                <TextField id="outlined-basic" label="tag" variant="outlined"
                                           value={scenario.tag}
                                           onChange={(event) => {
                                               setScenario(previousState => {
                                                   return { ...previousState, tag: event.target.value }
                                               })
                                           }}
                                />
                            </div>
                            <div className='divLabel'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">severity</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={scenario.severity}
                                            label="severity"
                                            onChange={(event) => {
                                                setScenario(previousState => {
                                                    return { ...previousState, severity: event.target.value }
                                                })
                                            }}
                                        >
                                            <MenuItem value={"good"}>Good</MenuItem>
                                            <MenuItem value={"bad"}>Bad</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='divLabel'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">commentType</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={scenario.commentType}
                                            label="commentType"
                                            onChange={(event) => {
                                                setScenario(previousState => {
                                                    return { ...previousState, commentType: event.target.value }
                                                })
                                            }}
                                        >
                                            <MenuItem value={"pro"}>pro</MenuItem>
                                            <MenuItem value={"against"}>against</MenuItem>
                                            <MenuItem value={"noComment"}>noComment</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>

                            </div>
                            <div className='divLabel'>
                                <TextField id="outlined-basic" label="numberOfUsers" variant="outlined"
                                           type="number"
                                           min="1"
                                           value={scenario.numberOfUsers}
                                           onChange={(event) => {
                                               setScenario(previousState => {
                                                   return { ...previousState, numberOfUsers: event.target.value }
                                               })
                                           }} />
                            </div>
                            <h2 style={{ fontSize: "24px", padding: "5px" }}>first message</h2>
                            <h2 style={{ fontSize: "12px", padding: "5px" }}>the rest messages you can add after you add the scenario</h2>
                            <div className='divLabel'>
                                <TextField id="outlined-basic" label="text" variant="outlined"
                                           value={message.text}
                                           onChange={(event) => {
                                               setMessage(previousState => {
                                                   return { ...previousState, text: event.target.value }
                                               })
                                           }}
                                />
                            </div>
                            <div className='divLabel'>
                                <TextField id="outlined-basic" label="seconds" variant="outlined"
                                           type="number"
                                           value={message.milliseconds_offset}
                                           onChange={(event) => {
                                               setMessage(previousState => {
                                                   return { ...previousState, milliseconds_offset: event.target.value }
                                               })
                                           }} />

                            </div>
                            <div className='divLabel'>
                                <TextField id="outlined-basic" label="nickname" variant="outlined"
                                           value={message.nickname}
                                           onChange={(event) => {
                                               setMessage(previousState => {
                                                   return { ...previousState, nickname: event.target.value }
                                               })
                                           }} />

                            </div>
                        </div>
                    </form>
                    <div className='buttons'>
                        <button className='buttonSave' onClick={() => { save() }}>save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}