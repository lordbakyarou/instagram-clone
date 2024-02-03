import React, { useEffect, useState } from "react";

import SuggetionProfile from "./SuggetionProfile";
import profilePic from "../assets/profilePic.jpg";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { BsArrowClockwise } from "react-icons/bs";

const URL = process.env.REACT_APP_API_URL;

const Suggetions = ({ user }) => {
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [userSuggetions, setUserSuggetions] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${URL}/post/follow/suggetions/`, {
        headers: {
          token,
        },
      })
      .then((response) => setUserSuggetions(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    userInfo && (
      <div className=" max-md:hidden m-5 w-72 h-96  ">
        <div className="profile">
          <div className="flex justify-between">
            <div className=" p-4 gap-3 flex items-center">
              <img
                src={userInfo.profile || profilePic}
                alt="Profile"
                className="w-10 h-10  cursor-pointer  hover:border hover:border-light-blue rounded-full"
                onClick={() => navigate(`/user/profile/${userInfo._id}`)}
              />
              {/* {console.log(user, "this is user")} */}
              <div>
                <p
                  className="text-xs font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/user/profile/${userInfo._id}`)}
                >
                  {userInfo.username}
                </p>
                <p className="text-xs text-gray-500">{userInfo.fullname}</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/user/settings")}
              className="flex items-center font-semibold p-4 text-xs text-light-blue hover:text-dark-blue"
            >
              <p className="cursor-pointer">Change</p>
            </div>
          </div>
        </div>
        <div className="suggetions">
          <div className="flex justify-between pl-5 p-2 pr-5">
            <p className="text-xs text-gray-400">Suggestions for you</p>
            <p className="text-xs font-semibold">See all</p>
          </div>
          <div className="flex flex-col mb-10 max-h-72 overflow-y-scroll overflow-hidden scrollbar">
            {userSuggetions ? (
              userSuggetions.map((user, index) => {
                return <SuggetionProfile user={user} key={index} />;
              })
            ) : (
              <div className="flex justify-center items-center">
                <BsArrowClockwise className="animate-spin text-xl text-dark-blue " />
              </div>
            )}
          </div>
        </div>
        <div
          className="footer text-xs flex text-gray-400 flex-col gap-4 pl-4 pr-4
  "
        >
          <div className="just-footer">
            Information · Help · Prisoner · API · Job · Privacity · Conditions ·
            Locations · Trending accounts · Hashtags · Language
          </div>
          <div className="actual-footer">
            © 2024 INSTAGRAM FROM LORDBAKAYAROU
          </div>
        </div>
      </div>
    )
  );
};

export default Suggetions;
