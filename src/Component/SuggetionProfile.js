import React, { useState } from "react";

import axios from "axios";

import profilePic from "../assets/profilePic.jpg";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  setFollowers,
  addRemoveFollowing,
  setUserInfo,
} from "../redux/features/user/userSlice";

const URL = process.env.REACT_APP_API_URL;

const SuggetionProfile = ({ user }) => {
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [follow, setFollow] = useState(false);

  const navigate = useNavigate();

  function handleFollow(e) {
    // console.log(user._id);
    e.preventDefault();

    axios
      .put(
        `${URL}/post/${user._id}/follow/`,
        {},
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        dispatch(addRemoveFollowing(user._id));

        setFollow(!follow);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="profile">
      <div className="flex justify-between ">
        <div className=" pl-4 pr-4 gap-3 flex items-center">
          <img
            src={user.profile || profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full hover:border hover:border-light-blue cursor-pointer"
            onClick={() => navigate(`/user/profile/${user._id}`)}
          />
          <div>
            <p
              className="text-xs font-semibold hover:underline cursor-pointer"
              onClick={() => navigate(`/user/profile/${user._id}`)}
            >
              {user.username}
            </p>
            <p className="text-xs text-gray-400">Suggestions for you</p>
          </div>
        </div>
        <div className="flex items-center font-semibold p-4  text-xs text-light-blue hover:text-dark-blue">
          <p className="cursor-pointer " onClick={(e) => handleFollow(e)}>
            {follow ? "Unfollow" : "Follow"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuggetionProfile;
