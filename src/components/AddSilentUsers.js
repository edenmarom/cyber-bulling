import {React , useState, useEffect}  from 'react';
import { TextField } from '@material-ui/core';
import '../css/AddScenario.css';
import { serverAddr } from "../utils/http-communication";

export default function AddSilentUsers(props){
    const [currentSilentusers, setcurrentSilentusers] = useState([]);
    const [newUser, setNewUser] = useState([]);

    useEffect(() => {
        getCurrentSilentUsers();
    }, []);

    const getCurrentSilentUsers = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      };
      try {
        let result = await fetch(
          serverAddr + `/silent-users/${props.scenario._id}`,
          options
        );
        result.json().then((res) => {
          setcurrentSilentusers(res.data);
        });
      } catch {
        alert("Error getting current silent users");
      }
    };

    const save = async () => {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname: newUser }),
        };
        try {
            let result = await fetch(
              serverAddr + `/silent-users/${props.scenario._id}`,
              options
            );
            result.json().then((res) => {
                console.log(res);
                setcurrentSilentusers(currentSilentusers?.concat(newUser));
                setNewUser("")
            })
        } catch {
            alert("Can't update scenario")
        }
    }

    return (
      <div className="app3">
        <div>
          <h2 className="h2">Silent Users</h2>
          <h2 style={{ fontSize: "24px", padding: "5px" }}>
            Existing
          </h2>
          <h2 style={{ fontSize: "12px", padding: "5px", overflowWrap: "break-word", maxHeight: "70px", overflowY:"auto" }}>
            {currentSilentusers?.join(', ')}
          </h2>
          <h2></h2>
          <h2 style={{ fontSize: "24px", padding: "5px" }}>
            Add new user
          </h2>
          <form>
            <div className="links">
              <div className="divLabel">
                <TextField
                  id="outlined-basic"
                  label="nickname"
                  variant="outlined"
                  value={newUser}
                  onChange={(event) => {
                    setNewUser(event.target.value);
                  }}
                />
              </div>
            </div>
          </form>
          <div className="buttons">
            <button
              className="buttonSave"
              onClick={() => {
                save();
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
}