import { actionTypes } from "../actionTypes";

export const addProject = (project) => {
  return {
    type: actionTypes.ADD_PROJECT,
    payload: project,
  };
};

export const updateProject = (project) => {
  return {
    type: actionTypes.UPDATE_PROJECT,
    payload: project,
  };
};

export const selectProject = (project) => {
  return {
    type: actionTypes.SELECT_PROJECT,
    payload: project,
  };
};
