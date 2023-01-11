import {createSlice} from "@reduxjs/toolkit";

const severity = {
    HARSH:0,
    MILD:1
}

const commentStyle = {
    PRO: 0,
    AGAINST: 1,
    NO_COMMENT: 2
}

const initialState = {
    id: "",
    severity: severity.HARSH,
    commentStyle: commentStyle.PRO,
    numberOfUsers: 2,
    fakeUsers: [],
    messages: []
}

const fakeUser = {
  nickname: "גיל המלך",
  id: "1",
  scenarioId: "88888",
  scenarioStartTime: Date.now(),
};

const fakeUser2 = {
  nickname: "חתיך אש מגיל שש",
  id: "2",
  scenarioId: "88888",
  scenarioStartTime: Date.now(),
};

const fakeUser3 = {
  nickname: "המלך של הכיתה",
  id: "3",
  scenarioId: "88888",
  scenarioStartTime: Date.now(),
};

const fakeMsg = {
  text: "hii",
  timeOffset: "0",
  user: "1",
};

const fakeMsg2 = {
  text: "hii2",
  timeOffset: "0:12",
  user: "2",
};

const fakeMsg3 = {
  text: "hii3",
  timeOffset: "0:15",
  user: "3",
};
const scenarioMock = {
  id: "88888",
  severity: severity.HARSH,
  commentStyle: commentStyle.PRO,
  numberOfUsers: 2,
  fakeUsers: [fakeUser, fakeUser2, fakeUser3],
  messages: [fakeMsg, fakeMsg2, fakeMsg3],
};



export const ScenarioSlice = createSlice({
    name: 'scenario',
    initialState,
    reducers: {
        initScenario: (state, action) => {
            // state.id = action.payload;
            state.id = scenarioMock.id;
            state.numberOfUsers = scenarioMock.numberOfUsers;
            state.severity = scenarioMock.severity;
            state.commentStyle = scenarioMock.commentStyle;
            state.messages = scenarioMock.messages;
            state.fakeUsers = scenarioMock.fakeUsers;

        },
    }
});

export const {initScenario} = ScenarioSlice.actions;

export default ScenarioSlice.reducer;