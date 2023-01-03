import {React, useState, createRef} from 'react';
//import {useDispatch} from 'react-redux';
import '../css/SignIn.css';
import {Link} from "react-router-dom";


export default function Admin() {


    const [password, setPassword] = useState();



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
            <div className="admin">
                <Link to="/">
                <button className="button-81">Back</button>
                </Link>
            </div>
            <div id="login1">
                <div className="login_topimg"></div>
                <div className="wrap-login100">
                    <span className="login100-form-title"> Admin Login </span>
                    <span className="login100-form-subtitle m-b-16"> Enter your password below</span>
                    <div className="wrap-input100 validate-input m-b-16">
                        <input className="input100" type="password" placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        <span className="glyphicon glyphicon-user"></span>
                    </span>
                    </div>
                    <div className="container-login100-form-btn p-t-25">
                        <button className="login100-form-btn" style={{marginBottom: "20px"}}> Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}