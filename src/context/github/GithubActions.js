import axios from "axios";

const github_url = process.env.REACT_APP_GITHUB_URL;
const github_token = process.env.REACT_APP_GITHUB_TOKEN
  ? process.env.REACT_APP_GITHUB_TOKEN
  : "";

const config = process.env.REACT_APP_GITHUB_TOKEN
  ? {
      headers: {
        Authorization: `token ${github_token}`,
      },
    }
  : {};

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const res = await axios.get(`${github_url}/search/users?${params}`, config);

  return res.data.items;
};

export const getUser = async (login) => {
  const res = await axios.get(`${github_url}/users/${login}`, config);

  if (res.status === 404) {
    window.location = "/notfound";
  } else {
    const { data } = res;
    return data;
  }
};

export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const res = await axios.get(
    `${github_url}/users/${login}/repos?${params}`,
    config
  );
  const { data } = res;
  return data;
};
