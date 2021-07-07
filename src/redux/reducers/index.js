import { combineReducers } from "redux";
import { projectsReducer } from "./projectsReducer";
import { usersReducer } from "./usersReducer";

export const reducers = combineReducers({
  projects: projectsReducer,
  users: usersReducer,
});
