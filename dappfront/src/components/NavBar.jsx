import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function NavBar({ auth }) {
  const [scroll, setScroll] = useState(false);
  const [transitionDelay, setTransitionDelay] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setTransitionDelay(true);
        setScroll(true);
      } else {
        setTransitionDelay(false);
        setScroll(false);
      }
    };
    console.log("Navbar Auth = " + auth);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [auth]);

  // Render the NavBar only if the current path is not '/login' or '/signup'
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/consumer"
  ) {
    return <></>; // Don't render anything
  }
  return (
    <>
      <nav
        // need to add Hamburger Menu
        className={`sticky top-0 left-0 block z-10 mx-auto w-fulltransition-all ease-in-out bg-white shadow-md
        ${scroll ? "p-2 md:h-16" : "p-6 md:h-24"}
        ${transitionDelay ? "duration-1000" : "duration-500"}`}
      >
        <div className="flex items-center justify-between w-11/12 mx-auto">
          <Link to="/" className="block max-w-[180px] cursor-pointer font-bold">
            SCM E-Portal
          </Link>

          <div className="hidden md:flex md:space-x-12">
            {location.pathname === "/consumer" ? (
              <>
                <Link
                  to="/"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Home
                </Link>
                <Link
                  to="/consumer"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Consumer
                </Link>
              </>
            ) : (
              <></>
            )}
            {location.pathname === "/distributor" ||
            location.pathname === "/distributor/analysis" ? (
              <>
                <Link
                  to="/"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Home
                </Link>
                <Link
                  to="/distributor"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Distributor
                </Link>
                <Link
                  to="/distributor/analysis"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Distributor Analysis
                </Link>
              </>
            ) : (
              <></>
            )}
            {location.pathname === "/manufacturer" ||
            location.pathname === "/manufacturer/analysis" ||
            location.pathname === "/manufacturer/product" ? (
              <>
                <Link
                  to="/"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Home
                </Link>
                <Link
                  to="manufacturer"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Manufacturer
                </Link>
                {/* <Link
                  to="manufacturer/product"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Products
                </Link> */}
                <Link
                  to="/manufacturer/analysis"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Manufacturer Analysis
                </Link>
              </>
            ) : (
              <></>
            )}
            {location.pathname === "/retailer" ||
            location.pathname === "/retailer/analysis" ? (
              <>
                <Link
                  to="/"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Home
                </Link>
                <Link
                  to="/retailer"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Retailer
                </Link>
                <Link
                  to="/retailer/analysis"
                  className=" text-black font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
                >
                  Retailer Analysis
                </Link>
              </>
            ) : (
              <></>
            )}
            <Link
              to="/login"
              className=" text-sky-blue font-semibold p-3 rounded-lg hover:text-black hover:bg-slate-200"
            >
              <>Logout</>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
