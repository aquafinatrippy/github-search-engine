import { createContext, useReducer } from "react";
import axios from "axios";
import GithubReducer from "./GithubReducer";
import { data } from "autoprefixer";

const GithubContext = createContext();

const github_url = process.env.REACT_APP_GITHUB_URL;
const github_token = process.env.REACT_APP_GITHUB_TOKEN
  ? process.env.REACT_APP_GITHUB_TOKEN
  : "";

export const GithubProvider = ({ children }) => {
  const initState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(GithubReducer, initState);

  const fetchUsers = async () => {
    let config = {};
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      config = {
        headers: {
          Authorization: `token ${github_token}`,
        },
      };
    }
    const res = await axios.get(`${github_url}/users`, config);

    dispatch({
      type: "GET_USERS",
      payload: res.data,
    });
  };
  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
