import produce from "immer";
import create from "zustand";

import firebase from "../config/firebase";
import "firebase/auth";

import API from "../config/API";
import log from "../helpers/log";

const authStates = {
  LOADING: "LOADING",
  NO_AUTH: "NO_AUTH",
  UNAUTHORISED: "UNAUTHORISED",
  LOGGED_IN: "LOGGED_IN",
  ADMIN: "ADMIN",
};

const getAuthToken = async () => {
  if (firebase.auth().currentUser)
    return firebase.auth().currentUser.getIdToken(true);
};

const useAuth = create(
  log((set, get) => ({
    user: null,
    authState: authStates.LOADING,
    initAuthHandler: () => {
      const subscriber = firebase.auth().onAuthStateChanged(async (user) => {
        API.defaults.headers.common = {
          Authorization: `bearer ${await getAuthToken()}`,
        };

        if (!user)
          set(
            produce((draftState) => {
              draftState.user = null;
              draftState.authState = authStates.NO_AUTH;
            })
          );
        else {
          if (user.uid === "ADMIN") {
            set(
              produce((draftState) => {
                draftState.user = null;
                draftState.authState = authStates.ADMIN;
              })
            );
          } else {
            await get().getUserDetails();
          }
        }
      });
      return subscriber;
    },
    loginWithEmail: async ({ email, password }) => {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    },
    loginAdmin: async (password) => {
      try {
        const { status, data: userData } = await API({
          url: "/auth/admin",
          method: "POST",
          data: { password },
        });

        console.log(userData);

        if (status !== 200) return;

        const { token } = userData;

        await firebase.auth().signInWithCustomToken(token);
      } catch (err) {
        set(
          produce((draftState) => {
            draftState.user = null;
            draftState.authState = authStates.UNAUTHORISED;
          })
        );
      }
    },
    logout: async () => {
      await firebase.auth().signOut();
    },
    getUserDetails: async () => {
      try {
        const { status, data: userData } = await API({
          url: "/auth/agent",
          method: "GET",
        });

        if (status !== 200) return;

        const { uid } = firebase.auth().currentUser;
        const { name, email } = userData;

        set(
          produce((draftState) => {
            draftState.user = {
              uid,
              name,
              email,
            };
            draftState.authState = authStates.LOGGED_IN;
          })
        );
      } catch (err) {
        set(
          produce((draftState) => {
            draftState.user = null;
            draftState.authState = authStates.UNAUTHORISED;
          })
        );
      }
    },
  }))
);

export { authStates, useAuth };
