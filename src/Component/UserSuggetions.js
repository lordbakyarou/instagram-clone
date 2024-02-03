import React, { useEffect, useState } from "react";

import SuggetionProfile from "./SuggetionProfile";
import profilePic from "../assets/profilePic.jpg";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { BsArrowClockwise } from "react-icons/bs";

const URL = process.env.REACT_APP_API_URL;

const UserSuggetions = ({ user }) => {
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [userSuggetions, setUserSuggetions] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${URL}/post/user/suggetions/`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setUserSuggetions(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    userInfo && (
      <div className="md:hidden m-5 w-72 h-96  ">
        <div className="suggetions">
          <div className="flex justify-between pl-5 p-2 pr-5">
            <p className="text-md text-gray-500">Creators you can follow</p>
          </div>
          <div className="flex flex-col mb-10 max-h-72 overflow-y-scroll overflow-hidden scrollbar">
            {userSuggetions ? (
              userSuggetions.map((user) => {
                return <SuggetionProfile user={user} />;
              })
            ) : (
              <div className="flex justify-center h-full items-center">
                <BsArrowClockwise className="animate-spin text-xl text-dark-blue " />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserSuggetions;
