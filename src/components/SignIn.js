import {React, useState, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {
//     textNumberValidate,
//     emailValidate,
// } from "react-validations-components";
import '../css/SignIn.moudle.css';
import {Link} from "react-router-dom";
import {initUser, updateUserID} from "../Slices/UserSlice";
import {initScenario} from "../Slices/ScenarioSlice";
import { serverAddr } from '../utils/http-communication';


export default function SignIn() {
    const dispatch = useDispatch();
    const currentScenario = useSelector((state) => state.scenario.scenario);
    const currentUser = useSelector((state) => state.user.nickname);


    const signIn = async () => {
        console.log(currentUser);
        if(currentUser.length !== 0 && (currentUser.length > 15 || currentUser.length < 6) && (/^[a-zA-Z0-9]*$/.test(currentUser) || /^[a-zA-Z]*$/.test(currentUser))){
            document.getElementById("error").style.display = "block";
            return;
        } else if(currentUser.length <= 15 && currentUser.length >= 6 ){
            document.getElementById("error").style.display = "none";
        }
        else {
            document.getElementById("error").style.display = "none";

        }
    console.log(/^[a-zA-Z]*$/.test(currentUser))
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nickname: currentUser})
    }
    try {
      let result = await fetch(serverAddr + "/users", options);
      await result.json().then((res) => {
         dispatch(updateUserID(res.data.user._id));
         dispatch(initScenario(res.data.scenario));
         window.location.href = "/chatpreview"
      });
    } catch (error){
        console.log(error);
    }
    }
    return (
        <div className="login-background">
            <div className="admin">
                <Link to="adminlogin">
                    <button className="button-81">Admin</button>
                </Link>
            </div>
            <div id="login1">
                <div className="login_topimg"></div>
                <div className="wrap-login100">
                    <span className="login100-form-title"><b>התחברות</b></span>
                    <span className="login100-form-subtitle m-b-16"> בחר כינוי</span>
                    <span className="login100-form-subtitle m-b-16"> * הכינוי צריך להכיל בין 6-15 תוים</span>
                    <span className="login100-form-subtitle m-b-16"> * אל תשתמש בשם האמיתי שלך</span>
                    <div className="wrap-input100 validate-input m-b-16">
                        <input className="input100" type="text" placeholder="כינוי"
                               onKeyPress={(e)=>{
                                   if(e.key == "Enter"){
                                       e.preventDefault();
                                       signIn();
                                   }
                               }}
                               maxLength="15" minLength="6"
                               onChange={(e) => {//TODO CHENA change to onSubmit
                                   dispatch(initUser(e.target.value));
                               }

                               }/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        <span className="glyphicon glyphicon-user"></span>
                    </span>
                    </div>
                    <div className="container-login100-form-btn p-t-25">

                            <div style={{textAlign:"center" , color:"red" , display:"none"}} id="error">
                                <p>הכינוי לא עומד בתנאים - חייב להיות בין 6-15 תווים</p>
                            </div>

                                <button className="login100-form-btn" onClick={()=>signIn()} style={{marginBottom: "20px"}}>המשך</button>

                    </div>
                </div>
            </div>
        </div>
    )
}