/* eslint-disable react/prop-types */
import ReactLoading from "react-loading";

function LoadingComponent({ text }) {
  return (
    <div className="fixed right-0 bottom-0 w-full h-screen flex justify-center items-center">
      <p className="text-primary text-3xl mb-2">{text}</p>
      <ReactLoading color="#5F43AB" />
    </div>
  );
}

export default LoadingComponent;
