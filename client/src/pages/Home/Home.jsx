import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import Card from "../../components/Card/Card";
import "./Home.css";
import { chat } from "../../http";
import { errorToast, successToast } from "../../helper/toast";

const Home = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const hanldeOnclick = async (e) => {
    e.preventDefault();
    try {
      const response = await chat({ message: question });
      if (response.status === 200 && response.data.message) {
        errorToast(response.data.message);
      }
      // if(response.status===200)
      // {
      //   response.data.map((item)=>{
      //     return(
      //       <Card data="hello"/>
      //     )
      //   })
      // }
      // <Card data="hello" />;
      // console.log("response", response.data);
    } catch (error) {
      if (error.response.data.message) {
        errorToast(error.response.data.message);
      }
      navigate("/login");
    }
  };

  const handleOnchange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleNweChatOnClick = () => {
    setQuestion("");
  };

  return (
    <>
      <div className="chat-app">
        {/* <div className="sidebar">
          <button className="new-chat-btn" onClick={handleNweChatOnClick}>
            + New Chat
          </button>
        </div> */}
        <div className="chat-container">
          {/* <div className="chat"> */}
            <Card />
          {/* </div> */}
          <div className="input-container">
            <input
              type="text"
              className="input"
              id="input"
              name="input"
              onChange={handleOnchange}
              placeholder="Type your message..."
            />
            <button className="send-btn" onClick={hanldeOnclick}>
              <IoIosSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
