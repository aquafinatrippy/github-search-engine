import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  return (
    <div className="card shadow-md compact side bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounder-full shadow w-14 h-14">
              <img src={user.avatar_url} alt="profile" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">
            <Link
              className="text-base-content-text-opacity-40"
              to={`/users/${user.login}`}
            >
              Visit Profile
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
export default UserItem;
