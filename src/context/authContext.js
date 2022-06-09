import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("dashboardUser")) || null,
};

function AuthReducer(state, action) {
  switch (action.type) {
    case "SET": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("dashboardUser", JSON.stringify(state.currentUser));
  }, [state.currentUser]);
  //   useEffect(() => {
  //     const temp = JSON.parse(localStorage.getItem("user")) || null;
  //     dispatch({ type: "SET", payload: temp });
  //   }, []);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
