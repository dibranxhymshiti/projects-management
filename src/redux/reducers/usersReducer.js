import users from "../../data/users.json";
import { actionTypes } from "../actionTypes";

const initialState = {
  users,
  emailExist: false,
};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_USER:
      if (emailExist(state.users, payload.email)) {
        return { ...state, emailExist: true };
      }

      const length = state.users.length;
      const newPayload = { ...payload, id: length + 1 };
      return { ...state, users: [...state.users, newPayload] };
    default:
      return state;
  }
};

const emailExist = (users, email) => {
  return !!users.find((usr) => usr.email === email);
};
