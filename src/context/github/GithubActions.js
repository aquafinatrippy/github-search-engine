import axios from "axios";

const github_url = process.env.REACT_APP_GITHUB_URL;
const github_token = process.env.REACT_APP_GITHUB_TOKEN
  ? process.env.REACT_APP_GITHUB_TOKEN
  : "";

export const searchUsers = async (text) => {
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

  return res.data.items;
};
