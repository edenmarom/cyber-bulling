import {React, useState, createRef} from 'react';
//import {useDispatch} from 'react-redux';
import '../css/SignIn.css';
import {Link} from "react-router-dom";


export default function AdminLogin() {


    const [password, setPassword] = useState();
    const adminLogin = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password})
        }
        try {
            let result = await fetch('http://localhost:3000/admin', options);
            await result.json().then((res) => {
                console.log("res",res);
                console.log("res.message",res.message);
                ///if(res.success){
                window.location.href="/scenariomanagement"
            })
        } catch (error) {
            alert("Password incorrect")
        }
    }
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
                        <Link to="scenariomanagement">{/*TODO CHENA change to admin page*/}
                            <button className="login100-form-btn" onClick={adminLogin}
                                    style={{marginBottom: "20px"}}> Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}