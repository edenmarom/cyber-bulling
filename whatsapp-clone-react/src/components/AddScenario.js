import {React , useState}  from 'react';
import { TextField } from '@material-ui/core';
import '../css/AddScenario.css'

export default function AddScenario(){

    let firstScenario = {
        tag:"",
        severity:"",
        commentType:"",
        numberOfUsers:0,
        messages: []
    }

    let firstMessage =  {
        text: "",
        milliseconds_offset: 0,
        nickname: ""
    }

    const [scenario , setScenario] = useState(firstScenario);
    const [message , setMessage] = useState(firstMessage);

    const save = async () => {
        scenario.numberOfUsers = Number(scenario.numberOfUsers)
        message.milliseconds_offset = Number(message.milliseconds_offset)
        for(let key in scenario){
            if(key !== "messages"){
                if(scenario[key] == "") {
                    alert("You need to fill all the inputs");
                    return;
                }
            }
        }
        for(let key in message){
            if(message[key] == "") {
                alert("You need to fill all the inputs");
                return;
            }
        }
        scenario.messages.push(message)
        console.log(scenario)
        const options ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scenario)
        }
        try{
            let result = await fetch('http://localhost:3000/scenarios', options);
            await result.json().then((res) => {
                console.log(res)
                //   alert(res)
            })
        }
        catch {
            alert("Can't insert to scenarios")
        }
    }

    return (
        <div className='app1'>
            <div className='allInfo'>
                <h2>Add Scenario</h2>
                <form>
                    <div className='links'>
                        <div className='divLabel'>
                            <label htmlFor='tag'>:tag</label>
                            <TextField id="outlined-basic" label="tag" variant="outlined"
                                       value={scenario.tag}
                                       onChange={(event)=>{setScenario(previousState => {
                                           return { ...previousState, tag: event.target.value }
                                       })}}
                            />
                        </div>
                        <div className='divLabel'>
                            <label htmlFor='severity'>:severity</label>
                            <TextField id="outlined-basic" label="severity" variant="outlined"
                                       value={scenario.severity}
                                       onChange={(event)=>{setScenario(previousState => {
                                           return { ...previousState, severity: event.target.value }
                                       })}}/>

                        </div>
                        <div className='divLabel'>
                            <label htmlFor='commentType'>:comment type</label>
                            <TextField id="outlined-basic" label="commentType" variant="outlined"
                                       value={scenario.commentType}
                                       onChange={(event)=>{setScenario(previousState => {
                                           return { ...previousState, commentType: event.target.value }
                                       })}}/>

                        </div>
                        <div className='divLabel'>
                            <label htmlFor='numberOfUsers'>:number of users</label>
                            <TextField id="outlined-basic" label="numberOfUsers" variant="outlined"
                                       type="number"
                                       value={scenario.numberOfUsers}
                                       onChange={(event)=>{setScenario(previousState => {
                                           return { ...previousState, numberOfUsers: event.target.value }
                                       })}}/>
                        </div>
                        {/* <h3 style={{textAlign:"center" , color:"blue"}}>message</h3> */}
                        <div className='divLabel'>
                            <label htmlFor='text'>:text</label>
                            <TextField id="outlined-basic" label="text" variant="outlined"
                                       value={message.text}
                                       onChange={(event)=>{setMessage(previousState => {
                                           return { ...previousState, text: event.target.value }
                                       })}}
                            />
                        </div>
                        <div className='divLabel'>
                            <label htmlFor='milliseconds_offset'>:milliseconds offset</label>
                            <TextField id="outlined-basic" label="milliseconds_offset" variant="outlined"
                                       type="number"
                                       value={message.milliseconds_offset}
                                       onChange={(event)=>{setMessage(previousState => {
                                           return { ...previousState, milliseconds_offset: event.target.value }
                                       })}}/>

                        </div>
                        <div className='divLabel'>
                            <label htmlFor='nickname'>:nickname</label>
                            <TextField id="outlined-basic" label="nickname" variant="outlined"
                                       value={message.nickname}
                                       onChange={(event)=>{setMessage(previousState => {
                                           return { ...previousState, nickname: event.target.value }
                                       })}}/>

                        </div>
                    </div>
                </form>
                <div className='buttons'>
                    <button className='buttonSave' onClick={()=>{save()}}>save</button>
                </div>
            </div>
        </div>
    )
}