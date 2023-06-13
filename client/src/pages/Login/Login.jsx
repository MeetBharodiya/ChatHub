import React, { useState , useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { login } from "../../http";
import Cookies from 'js-cookie';
import "./Login.css";
import { successToast , errorToast } from "../../helper/toast";

const Login = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  useEffect(()=>{
    if(Cookies.get('jwt')){
      navigate('/')
    }
  },[])

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { username, password } = cred;
    try {
      const user = await login({ username, password });
      if(user?.data?.token)
      {
        let d = new Date();
        d.setTime(d.getTime()+(30*30*60*1000));
        Cookies.set("jwt",user.data.token,{expires:d,path:"/"});
        successToast(user.data.message);
        navigate("/");
      }
    } catch (error) {
      errorToast(error.response.data.error)
      console.log("error from login", error);
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
                      <h3 class="mb-4">Sign In</h3>
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
                        value={cred.username}
                        onChange={handleChange}
                        placeholder="Username"
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
                        value={cred.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <button
                        type="submit"
                        onClick={handleClick}
                        class="form-control btn btn-primary rounded submit px-3"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <p class="text-center">
                    Not a member? <Link to="/signup">Sign Up</Link>
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

export default Login;
