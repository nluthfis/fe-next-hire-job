import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Hire() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
            <div className="card">
              <img
                src="/pp2.jpg"
                className="rounded-circle mx-auto d-block mt-3"
                width={`100`}
                height={`100`}
                alt="card"
              />
              <div className="card-body">
                <h5 className="card-title">Louis Tomlinson</h5>
                <p className="card-text">web developer</p>
                <div className="card-location mb-0 d-flex">
                  <img
                    className="me-2"
                    src="/map-pin.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">Purwokerto, Jawa Tengah</p>
                </div>

                <p className="text-muted mb-2">Freelancer</p>
                <p className="text-muted mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum erat orci, mollis nec gravida sed, ornare quis
                  urna. Curabitur eu lacus fringilla, vestibulum risus at.
                </p>
              </div>

              <h5 className="card-title ms-3 mt-5">Skills</h5>
              <div className="card-skills ms-2 ">
                <div className="d-inline ">
                  {[
                    "Phyton",
                    "Laravel",
                    "Golang",
                    "Javascript",
                    "Php",
                    "Html",
                    "C++",
                    "Kotlin",
                    "Swift",
                    "Ruby",
                    "Rust",
                    "Javascript",
                    "Express",
                  ].map((item, key) => (
                    <span key={key} class="badge bg-warning m-1 p-2 ">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-location mb-0 ms-3 mt-5 d-flex">
                <img
                  className="me-2"
                  src="/mail.png"
                  width={`20`}
                  height={`20`}
                />
                <p className="text-muted">Louistommo@gmail.com</p>
              </div>
              <div className="card-location mb-0 ms-3 d-flex">
                <img
                  className="me-2"
                  src="/instagram.png"
                  width={`20`}
                  height={`20`}
                />
                <p className="text-muted">@Louist91</p>
              </div>
              <div className="card-location mb-0 ms-3 d-flex">
                <img
                  className="me-2"
                  src="/github.png"
                  width={`20`}
                  height={`20`}
                />
                <p className="text-muted">@Louistommo</p>
              </div>
              <div className="card-location mb-5 ms-3 d-flex">
                <img
                  className="me-2"
                  src="/gitlab.png"
                  width={`20`}
                  height={`20`}
                />
                <p className="text-muted">@Louistommo91</p>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-lg-9 col-xs-12 col-sm-12">
            <div className="ms-5">
              <h4>Hubungi Lous Tomlinson</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>

            <hr />
            <form>
              <div class="m-5 mt-2 mb-3">
                <label for="inputJob" class="form-label">
                  Tujuan pesan ini
                </label>
                <input
                  type="job-desk"
                  class="form-control"
                  id="inputJob"
                  placeholder="Masukan job desk"
                />

                <label for="inputName" class="form-label">
                  Nama Lengkap
                </label>
                <input
                  type="name"
                  class="form-control"
                  id="inputName"
                  aria-describedby="name"
                  placeholder="Masukan nama lengkap"
                />

                <label for="inputEmail" class="form-label">
                  Email
                </label>
                <input
                  type="domisili"
                  class="form-control"
                  id="inputEmail"
                  placeholder="Masukan email"
                />

                <label for="inputPhoneNumber" class="form-label">
                  No Handphone
                </label>
                <input
                  type="job-place"
                  class="form-control"
                  id="inputJobPlace"
                  placeholder="Masukan no handphone"
                />

                <label for="inputJodPlace" class="form-label">
                  Deskripsi Singkat
                </label>
                <textarea
                  type="text-area"
                  class="form-control"
                  id="inputJobPlace"
                  placeholder="Tuliskan deskripsi singkat"
                  style={{ height: `15vh` }}
                />
                <button className="btn btn-warning w-100 mt-4">Hire</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Hire;
