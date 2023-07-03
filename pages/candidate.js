import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
import { storeJob } from "@/store/reducers/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
function Job_list() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("Sort");
  const dispatch = useDispatch();
  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowDropdown(false);
  };
  const [pageStart, setPageStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const user = useSelector((state) => state?.user?.data);
  const auth = useSelector((state) => state?.auth);

  useEffect(() => {
    if (auth.token === null) {
      router.replace("/login");
    }
  }, [auth.status]);
  const removeData = (data, id) => {
    return data.filter((obj) => obj.id !== id);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/job?page=${currentPage}`)
      .then((response) => {
        const lastData = removeData(response?.data?.data?.rows, user?.id);
        setProfiles(lastData);
        setTotalPages(response?.data?.data?.total_page);
        dispatch(storeJob(response?.data?.data?.rows));
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (currentPage % 5 === 0) {
        setPageStart(pageStart + 5);
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % 5 === 0) {
        setPageStart(pageStart - 5);
      }
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navbar />
      <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
        <div className="container">
          <a className="navbar-brand fs-4 text-light fw-bold ms-3">Candidate</a>
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

            {profiles.map((profile, index) => (
              <div className="card shadow-lg" key={index}>
                <div className="row align-items-center mt-3 mb-3 ms-3">
                  <div className="col-12 col-md-2 text-center">
                    <img
                      src={profile.photo}
                      alt="profile"
                      className="img-fluid rounded-circle object-fit-cover"
                      style={{ width: `20vh`, height: `20vh` }}
                    />
                  </div>
                  <div className="col-12 col-md-8 text-center text-md-start text-lg-start">
                    <h5>{profile.fullname}</h5>
                    <p className="m-0 text-secondary">{profile.job_title}</p>
                    <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                      <img className="me-1" src="map-pin.png" alt="location" />
                      <p className="m-0 text-secondary">{profile.domicile}</p>
                    </div>
                    <div>
                      {Array.isArray(profile.skills) ? (
                        profile.skills.map((skill, key) => (
                          <span key={key} className="badge bg-warning m-1 p-2">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-warning m-1 p-2">
                          {profile.skills}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-2 text-center text-md-right mt-sm-3 mt-xs-3">
                    <Link href={`/user/${profile.id}`}>
                      <button className="btn btn-primary">Lihat Profile</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-center mt-4 mb-4">
              <button
                className="btn btn-outline-primary me-3"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {pageNumbers.slice(pageStart, pageStart + 5).map((number) => (
                <div className="m-1">
                  <button
                    className={`btn ${
                      number === currentPage
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    key={number}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </div>
              ))}
              <button
                className="btn btn-outline-primary ms-3"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Job_list;
