import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";

import profilePic from "../assets/profilePic.jpg";

import LazyLoadedPosts from "./LazyLoadedPosts";

import NavBar from "../Component/NavBar";
import Stories from "../Component/Stories";
import Posts from "../Component/Posts";
import Suggetions from "../Component/Suggetions";
import CreatePost from "../Component/CreatePost";
import Footer from "../Component/Footer";

import { GoHome } from "react-icons/go";

import InstagramLoading from "../Component/InstagramLoading";

import { useSelector, useDispatch } from "react-redux";

import {
  setFollowers,
  setFollowing,
  setUserInfo,
} from "../redux/features/user/userSlice";

import { openPost } from "../redux/features/post/postOpenSlice";

import UserSuggetions from "../Component/UserSuggetions";

const URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user);
  // const setFollowing = useSelector(state=> state.)

  const isPostOpen = useSelector((state) => state.postOpen);

  // console.log(isPostOpen, "is this post open");

  // console.log(userInfo, "this is user info");
  const dispatch = useDispatch();

  const [allPosts, setAllPosts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Dashboard • Instagram";
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (token) {
        try {
          const response = await axios.get(`${URL}/user/dashboard`, {
            headers: {
              token,
            },
          });
          // console.log(response.data, "hi");
          // setUser(response.data.user);
          dispatch(setUserInfo(response.data.user));
          dispatch(setFollowers(response.data.user));
          dispatch(setFollowing(response.data.user));

          // setUserId(response.data.user._id);
          // localStorage.setItem("user_id", response.data.user._id);
        } catch (err) {
          console.log(err);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      if (token) {
        try {
          const response = await axios.get(`${URL}/post/user/feed`, {
            headers: {
              token,
            },
          });
          setAllPosts([...response.data]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      } else {
      }
    }

    fetchData();
  }, [userInfo]);

  return (
    <div className="relative h-screen bg-gray-50  overflow-y-scroll max-sm:overflow-x-scroll overflow-hidden scrollbar-hide">
      {isLoading ? (
        <InstagramLoading />
      ) : (
        <div>
          {/* <NavBar setIsPostOpen={setIsPostOpen} /> */}
          <div className="flex   relative">
            <div className="w-full z-40 h-full flex justify-center">
              <div className="h-full  w-3/5 max-md:w-4/5 max-sm:w-full flex flex-col items-center">
                <Stories />

                {/* {console.log(allPosts, "all posts")} */}
                <div className="flex flex-col items-center gap-5 pb-20">
                  {allPosts && allPosts.length > 0 ? (
                    allPosts.map((post, index) => {
                      return (
                        <LazyLoadedPosts
                          post={post}
                          key={index}
                          className="flex flex-col gap-10"
                        />
                      );
                    })
                  ) : (
                    <div>
                      <div className="bg-white  shadow flex justify-center flex-col items-center gap-5 mt-5  p-5">
                        <div className="border border-black p-4 mt-5 w-fit flex justify-center items-center rounded-full">
                          <GoHome className="text-3xl" />
                        </div>
                        <p className="font-semibold">Welcome to Instagram</p>
                        <p className="w-72 text-center text-gray-500">
                          When you follow people, you'll see the photos and
                          videos they post here.
                        </p>
                      </div>
                      <UserSuggetions />
                    </div>
                  )}
                </div>
              </div>

              <Suggetions className="max-md:hidden" />
            </div>
            {isPostOpen && <CreatePost />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
