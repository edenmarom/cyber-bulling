import {React , useState}  from 'react';
import { TextField } from '@material-ui/core';
import '../css/AddScenario.css';
import { serverAddr } from "../utils/http-communication";

export default function AddMessage(props){

    let firstMessage = {
        text: "",
        milliseconds_offset: 0,
        nickname: "",
        key : props.scenario.messages.length
    }

    const [message , setMessage] = useState(firstMessage);

    const save = async () => {
        for(let key in message){
            if(key !== "messages"){
                if(message[key] === "") {
                    alert("You need to fill all the inputs");
                    return;
                }
            }
        }
        message.milliseconds_offset = message.milliseconds_offset * 1000
        props.scenario.messages.push(message)
        console.log(props.scenario)
        props.setData([...props.data , message])
        props.setAdd(false)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.scenario)
        }
        try {
            let result = await fetch(serverAddr + `/scenarios/${props.scenario._id}`, options);
            result.json().then((res) => {
                console.log(res)
            })
        } catch {
            alert("Can't update scenario")
        }
    }

    return (
        <div className='app2'>
            <div>
                <h2 className='h2'>Add Message</h2>
                <form>
                    <div className='links'>
                        <div className='divLabel'>
                            {/* <label htmlFor='text'>:text</label> */}
                            <TextField id="outlined-basic" label="text" variant="outlined"
                                       value={message.text}
                                       onChange={(event)=>{setMessage(previousState => {
                                           return { ...previousState, text: event.target.value }
                                       })}}/>

                        </div>
                        <div className='divLabel'>
                            {/* <label htmlFor='milliseconds_offset'>:milliseconds_offset</label> */}
                            <TextField id="outlined-basic" label="seconds" variant="outlined"
                                       type="number"
                                       value={message.milliseconds_offset}
                                       onChange={(event)=>{setMessage(previousState => {
                                           return { ...previousState, milliseconds_offset: event.target.value }
                                       })}}/>

                        </div>
                        <div className='divLabel'>
                            {/* <label htmlFor='nickname'>:nickname</label> */}
                            <TextField id="outlined-basic" label="nickname" variant="outlined"
                                       value={message.nickname}
                                       onChange={(event)=>{setMessage(previousState => {
                                           return { ...previousState, nickname: event.target.value }
                                       })}}/>
                        </div>
                    </div>
                </form>
                <div className='buttons'>
                    <button className='buttonSave' onClick={()=>{save()}}>Add</button>
                </div>
            </div>
        </div>
    )
}