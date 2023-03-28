import {React} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../css/SignIn.moudle.css';
import {Link} from "react-router-dom";
import {initUser, updateUserID} from "../Slices/UserSlice";
import {initScenario} from "../Slices/ScenarioSlice";
import { serverAddr } from '../utils/http-communication';
import { useParams } from "react-router-dom";

export default function SignIn() {
    const params = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.nickname);

    const signIn = async () => {
        if(currentUser.length !== 0 && (currentUser.length > 15 || currentUser.length < 6)){
            document.getElementById("error").style.display = "block";
            return;
        }
        else if(currentUser.length <= 15 && currentUser.length >= 6 && currentUser.match(/[a-zA-Zא-ת]/g) ){
            document.getElementById("error").style.display = "none";
        }
        else {
            document.getElementById("error").style.display = "block";
            return;
        }
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({nickname: currentUser,scenarioId: params.scenarioId}),
        };
        try {
            let result = await fetch(serverAddr + "/users", options);
            await result.json().then((res) => {
                console.log(res)
                dispatch(updateUserID(res.data.user._id));
                dispatch(initScenario(res.data.scenario));
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
            <span className="login100-form-title" style={{ fontSize: "40px" }}>
              <b>התחברות</b>
            </span>
            <span className="login100-form-subtitle m-b-16"> בחר כינוי</span>
            <span className="login100-form-subtitle m-b-16">
              {" "}
              * הכינוי צריך להכיל בין 6-15 תוים
            </span>
            <span className="login100-form-subtitle m-b-16">
              {" "}
              * אל תשתמש בשם האמיתי שלך
            </span>
            <div className="wrap-input100 validate-input m-b-16">
              <input
                className="input100"
                type="text"
                placeholder="כינוי"
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                    document.getElementById("buttonContinue").click();
                  }
                }}
                maxLength="15"
                minLength="6"
                onChange={(e) => {
                  dispatch(initUser(e.target.value));
                }}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="glyphicon glyphicon-user"></span>
              </span>
            </div>
            <div className="container-login100-form-btn p-t-25">
              <div
                style={{ textAlign: "center", color: "red", display: "none" }}
                id="error"
              >
                <p>
                  {" "}
                  הכינוי לא עומד בתנאים - חייב להיות בין 6-15 תווים וגם להכיל
                  לפחות אות אחת
                </p>
              </div>
              {currentUser.length <= 15 &&
              currentUser.length >= 6 &&
              currentUser.match(/[a-zA-Zא-ת]/g) ? (
                <Link to="chatpreview">
                  <button
                    className="login100-form-btn"
                    id="buttonContinue"
                    onClick={() => signIn()}
                    style={{ marginBottom: "20px" }}
                  >
                    המשך
                  </button>
                </Link>
              ) : (
                <button
                  className="login100-form-btn"
                  onClick={() => signIn()}
                  style={{ marginBottom: "20px" }}
                >
                  המשך
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}