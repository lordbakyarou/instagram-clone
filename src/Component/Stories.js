import { set } from "date-fns";
import React, { useEffect, useState } from "react";

import { MdOutlineCancel } from "react-icons/md";

import backgroundImage from "../assets/bluredImage.jpg";
import { useSelector, useDispatch } from "react-redux";

import { IoIosAddCircle } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BsArrowClockwise } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";

import { RxCross1 } from "react-icons/rx";

import { CiCamera } from "react-icons/ci";

import { onlyDate } from "../commonFunction";

import { openStory } from "../redux/features/storyOpen/storyOpenSlice";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const Stories = () => {
  const [storyClick, setStoryClick] = useState(false);

  const [image, setImage] = useState(null);

  const ifAddStoryOpen = useSelector((state) => state.storyOpen);

  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [myStory, setMyStory] = useState(null);
  const [friendsStory, setFriendsStory] = useState(null);

  const [openedUserStory, setOpenedUserStory] = useState(null);
  const [currentStory, setCurrentStory] = useState(0);

  // console.log(currentStory);

  function nextSlide() {
    // console.log(openedUserStory.stories);
    if (currentStory < openedUserStory.stories.length - 1) {
      setCurrentStory(currentStory + 1);
    }
  }

  function previousSlide() {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
    }
  }

  async function uploadPost(e) {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("file", image);

    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dj725mr8c");
    // console.log(data, "this data");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dj725mr8c/image/upload",

        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      addStory(response.data.url);

      setImage(null);
    } catch (err) {
      console.log(err);
      alert("please attach image to your story");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    axios
      .get(`${URL}/user/get/${userInfo._id}/story`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setMyStory(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/user/get/followings/stories`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setFriendsStory(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function openUserStory(data) {
    setStoryClick(!storyClick);
    setOpenedUserStory(data);
    setCurrentStory(0);
  }

  function addStory(urlOfImage) {
    axios
      .put(
        `${URL}/user/create/story`,
        {
          image: urlOfImage,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setMyStory(response.data);
        dispatch(openStory(false));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(openStory(false));
        setIsLoading(false);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`${URL}/user/delete/${id}/story`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        const filterStory = myStory.stories.filter((story) => id != story._id);

        setMyStory({ ...myStory, stories: filterStory });

        setStoryClick(!storyClick);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="h-24 w-10/12 max-sm:w-full bg-white mt-5 relative  max-sm:m-0 shadow flex flex-col items-center ">
      <div className="w-full scrollbar-hide overflow-y-scroll flex  items-center">
        <div className="bg-white ml-2 p-1 flex flex-col items-center cursor-pointer relative">
          {myStory && myStory.stories.length === 0 ? (
            <img
              src={userInfo.profile}
              alt="Profile"
              className="w-16 absolute top-2 left-2 h-16 rounded-full object-cover "
              onClick={() => dispatch(openStory(!ifAddStoryOpen))}
            />
          ) : (
            <img
              src={userInfo.profile}
              alt="Profile"
              className="w-16 absolute top-2 left-2 h-16 rounded-full object-cover "
              onClick={() => openUserStory(myStory)}
            />
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
          >
            {myStory && myStory.stories.length > 0 && (
              <circle
                cx="36"
                cy="36"
                r="34.75"
                stroke="url(#paint0_linear_2548_436)"
                stroke-width="2.5"
              />
            )}
            <defs>
              <linearGradient
                id="paint0_linear_2548_436"
                x1="79.5789"
                y1="7.57895"
                x2="2.03283e-06"
                y2="55.8947"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#C913B9" />
                <stop offset="0.500947" stop-color="#F9373F" />
                <stop offset="1" stop-color="#FECD00" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute top-12 right-1">
            {myStory && myStory.stories.length === 0 && (
              <IoMdAdd
                className="text-white bg-dark-blue border border-white hover:bg-light-blue rounded-full text-xl "
                onClick={() => dispatch(openStory(!ifAddStoryOpen))}
              />
            )}
          </div>
          <p className="text-sm text-gray-700">Your story</p>
        </div>

        {friendsStory &&
          friendsStory.stories.map((friend, index) => {
            // console.log(friend);
            return (
              friend.stories.length > 0 && (
                <div
                  className="bg-white ml-2 p-1 cursor-pointer flex flex-col items-center relative"
                  key={index}
                >
                  <img
                    src={friend.profile}
                    alt="Profile"
                    className="w-16 absolute top-2 left-2 h-16 rounded-full object-cover hover:border hover:border-light-blue"
                    onClick={() => {
                      openUserStory(friend);
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                  >
                    <circle
                      cx="36"
                      cy="36"
                      r="34.75"
                      stroke="url(#paint0_linear_2548_436)"
                      stroke-width="2.5"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2548_436"
                        x1="79.5789"
                        y1="7.57895"
                        x2="2.03283e-06"
                        y2="55.8947"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#C913B9" />
                        <stop offset="0.500947" stop-color="#F9373F" />
                        <stop offset="1" stop-color="#FECD00" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-sm text-gray-900 w-9 overflow-hidden">
                    {friend.username}
                  </p>
                </div>
              )
            );
          })}
      </div>
      {ifAddStoryOpen && (
        <div className="absolute w-96 h-post-detail  z-50 top-24 rounded-lg backdrop-blur-lg bg-black bg-opacity-50">
          <RxCross1
            className="absolute top-4 text-2xl right-1 text-white cursor-pointer"
            onClick={() => dispatch(openStory(false))}
          />
          <div className="w-full h-full flex justify-center items-center gap-4">
            <div
              className="rounded-full border border-white  p-2 "
              style={{
                background:
                  "radial-gradient(circle at 30% 150%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                color: "transparent",
                textShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
              }}
            >
              <label htmlFor="file">
                <CiCamera className="text-5xl text-white " />
              </label>

              <input
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <p
              className={`${!image ? "text-gray-500 bg-gray-300" : "text-black bg-white"} px-3 py-2 text-sm rounded cursor-pointer `}
              onClick={uploadPost}
            >
              {isLoading ? (
                <BsArrowClockwise className="animate-spin text-xl " />
              ) : (
                "Create"
              )}
            </p>
          </div>

          <div className="flex gap-2 absolute top-4 left-2 items-center">
            <img
              src={userInfo.profile}
              alt="Profile"
              className="w-9 h-9 rounded-full  object-cover hover:border hover:border-light-blue"
              // onClick={() => openUserStory(friend)}
            />
            <p className="text-white font-semibold">{userInfo.username}</p>
            <p className="text-white ">
              {/* {displayDate(openedUserStory.stories[0].createdAt)} */}
            </p>
          </div>
        </div>
      )}

      {storyClick && (
        <div className="absolute w-96 h-post-detail bg-black z-50 top-24 bg-blur rounded-lg">
          {/* {console.log(openedUserStory.stories[0].image)} */}

          <img
            src={openedUserStory && openedUserStory.stories[currentStory].image}
            className="w-full h-full object-cover rounded-lg"
            alt="User Story"
          />

          {openedUserStory._id === userInfo._id && (
            <MdOutlineDeleteForever
              className="absolute top-4 text-2xl right-10 text-white cursor-pointer"
              onClick={() =>
                handleDelete(openedUserStory.stories[currentStory]._id)
              }
            />
          )}

          <RxCross1
            className="absolute top-4 text-2xl right-1 text-white cursor-pointer"
            onClick={() => setStoryClick(!storyClick)}
          />

          <FaChevronLeft
            className="absolute top-1/2 text-2xl left-1 text-white opacity-25 hover:opacity-100 cursor-pointer"
            onClick={previousSlide}
          />

          <FaChevronRight
            className="absolute top-1/2 text-2xl right-1 text-white cursor-pointer opacity-25 hover:opacity-100"
            onClick={nextSlide}
          />

          <div className="flex absolute z-50 h-1 top-1 w-full px-2 gap-1">
            {openedUserStory.stories.map((item, index) => {
              return (
                <div
                  className={`flex-grow h-1 ${index <= currentStory ? "bg-white" : "bg-white opacity-50"}  rounded`}
                  key={index}
                ></div>
              );
            })}
          </div>

          <div className="flex gap-2 absolute top-4 left-2 items-center">
            <img
              src={openedUserStory.profile}
              alt="Profile"
              className="w-9 h-9 cursor-pointer  rounded-full object-cover "
              // onClick={() => openUserStory(friend)}
              onClick={() => {
                if (openedUserStory._id === userInfo._id) {
                  dispatch(openStory(!ifAddStoryOpen));
                  setStoryClick(false);
                } else {
                  navigate(`/user/profile/${openedUserStory._id}`);
                }
              }}
            />
            {myStory && openedUserStory._id === userInfo._id && (
              <IoMdAdd
                className="text-white left-7 top-4 absolute bg-dark-blue border border-white hover:bg-light-blue rounded-full text-xs "
                onClick={() => {
                  dispatch(openStory(!ifAddStoryOpen));
                  setStoryClick(false);
                }}
              />
            )}
            <p className="text-white font-semibold">
              {openedUserStory.username}
            </p>
            <p className="text-white ">
              {onlyDate(openedUserStory.stories[currentStory].createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
