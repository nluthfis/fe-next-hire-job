import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { setUser, reset } from "../store/reducers/userSlice";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("auth");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    dispatch(reset());
    if (typeof window !== "undefined") {
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    }
  };

  return (
    <div className="bg-white shadow-lg">
      <div className="container align-item-center mt-1">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div>
              <Link href="/">
                <img
                  className="logo-logo"
                  src="/logo.png"
                  height="30px"
                  alt="CoolBrand"
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </div>
            <div className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <img
                    className="m-2"
                    src="/mail.png"
                    style={{ width: `3vh`, height: `3vh` }}
                  />
                  <img
                    className="m-2"
                    src="/bell.png"
                    style={{ width: `3vh`, height: `3vh` }}
                  />
                  <div style={{ position: "relative" }}>
                    <img
                      className="m-2 rounded-circle object-fit-cover"
                      src={user?.data?.photo}
                      style={{ width: `5vh`, height: `5vh` }}
                      onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                      <div
                        className="dropdown-menu show me-5"
                        style={{ position: "absolute", right: `-8vh` }}
                      >
                        <div>
                          <Link href="/find_job">
                            <button className="btn text-primary fw-bold">
                              Find Job
                            </button>
                          </Link>
                          <Link href="/profile">
                            <button className="btn text-primary fw-bold">
                              Profile
                            </button>
                          </Link>
                        </div>

                        <Link href="/candidate">
                          <button className="btn text-primary fw-bold">
                            Find Candidate
                          </button>
                        </Link>

                        <Link href="/edit_profile">
                          <button className="btn text-primary fw-bold">
                            Edit Profile
                          </button>
                        </Link>

                        <button
                          className="btn text-primary fw-bold"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <Link href="/login">
                    <button className="btn btn-outline-primary col-sm-12 col-md-auto">
                      Masuk
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="navbar-button btn btn-primary mx-3 me-0">
                      Daftar
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
