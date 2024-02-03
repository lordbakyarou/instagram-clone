import React from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  setFollowers,
  setFollowing,
  setUserInfo,
  addRemoveFollowing,
} from "../redux/features/user/userSlice";

import axios from "axios";

const UserFollowings = ({ followingResults, setFollowingMenu }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);

  const following = useSelector((state) => state.user.following);
  const userInfo = useSelector((state) => state.user.userInfo);

  const URL = process.env.REACT_APP_API_URL;

  function handleFollow(userId) {
    axios
      .put(
        `${URL}/post/${userId}/follow/`,
        {},
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        // setFollow(!follow);
        // console.log(userId);
        dispatch(addRemoveFollowing(userId));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full h-fit max-h-80 scrollbar-hide overflow-y-scroll flex flex-col mt-10 pl-1">
      {followingResults.length > 0 &&
        followingResults.map((user, index) => {
          return (
            <div
              className="hover:bg-gray-100 flex justify-between items-center pr-1 hover:cursor-pointer"
              key={index}
            >
              <div className="flex items-center">
                <div
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    navigate(`/user/profile/${user._id}`);
                    setFollowingMenu(false);
                  }}
                >
                  <img
                    src={user.profile}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div
                  onClick={() => {
                    navigate(`/user/profile/${user._id}`);
                    setFollowingMenu();
                  }}
                >
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-gray-500">{user.fullname}</p>
                </div>
              </div>
              {user._id === userInfo._id ? (
                <div className="w-20 h-7 font-semibold border rounded flex justify-center justify-self-end items-center">
                  You
                </div>
              ) : following.includes(user._id) ? (
                <div
                  onClick={() => {
                    // console.log(user._id);
                    handleFollow(user._id);
                  }}
                  className="w-20 h-7 font-semibold border rounded flex justify-center justify-self-end items-center"
                >
                  Unfollow
                </div>
              ) : (
                <div
                  className="w-20 text-white h-7 font-semibold border bg-dark-blue rounded flex justify-center justify-self-end items-center"
                  onClick={() => {
                    // console.log(user._id);
                    handleFollow(user._id);
                  }}
                >
                  Follow
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default UserFollowings;
