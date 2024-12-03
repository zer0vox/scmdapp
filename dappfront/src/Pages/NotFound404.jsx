import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <>
      <div className="block h-[100vh] text-center justify-center mt-7">
        <div>Not Found 404</div>
        <br></br>
        <Link
          to="/"
          className="text-sky-blue bg-slate-300 font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
        >
          Home
        </Link>
      </div>
    </>
  );
};

export default NotFound404;
