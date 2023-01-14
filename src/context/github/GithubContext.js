import { createContext, useReducer } from "react";
import axios from "axios";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const github_url = process.env.REACT_APP_GITHUB_URL;
const github_token = process.env.REACT_APP_GITHUB_TOKEN
  ? process.env.REACT_APP_GITHUB_TOKEN
  : "";

export const GithubProvider = ({ children }) => {
  const initState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initState);

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const searchUsers = async (text) => {
    setLoading();
    let config = {};
    const params = new URLSearchParams({
      q: text,
    });
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      config = {
        headers: {
          Authorization: `token ${github_token}`,
        },
      };
    }
    const res = await axios.get(`${github_url}/search/users?${params}`, config);

    dispatch({
      type: "GET_USERS",
      payload: res.data.items,
    });
  };

  const getUser = async (login) => {
    setLoading();
    let config = {};
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      config = {
        headers: {
          Authorization: `token ${github_token}`,
        },
      };
    }
    const res = await axios.get(`${github_url}/users/${login}`, config);

    if (res.status === 404) {
      window.location = "/notfound";
    } else {
      const { data } = res;
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_RESULTS" });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
        user: state.user,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
