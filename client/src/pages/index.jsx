import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import { verify } from "../http";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Home from "./Home/Home";
import { errorToast } from "../helper/toast";
import Cookies from "js-cookie";
import Card from "../components/Card/Card";

const Index = () => {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    (async () => {
      try {
        const res = await verify();
        if (res.status === 200) {
          setLogin(true);
        }
      } catch (error) {
        if (error.response.data.message) {
          errorToast(error.response.data.message);
        }
      }
    })();
  },[Cookies.get("jwt"),location.pathname]);

  return (
    <>
      {login ? (
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/card" element={<Card />} /> */}
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default Index;
