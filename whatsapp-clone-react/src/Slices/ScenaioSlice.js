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
    messages: []
}

const fakeMsg = {
  text: "מה קורה??",
  timeOffset: 0,
  nickname: "המלך של הכיתה",
};

const fakeMsg2 = {
  text: "היי!",
  timeOffset: 3000,
  nickname: "חתיך אש מגיל שש",
};

const fakeMsg3 = {
  text: "שלוםם",
  timeOffset: 5000,
  nickname: "גיל המלך",
};

const fakeMsg4 = {
  text: "ראיתם את הסרט החדש?",
  timeOffset: 60000,
  nickname: "המלך של הכיתה",
};

const fakeMsg5 = {
  text: "כןןן",
  timeOffset: 62000,
  nickname: "חתיך אש מגיל שש",
};

const scenarioMock = {
  id: "88888",
  severity: severity.HARSH,
  commentStyle: commentStyle.PRO,
  numberOfUsers: 2,
  messages: [fakeMsg, fakeMsg2, fakeMsg3, fakeMsg4, fakeMsg5],
};

// export const ScenarioSlice = createSlice({
//     name: 'scenario',
//     initialState,
//     reducers: {
//         initScenario: (state, action) => {
//             // state.id = action.payload;
//             state.id = scenarioMock.id;
//             state.numberOfUsers = scenarioMock.numberOfUsers;
//             state.severity = scenarioMock.severity;
//             state.commentStyle = scenarioMock.commentStyle;
//             state.messages = scenarioMock.messages;
//         },
//     }
// });
//
// export const {initScenario} = ScenarioSlice.actions;
//
// export default ScenarioSlice.reducer;