import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
import { storeJob } from "@/store/reducers/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons";

function Job_list(props) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("Sort");
  const sortOptions = ["Nama", "Skill", "Lokasi"];
  const dispatch = useDispatch();
  // this will be used when using api per pages
  // const [pageStart, setPageStart] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const [profiles, setProfiles] = useState([]);

  //this will be used to store the api data in redux
  const user = useSelector((state) => state?.user?.data);
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    if (auth.token === null) {
      router.replace("/login");
    }
  }, [auth.status]);

  // server rendering code here
  const [data, setData] = React.useState(props?.request?.data);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [firstPageInSet, setFirstPageInSet] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowDropdown(false);

    // Filter the data based on the selected option and search text
    let sortedData = [];
    if (option === "Nama") {
      sortedData = data.filter(
        (item) =>
          item.fullname.toLowerCase().includes(searchText.toLowerCase()) &&
          item.id !== user?.id
      );
      // Update the filtered data
      setFilteredData(sortedData);
    } else if (option === "Skill") {
      sortedData = data.filter((item) =>
        item.skills.some(
          (skill) =>
            skill.toLowerCase().includes(searchText.toLowerCase()) &&
            item.id !== user?.id
        )
      );
      // Update the filtered data
      setFilteredData(sortedData);
    }
  };
  const itemsPerPage = 5;

  const profiles = filteredData
    .filter((item) => item.id !== user?.id)
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      if ((currentPage + 1) % 5 === 0) {
        setFirstPageInSet(firstPageInSet + 5);
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (currentPage % 5 === 0) {
        setFirstPageInSet(firstPageInSet - 5);
      }
    }
  };

  // const filteredProfiles = profiles.filter((profile) =>
  //   profile.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const removeData = (data, id) => {
  //   return data.filter((obj) => obj.id !== id);
  // };

  //
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/job?page=${currentPage}`)
  //     .then((response) => {
  //       const lastData = removeData(response?.data?.data?.rows, user?.id);
  //       setProfiles(lastData);
  //       setTotalPages(response?.data?.data?.total_page);
  //       dispatch(storeJob(response?.data?.data?.rows));
  //     })
  //     .catch((error) => console.error(error));
  // }, [currentPage]);

  // const handleNext = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //     if (currentPage % 5 === 0) {
  //       setPageStart(pageStart + 5);
  //     }
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //     if ((currentPage - 1) % 5 === 0) {
  //       setPageStart(pageStart - 5);
  //     }
  //   }
  // };

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

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
                value={searchText}
                onChange={handleSearchInputChange}
              />
              <div className="action d-inline-flex justify-content-center align-items-center ms-2 me-2">
                <div
                  className="vertical-line"
                  style={{ borderLeft: "4px solid black" }}
                ></div>

                <div className="btn-group ms-2 me-2">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {sortOption}
                  </button>

                  {showDropdown && (
                    <div className="dropdown-menu show">
                      {sortOptions.map((option, index) => (
                        <div key={index}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleSortOptionClick(option)}
                          >
                            {option}
                          </a>
                        </div>
                      ))}
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          setShowDropdown(false);
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
                  onClick={() => handleSortOptionClick(sortOption)}
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
                      src={profile?.photo || "/default_photo.jpg"}
                      alt="profile"
                      className="img-fluid rounded-circle object-fit-cover"
                      style={{ width: `20vh`, height: `20vh` }}
                    />
                  </div>
                  <div className="col-12 col-md-8 text-center text-md-start text-lg-start">
                    <h5>
                      {profile?.fullname
                        ? profile?.fullname.charAt(0).toUpperCase() +
                          profile?.fullname.slice(1)
                        : "Nama tidak tersedia"}
                    </h5>

                    <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                      <FontAwesomeIcon icon={faSuitcaseRolling} />
                      <p className="m-0 ms-2 text-secondary">
                        {profile?.job_title && profile.job_title !== "-"
                          ? profile.job_title
                          : "Job title tidak tersedia"}
                      </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className="m-0 ms-2 text-secondary">
                        {profile?.domicile && profile.domicile !== "-"
                          ? profile.domicile
                          : "Domisili tidak tersedia"}
                      </p>
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
                    {/* this when in user page want to use the redux data */}
                    <Link href={`/user/${profile.id}`}>
                      <button className="btn btn-primary">Lihat Profile</button>
                    </Link>
                    {/* this when use the next router */}
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center mt-4 mb-4">
              <button
                className="btn btn-outline-primary "
                onClick={handlePrev}
                disabled={currentPage === 0} // Disable 'Prev' button on the first page
              >
                Prev
              </button>
              {[...Array(5)].map((_, i) => {
                const pageNumber = firstPageInSet + i;
                if (pageNumber < totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`btn ${
                        currentPage === pageNumber
                          ? "btn-primary ms-2"
                          : "btn-outline-primary ms-2"
                      }`}
                    >
                      {pageNumber + 1}
                    </button>
                  );
                }
                return null;
              })}
              <button
                className="btn btn-outline-primary ms-2"
                onClick={handleNext}
                disabled={currentPage === totalPages - 1} // Disable 'Next' button on the last page
              >
                Next
              </button>
            </div>

            {/* this pagination code whill be used when using the useEffect to load the data */}
            {/* <div className="d-flex justify-content-center mt-4 mb-4">
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
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
//server side rendering
export async function getServerSideProps() {
  const request = await axios
    .get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/job/all`)
    .then((res) => res.data);

  // Pass data to the page via props
  return { props: { request } };
}

export default Job_list;
