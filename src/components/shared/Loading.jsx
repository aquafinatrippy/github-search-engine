import spinner from "../assets/loading.gif";

const Loading = () => {
  return (
    <div className="mx-auto">
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "100px", margin: "auto", display: "block" }}
      />
    </div>
  );
};

export default Loading;
