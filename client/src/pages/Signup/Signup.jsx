import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup} from "../../http";
import { successToast , errorToast } from "../../helper/toast";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    username: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { username, password, cpassword } = credential;
    try {
      if (password !== cpassword) {
        alert("The passwords you entered do not match.");
      } else {
        const user = await signup({ username, password });
        navigate("/login");
        successToast(user.data.message)
      }
    } catch (error) {
      if(error.response.data.error)
      {
        errorToast(error.response.data.error);
        navigate("/signup");
      }
    }
  };

  return (
    <>
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 col-lg-10">
              <div class="wrap d-md-flex">
                <div
                  class="img"
                  style={{ "background-image": "url(images/bg-1.jpg)" }}
                ></div>
                <div class="login-wrap p-4 p-md-5">
                  <div class="d-flex">
                    <div class="w-100">
                      <h3 class="mb-4">Sign Up</h3>
                    </div>
                  </div>
                  <form action="#" class="signin-form">
                    <div class="form-group mb-3">
                      <label class="label" for="name">
                        Username
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        name="username"
                        value={credential.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={credential.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="cpassword"
                        name="cpassword"
                        value={credential.cpassword}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <button
                        type="submit"
                        class="form-control btn btn-primary rounded submit px-3"
                        onClick={handleClick}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <p class="text-center">
                    Have an account? <Link to="/login">Sign in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
