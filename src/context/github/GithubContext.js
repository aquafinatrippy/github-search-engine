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
    repos: [],
  };

  const [state, dispatch] = useReducer(GithubReducer, initState);

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
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

  const getUserRepos = async (login) => {
    setLoading();
    let config = {};
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      config = {
        headers: {
          Authorization: `token ${github_token}`,
        },
      };
    }
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const res = await axios.get(
      `${github_url}/users/${login}/repos?${params}`,
      config
    );
    const { data } = res;
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_RESULTS" });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
