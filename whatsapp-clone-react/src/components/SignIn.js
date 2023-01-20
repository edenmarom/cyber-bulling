import {React, useState, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {
//     textNumberValidate,
//     emailValidate,
// } from "react-validations-components";
import '../css/SignIn.css';
import {Link} from "react-router-dom";
import {initUser} from "../Slices/UserSlice";
import {initScenario} from "../Slices/ScenaioSlice";


export default function SignIn() {
    const dispatch = useDispatch();
    const currentScenario = useSelector((state) => state.scenario.id);
    const currentUser = useSelector((state) => state.user.nickname);


    const signIn = async () => {
        console.log(currentUser);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nickname: currentUser})
    }
    try {
        let result = await fetch('http://localhost:3000/users', options);
        await result.json().then((res) => {
            console.log(res);
        })
    } catch (error){
        console.log(error);
    }
    }
    return (
        <div>
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
                               maxLength="15" minLength="6"
                               onChange={(e) => {//TODO CHENA change to onSubmit
                                   dispatch(initUser(e.target.value));
                                   dispatch(initScenario("5"));
                               }
                               }/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        <span className="glyphicon glyphicon-user"></span>
                    </span>
                    </div>
                    <div className="container-login100-form-btn p-t-25">
                        {currentUser.length !== 0 && (currentUser.length > 15 || currentUser.length < 6) ?
                            <div>
                                <p>הכינוי לא עומד בתנאים - חייב להיות בין 6-15 תווים</p>
                            </div> : <></>
                        }
                        {currentUser.length <= 15 && currentUser.length >= 6 ?
                            <Link to="chatpreview">
                                <button className="login100-form-btn" onClick={()=>signIn()} style={{marginBottom: "20px"}}>המשך</button>
                            </Link> : <button className="login100-form-btn" style={{marginBottom: "20px"}}>המשך</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}