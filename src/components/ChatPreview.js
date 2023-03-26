import {React, useState, createRef, useEffect} from 'react';
import '../css/SignIn.moudle.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function ChatPreview() {
    const currentUser = useSelector((state) => state.user.nickname);
    const currentScenario = useSelector((state) => state.scenario);

    useEffect(()=>{
        console.log(currentScenario)
    })

    return (
      <div>
        <div id="login1">
          <div className="login_topimg"></div>
          <div className="wrap-login100">
            <span className="login100-form-title">
              <b>התחברות</b>
            </span>
            <span className="login100-form-subtitle m-b-16">
              {" "}
              {currentUser} :כינוי
            </span>
            <span
              className="login100-form-subtitle m-b-16"
              style={{ fontWeight: "bold" }}
            >
              {" "}
              מספר משתתפים: {currentScenario?.scenario.numberOfUsers}
            </span>
            <div className="container-login100-form-btn p-t-25">
              <Link to="/chat">
                <button
                  className="login100-form-btn"
                  style={{ marginBottom: "20px" }}
                >
                  המשך
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}