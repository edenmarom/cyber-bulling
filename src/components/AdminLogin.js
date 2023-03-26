import {React, useState} from 'react';
import '../css/SignIn.moudle.css';
import {Link} from "react-router-dom";
import {serverAddr} from "../utils/http-communication"


export default function AdminLogin() {


    const [password, setPassword] = useState();
    const adminLogin = async () => {
        console.log(password)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password})
        }
        try {
            let result = await fetch(serverAddr +'/admin', options)
            const result2 = await result
            console.log(result2.status)
            if(result2.status===201){
                window.location.href="/scenariomanagement"
            }
            else if (result2.status===400){
                alert("Password incorrect")//TODO Peleg need to return 200
                window.location.href="/adminlogin"
            }
        } catch (error) {
            alert("Error while calling /admin")
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
                               onChange={(e) => setPassword(e.target.value)}
                               onKeyPress={(e)=>{
                                   if(e.key == "Enter"){
                                       e.preventDefault();
                                       document.getElementById("buttonContinueAdmin").click();
                                   }
                               }}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        <span className="glyphicon glyphicon-user"></span>
                    </span>
                    </div>
                    <div className="container-login100-form-btn p-t-25">
                        {/*<Link to="scenariomanagement">*/}
                            <button id="buttonContinueAdmin" className="login100-form-btn" onClick={adminLogin}
                                    style={{marginBottom: "20px"}}> Login
                            </button>
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}