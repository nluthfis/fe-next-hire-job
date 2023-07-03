import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function Hire() {
  const { query } = useRouter();
  const id = parseInt(query?.id);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state?.hire?.data);
  const auth = useSelector((state) => state?.auth);
  const token = auth?.token;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/contact/${user?.id}`,
        {
          subject,
          description: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        router.replace(`/user/${user?.id}`);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
            <div className="card">
              <img
                src={user?.photo}
                className="rounded-circle mx-auto d-block mt-3 object-fit-cover"
                width={`100`}
                height={`100`}
                alt="card"
              />
              <div className="card-body">
                <h5 className="card-title">{user?.fullname}</h5>
                <p className="card-text">{user?.company}</p>
                <div className="card-location mb-0 d-flex">
                  <img
                    className="me-2"
                    src="/map-pin.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">{user?.domicile}</p>
                </div>

                <p className="text-muted mb-2">{user?.job_tittle}</p>
                <p className="text-muted mb-0">{user?.description}</p>
              </div>

              <h5 className="card-title ms-3 mt-5">Skills</h5>
              <div className="card-skills ms-2 ">
                <div className="d-inline ">
                  {user?.skills.map((item, key) => (
                    <span key={key} className="badge bg-warning m-1 p-2">
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
                <p className="text-muted">{user?.email}</p>
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
              <h4>Hubungi {user?.fullname}</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>

            <hr />
            <form onSubmit={handleSendMessage}>
              <div className="m-5 mt-2 mb-3">
                <label htmlFor="inputJob" className="form-label">
                  Tujuan pesan ini
                </label>
                <input
                  type="job-desk"
                  className="form-control"
                  id="inputJob"
                  placeholder="Masukan job desk"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                {/* <label htmlFor="inputName" className="form-label">
                  Nama Lengkap
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="inputName"
                  aria-describedby="name"
                  placeholder="Masukan nama lengkap"
                />

                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="domisili"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Masukan email"
                />

                <label htmlFor="inputPhoneNumber" className="form-label">
                  No Handphone
                </label>
                <input
                  type="job-place"
                  className="form-control"
                  id="inputJobPlace"
                  placeholder="Masukan no handphone"
                /> */}

                <label htmlFor="inputJodPlace" className="form-label">
                  Deskripsi Singkat
                </label>
                <textarea
                  type="text-area"
                  className="form-control"
                  id="inputJobPlace"
                  placeholder="Tuliskan deskripsi singkat"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ height: `15vh` }}
                />
                <button type="submit" className="btn btn-warning w-100 mt-4">
                  Hire
                </button>
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
