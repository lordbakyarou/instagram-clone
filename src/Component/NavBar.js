import React, { useState } from "react";

import InstagramIcon from "../assets/instagramIcon";
import { IoMdHome } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FaRegCompass } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";

import { useNavigate } from "react-router-dom";

import profilePic from "../assets/profilePic.jpg";

import { useSelector, useDispatch } from "react-redux";
import { openPost } from "../redux/features/post/postOpenSlice";

import { removeToken } from "../redux/features/token/tokenSlice";

import SearchFilters from "./SearchFilters";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const NavBar = ({ setIsPostOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);

  const [isFocused, setIsFocused] = useState(false);
  const [isProfileFocused, setIsProfileFocused] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const userInfo = useSelector((state) => state.user.userInfo);

  // console.log(userInfo, "this ishi  user");

  function handleLogout() {
    axios
      .post(
        `${URL}/user/logout`,
        {},
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        dispatch(removeToken());
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <header className="sticky top-0 bg-white z-50 relative shadow">
      <nav className="flex max-md:justify-between md:justify-between xl:gap-48 lg:gap-20 justify-center  pl-5 pr-5 top-0">
        <div
          className="brand flex justify-center items-center max-md:w-32"
          onClick={() => navigate("/dashboard")}
        >
          <InstagramIcon className="w-48 max-md:w-20" />
        </div>
        <div className="search-input flex justify-center items-center max-sm:hidden">
          <div className="input-username relative width-96 pl-5 pr-5 border rounded-lg  bg-gray-100 ">
            <IoMdSearch className="top-3 left-2 absolute text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              name="email"
              className="peer bg-gray-100 w-80 h-10 p-2 text-xs  focus:outline-none  placeholder-transparent"
              // onChange={(e) => setUserProperties(e)}
              autoComplete="off"
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchInput(e.target.value)}
              onBlur={() =>
                setTimeout(() => {
                  setIsFocused(false);
                  setSearchInput("");
                }, 300)
              }
              value={searchInput}
            />
            <label
              className="absolute
             transition-all
              left-8 top-0
               text-gray-400 
               text-xxs peer-placeholder-shown:text-xs
                peer-placeholder-shown:top-3
                pointer-events-none"
            >
              Search
            </label>
          </div>
          {isFocused && <SearchFilters searchInput={searchInput} />}
        </div>
        <div className="insta-icons flex justify-center items-center gap-3">
          <IoMdHome
            className="w-6 h-6 max-lg:hidden cursor-pointer hover:text-gray-600"
            onClick={() => navigate("/dashboard")}
          />
          {/* <AiOutlineMessage className="w-6 h-6 max-lg:hidden cursor-pointer hover:text-gray-600" /> */}
          <BiMessageSquareAdd
            className="w-6 h-6 max-md:hidden cursor-pointer hover:text-gray-600"
            onClick={() => dispatch(openPost())}
          />
          <FaRegCompass
            onClick={() => navigate("/explore")}
            className="w-6 h-6 max-md:hidden cursor-pointer hover:text-gray-600"
          />
          {/* <FaRegHeart className="w-6 h-6 max-lg:hidden cursor-pointer hover:text-gray-600" /> */}
          <div className="bg-white relative p-4 cursor-pointer">
            <img
              src={!userInfo ? profilePic : userInfo.profile}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover hover:border hover:border-light-blue"
              onClick={() => setIsProfileFocused(!isProfileFocused)}
            />
            {isProfileFocused && (
              <div
                className="w-52 h-sit  bg-white absolute rounded right-10 top-15 shadow
        "
              >
                <div
                  className="flex items-center p-2 gap-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/user/profile/${userInfo._id}`);
                    setIsProfileFocused(false);
                  }}
                >
                  <CgProfile /> <p>Profile</p>
                </div>
                <div
                  className="flex items-center p-2 gap-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/user/settings");
                    setIsProfileFocused(false);
                  }}
                >
                  <IoIosSettings /> <p>Settings</p>
                </div>
                <div className="">
                  <hr />
                </div>
                <div className="p-3 hover:bg-gray-100" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div></div>
    </header>
  );
};

export default NavBar;
