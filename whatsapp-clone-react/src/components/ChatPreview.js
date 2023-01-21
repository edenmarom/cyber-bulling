import {React, useState, createRef, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import '../css/SignIn.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {initScenario} from "../Slices/ScenarioSlice";


export default function ChatPreview() {
    const currentUser = useSelector((state) => state.user.nickname);
    const currentScenario = useSelector((state) => state.scenario.scenario);

useEffect(()=>{
    console.log(currentScenario);
    })
    // Check the email and the password.
    // const signIn = async () => {
    //     let insert = true;
    //     if (!emailValidate(email).status || email === undefined) {
    //         inputEmail.current.style.display = "block";
    //         insert = false;
    //     } else inputEmail.current.style.display = "none";
    //     if (!textNumberValidate(password).status || password === undefined) {
    //         inputPassword.current.style.display = "block";
    //         insert = false;
    //     } else {
    //         inputPassword.current.style.display = "none";
    //     }

    //     if (insert) {
    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ email: email, password: password })
    //         }
    //         try {
    //             let result = await fetch('/user', options);
    //             await result.json().then((res) => {
    //                 if (typeof res == "string") alert(res)
    //                 else if (typeof res == "object") {
    //                     let user = JSON.parse(localStorage.getItem('currentUser'));
    //                     if (user !== null) {
    //                         localStorage.removeItem('currentUser');
    //                     }
    //                     if (checkbox.current.checked) {
    //                         localStorage.setItem('currentUser', JSON.stringify(res));
    //                     }
    //                     close();
    //                 }
    //             })
    //         }
    //         catch {
    //             userExist.current.style.display = "block";
    //         }
    //     }
    // }
    return (
        <div>
            <div id="login1">
                <div className="login_topimg"></div>
                <div className="wrap-login100">
                    <span className="login100-form-title"><b>התחברות</b></span>
                    <span className="login100-form-subtitle m-b-16"> כינוי:{currentUser}</span>
                    <span className="login100-form-subtitle m-b-16"> מספר משתתפים:{currentScenario.numberOfUsers}</span>
                    <div className="container-login100-form-btn p-t-25">
                        <Link to= {`/rooms/${currentScenario._id}`}>
                            <button className="login100-form-btn" style={{marginBottom: "20px"}}>המשך</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}