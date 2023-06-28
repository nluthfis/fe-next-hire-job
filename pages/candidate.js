import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function Job_list() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("Sort");

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowDropdown(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 5;
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, []);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(profiles.length / profilesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navbar />
      <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
        <div className="container">
          <a className="navbar-brand fs-4 text-light fw-bold ms-3" href="#">
            Candidate
          </a>
        </div>
      </nav>
      <div className="container ">
        <div className="row ">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-5 ">
            <div className="search mb-5">
              <input
                type="text"
                className="form-control form-control-lg border-primary shadow-lg bg-body-tertiary "
                aria-label="Text input with dropdown button "
                placeholder="search for any skill "
              />
              <div className="action d-inline-flex justify-content-center align-items-center">
                <div
                  className="vertical-line"
                  style={{ borderLeft: "4px solid black" }}
                ></div>

                <div className="btn-group">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {sortOption}
                  </button>

                  {showDropdown && (
                    <div className="dropdown-menu show">
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          handleSortOptionClick("Sortir Berdasar Nama")
                        }
                      >
                        Sortir berdasar nama
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleSortOptionClick("Another action")}
                      >
                        Sortir berdasar skill
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          handleSortOptionClick("Sortir berdasar lokasi")
                        }
                      >
                        Sortir berdasar lokasi
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          handleSortOptionClick("Sortir berdasar freelance")
                        }
                      >
                        Sortir berdasar freelance
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          handleSortOptionClick("Sortir berdasar fulltime")
                        }
                      >
                        Sortir berdasar fulltime
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          setShowDropdown(false);
                          setSortOption("Sort");
                        }}
                      >
                        Close
                      </a>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-primary "
                  type="button"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="card shadow-lg">
              <div className="row flex-column flex-md-row justify-content-center align-items-center text-center text-md-start gap-3">
                {currentProfiles.map((profile, index) => (
                  <div key={index} className="row align-items-center">
                    <div className="col col-md-2 text-center">
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="card-body col col-md-8">
                      <h5>{profile.name}</h5>
                      <p className="m-0 text-secondary">{profile.job}</p>
                      <div className="d-flex align-items-center justify-content-md-start justify-content-center text-md-start ">
                        <img className="me-1" src="map-pin.png" />
                        <p className="m-0 text-secondary">{profile.location}</p>
                      </div>

                      <div className="d-inline">
                        {Array.isArray(profile.skill) ? (
                          profile.skill.map((item, key) => (
                            <span
                              key={key}
                              className="badge bg-warning m-1 p-2"
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="badge bg-warning m-1 p-2">
                            {profile.skill}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col col-md-2">
                      <Link href="/profile">
                        <button className="btn btn-primary">
                          Lihat Profile
                        </button>
                      </Link>
                    </div>

                    <div>
                      <hr className="w-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-4">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  id={number}
                  onClick={handleClick}
                  className={`btn ${
                    number === currentPage
                      ? "btn-primary me-2"
                      : "btn-outline-primary me-2"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Job_list;
