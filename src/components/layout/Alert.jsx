import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import notfound from "../assets/notfound.png";

function Alert() {
  const { alert } = useContext(AlertContext);
  return (
    alert !== null && (
      <p className="flex items-start mb-4 space-x-2">
        {alert.type === "error" && <img src={notfound} alt="" />}
        <p className="flex-1 text-base font-semibold leading-7">
          <strong>{alert.msg}</strong>
        </p>
      </p>
    )
  );
}
export default Alert;
