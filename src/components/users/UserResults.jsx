import { useContext } from "react";
import { useEffect } from "react";
import GithubContext from "../../context/GithubContext";
import Loading from "../shared/Loading";
import UserItem from "./UserItem";

const UserResults = () => {
  const { fetchUsers, users, loading } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((item, index) => (
        <UserItem key={index} user={item} />
      ))}
    </div>
  );
};

export default UserResults;
