import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { batch } from "react-redux";

import NavBar from "../Component/NavBar";

import { IoIosSettings } from "react-icons/io";

import { MdOutlineGridOn } from "react-icons/md";

import { MdOutlineCancel } from "react-icons/md";

import profilePic from "../assets/profilePic.jpg";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import CreatePost from "../Component/CreatePost";

import instagramLoading from "../assets/instagramLoading.png";

import { BsArrowClockwise } from "react-icons/bs";

import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";

import { openPost } from "../redux/features/post/postOpenSlice";

import {
  setFollowers,
  setFollowing,
  setUserInfo,
  addRemoveFollowing,
} from "../redux/features/user/userSlice";
import UserFollowings from "../Component/UserFollowings";
import UserFollowers from "../Component/UserFollowers";

import InstagramIcon from "../assets/instagramIcon";
import { CiCamera } from "react-icons/ci";
import InstagramLoading from "../Component/InstagramLoading";

const URL = process.env.REACT_APP_API_URL;

const UserProfile = () => {
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);
  const following = useSelector((state) => state.user.following);

  const [isLoading, setIsLoading] = useState(false);

  const [followingMenu, setFollowingMenu] = useState(false);
  const [followerMenu, setfollowerMenu] = useState(false);

  const dispatch = useDispatch();

  const isPostOpen = useSelector((state) => state.postOpen);

  const { id } = useParams();

  const [follow, setFollow] = useState(false);

  useEffect(() => {
    setFollow(following.includes(id));
    // console.log(following, id);
  }, [id]);

  const [followingResults, setFollowingResults] = useState([]);
  const [followerResults, setFollowerResults] = useState([]);

  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  useEffect(() => {
    axios
      .post(
        `${URL}/post/all/post/by/user`,
        {
          id,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        setSelectedUserProfile(response.data);
        setIsCurrentUser(userInfo._id === id);
      })
      .catch((err) => console.log(err));
  }, [id, follow]);

  // console.log(selectedUserProfile);

  function getFollowings() {
    setIsLoading(true);
    setFollowingMenu(!followingMenu);

    axios
      .post(
        `${URL}/user/following/detail`,
        { id },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        setFollowingResults(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function getFollowers() {
    setIsLoading(true);

    setfollowerMenu(!followerMenu);

    axios
      .post(
        `${URL}/user/follower/detail`,
        { id },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        setFollowerResults(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  // console.log(followerResults, "this is followerresutls");
  // console.log(followingResults, "this is following restulst");

  const navigate = useNavigate();

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  // console.log(userInfo.following.includes(id));

  // console.log(userInfo);

  // console.log(follow, "follow");

  function handleFollow() {
    axios
      .put(
        `${URL}/post/${selectedUserProfile._id}/follow/`,
        {},
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        setFollow(!follow);
        dispatch(addRemoveFollowing(selectedUserProfile._id));
      })
      .catch((err) => console.log(err));
  }

  return selectedUserProfile ? (
    <div>
      {isPostOpen && <CreatePost />}
      <div className="main-div flex relative items-center flex-col bg-gray-50 h-screen pt-10 max-sm:scrollbar-hide max-sm:overflow-y-scroll w-screen">
        <div className="profile-div max-sm:w-96 flex justify-center items-center">
          <div className="img-div">
            <div className="bg-gray-50 p-4 cursor-pointer">
              <img
                src={selectedUserProfile.profile || profilePic}
                alt="Profile"
                className="w-36 h-36  max-sm:w-24 max-sm:h-24 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="user-detail-div flex flex-col gap-5  max-sm:gap-1 justify-center">
            <div className="upper flex  items-center gap-5 ">
              <p className="font-semibold text-2xl  max-md:text-lg">
                {selectedUserProfile.username}
              </p>
              {isCurrentUser ? (
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => navigate("/user/settings")}
                    className="text-sm max-md:text-xs font-semibold flex items-center border rounded p-1 bg-white"
                  >
                    Edit profile
                  </button>
                  <IoIosSettings
                    onClick={() => navigate("/user/settings")}
                    className="text-xl cursor-pointer"
                  />
                </div>
              ) : (
                <div>
                  {follow ? (
                    <button
                      onClick={() => handleFollow()}
                      className="text-sm  max-md:text-xs font-semibold flex items-center border border-gray-300 rounded-md px-4 p-1 bg-white text-black"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow()}
                      className="text-sm  max-md:text-xs font-semibold flex items-center border rounded-md px-4 p-1 bg-dark-blue text-white"
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mid items-center flex gap-3 font-semibold  max-md:text-sm">
              <p>{selectedUserProfile.post.length} posts</p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  getFollowers();
                  setFollowingMenu(false);
                }}
              >
                {selectedUserProfile.followers.length} followers
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  getFollowings();
                  setfollowerMenu(false);
                }}
              >
                {selectedUserProfile.followings.length} following
              </p>
            </div>
            <div className="description">
              <p className="font-semibold text-lg  max-md:text-sm">
                {selectedUserProfile.fullname}
              </p>
              <p className="italic flex flex-col  text-sm  max-md:text-xs">
                {selectedUserProfile.description}
              </p>
            </div>
          </div>
        </div>
        {followingMenu && (
          <div className="absolute border bg-cover top-36 w-96 bg-white z-50  ">
            <div className="relative">
              <MdOutlineCancel
                className="absolute top-1 text-2xl right-1 text-black cursor-pointer"
                onClick={() => {
                  setFollowingMenu(!followingMenu);
                  setfollowerMenu(false);
                }}
              />
            </div>
            {isLoading ? (
              <div className="h-96 flex justify-center items-center">
                <BsArrowClockwise className="animate-spin text-xl text-dark-blue" />
              </div>
            ) : (
              <UserFollowings
                followingResults={followingResults}
                setFollowingMenu={setFollowingMenu}
              />
            )}
          </div>
        )}

        {followerMenu && (
          <div className="absolute border bg-cover top-36 w-96 bg-white z-50  ">
            <div className="relative">
              <MdOutlineCancel
                className="absolute top-1 text-2xl right-1 text-black cursor-pointer"
                onClick={() => {
                  setfollowerMenu(!followerMenu);
                }}
              />
            </div>

            {isLoading ? (
              <div className="h-96 flex justify-center items-center">
                <BsArrowClockwise className="animate-spin text-xl text-dark-blue" />
              </div>
            ) : (
              <UserFollowers
                followerResults={followerResults}
                setfollowerMenu={setfollowerMenu}
              />
            )}
          </div>
        )}

        <div className="post-div flex flex-col items-center justify-center pt-10">
          <div className="post-header w-full flex-col flex items-center">
            <div className="w-8/12 border h-0 bg-gray-200 flex justify-center">
              <div className="w-20 border border-black"></div>
            </div>
            <div className="flex justify-center pt-8 gap-2 items-center">
              <MdOutlineGridOn className="text-lg" />
              <p className="font-semibold text-lg max-sm:text-sm">POST</p>
            </div>
          </div>
          {selectedUserProfile.post.length > 0 ? (
            <div className="posts max-sm:scrollbar-hide max-sm:overflow-y-scroll max-sm:w-96">
              <div className="container max-w-user-profile mx-auto p-10 max-lg:p-4">
                <div className="grid grid-cols-3 gap-4">
                  {selectedUserProfile.post.map((post, index) => {
                    return (
                      <div
                        className="bg-white flex  items-center justify-center group shadow cursor-pointer relative"
                        key={index}
                      >
                        <img
                          src={post.image}
                          alt="Post Image"
                          className="w-full h-full object-cover"
                          onClick={() => navigate(`/post/detail/${post._id}`)}
                        />
                        <div className="absolute max-sm:text-xs max-sm:gap-1 flex gap-10 items-center opacity-0 group-hover:opacity-100 justify-center">
                          <div className="flex items-center gap-5">
                            <FaHeart className="text-white" />
                            <p className="text-white font-semibold">
                              {post.likes.length}
                            </p>
                          </div>
                          <div className="flex items-center gap-5">
                            <FaComment className="text-white" />
                            <p className="text-white ">
                              {post.comments.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className=" flex justify-center flex-col items-center gap-5 mt-5  p-5">
                <div className="border border-black p-4 mt-5 w-fit flex justify-center items-center rounded-full">
                  <CiCamera className="text-6xl" />
                </div>
                <p className="font-semibold text-2xl">No Post Yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <InstagramLoading />
  );
};

export default UserProfile;
