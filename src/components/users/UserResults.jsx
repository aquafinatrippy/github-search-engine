import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../shared/Loading";

const UserResults = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let config = {};
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      config = {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      };
    }
    const res = await axios.get(
      `${process.env.REACT_APP_GITHUB_URL}/users`,
      config
    );
    setUsers(res.data);
    setLoading(false);
  };
  if (loading) return <Loading />;
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((item) => (
        <h1>{item.login}</h1>
      ))}
    </div>
  );
};

export default UserResults;
