import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

function Find_job() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobPerPage = 5;
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch("/api/job")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        if (data.length > 0) {
          setSelectedJob(data[0]); // Set the first job as the selected job
        }
      });
  }, []);

  const indexOfLastJob = currentPage * jobPerPage;
  const indexOfFirstJob = indexOfLastJob - jobPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / jobPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleJobClick = (job) => {
    console.log("Job clicked: ", job);
    setSelectedJob(job);
    console.log("Selected job: ", selectedJob);
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="card mt-5 mb-5">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-3 shadow-lg">
                  {currentJobs.map((job, index) => (
                    <div
                      key={index}
                      className={`row align-items-center ${
                        job === selectedJob ? "selected-job" : ""
                      }`}
                      onClick={() => handleJobClick(job)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="ms-3">
                        <p>{job.job_name}</p>
                        <p>{job.company_name}</p>
                        <p>{job.location}</p>
                      </div>
                      <hr />
                    </div>
                  ))}
                  <div>
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        id={number}
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedJob && (
                  <div className="col-9 shadow-lg" style={{ top: `-1` }}>
                    <h3 className="ms-5 mt-3">{selectedJob.job_name}</h3>
                    <h5 className="ms-5 mt-3">{selectedJob.company_name}</h5>
                    <h5 className="ms-5 mt-3">{selectedJob.location}</h5>
                    <p className="ms-5 mt-3">Full-time · Entry level</p>
                    <p className="ms-5 mt-3">
                      1,001-5,000 employees · IT Services and IT Consulting
                    </p>
                    <p className="ms-5 mt-3">{selectedJob.description}</p>
                    <p className="ms-5 mt-3">
                      About the job We are seeking a skilled and passionate Full
                      Stack Developer to join our dynamic team. As a Full Stack
                      Developer, you will be responsible for developing and
                      maintaining the server-side applications and databases
                      that power our web applications as well as its interface.
                      You will collaborate with a team of developers, designers,
                      and project managers to create innovative and efficient
                      solutions.
                    </p>
                    <ul className="ms-5 mt-3">
                      <h5>Responsibilities</h5>
                      <li>
                        Develop and maintain robust, scalable, and secure
                        backend applications using PHP, Javascript, and other
                        relevant programming languages.
                      </li>
                      <li>
                        Design and optimize databases to ensure efficient data
                        storage and retrieval.
                      </li>
                      <li>
                        Design and optimize databases to ensure efficient data
                        storage and retrieval.
                      </li>
                      <li>
                        Design and optimize databases to ensure efficient data
                        storage and retrieval.
                      </li>
                      <li>
                        Conduct thorough testing and debugging to ensure
                        high-quality software delivery.
                      </li>
                      <li>
                        Perform code reviews and provide constructive feedback
                        to fellow developers.
                      </li>
                      <li>
                        Stay up-to-date with emerging technologies and industry
                        trends, and actively participate in knowledge sharing
                        within the team.
                      </li>
                    </ul>
                    <ul className="ms-5 mt-3">
                      <h5>Requirements</h5>
                      <li>
                        Bachelors degree in Computer Science, Software
                        Engineering, or a related field.
                      </li>
                      <li>
                        Proven experience as a Backend Developer, with a strong
                        portfolio of previous projects.
                      </li>
                      <li>
                        Proficiency in PHP, JavaScript, and other relevant
                        programming languages and experience with frameworks
                        such as Laravel, Symfony, Spring, Hibernate, Reactjs,
                        Vuejs or others.
                      </li>
                      <li>
                        Proficiency in PHP, JavaScript, and other relevant
                        programming languages and experience with frameworks
                        such as Laravel, Symfony, Spring, Hibernate, Reactjs,
                        Vuejs or others.
                      </li>
                      <li>
                        Proficiency in PHP, JavaScript, and other relevant
                        programming languages and experience with frameworks
                        such as Laravel, Symfony, Spring, Hibernate, Reactjs,
                        Vuejs or others.
                      </li>
                      <li>
                        Experience with version control systems, such as Git.
                      </li>
                      <li>Familiar with SDLC.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Find_job;
