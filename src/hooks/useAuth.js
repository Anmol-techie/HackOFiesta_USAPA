import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { state, setState } = useContext(AuthContext);

  const logIn = useCallback(
    (loginData) => {
      setState((oldState) => ({ ...oldState, ...loginData }));
    },
    [setState]
  );

  const logOut = useCallback(() => {
    setState((oldState) => ({
      isLoggedIn: false,
      authToken: null,
      userData: {},
    }));
  }, [setState]);

  return {
    ...state,
    logIn,
    logOut,
  };
};

export default useAuth;
