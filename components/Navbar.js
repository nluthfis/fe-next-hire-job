import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [token, setToken] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsAuthenticated(!!storedToken);
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setToken(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
            <button
              type="button"
              className={`navbar-toggler ${isNavCollapsed ? "collapsed" : ""}`}
              onClick={handleNavCollapse}
              aria-expanded={!isNavCollapsed}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`navbar-collapse ${isNavCollapsed ? "collapse" : ""}`}
              id="navbarCollapse"
            >
              <div className="navbar-nav ms-auto">
                {isAuthenticated ? (
                  <div className="d-flex align-items-center">
                    <img
                      className="m-2"
                      src="mail.png"
                      style={{ width: `3vh`, height: `3vh` }}
                    />
                    <img
                      className="m-2"
                      src="bell.png"
                      style={{ width: `3vh`, height: `3vh` }}
                    />
                    <div style={{ position: "relative" }}>
                      <img
                        className="m-2"
                        src="msk.png"
                        style={{ width: `3vh`, height: `3vh` }}
                        onClick={toggleDropdown}
                      />
                      {dropdownOpen && (
                        <div
                          className="dropdown-menu show me-5"
                          style={{ position: "absolute", right: `-8vh` }}
                        >
                          {token === "123" && (
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
                          )}
                          {token === "456" && (
                            <Link href="/candidate">
                              <button className="btn text-primary fw-bold">
                                Find Candidate
                              </button>
                            </Link>
                          )}
                          <Link href="/edit_profile">
                            <button className="btn text-primary fw-bold">
                              Edit Profile
                            </button>
                          </Link>
                          <Link href="#">
                            <button
                              className="btn text-primary fw-bold"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </Link>
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
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
