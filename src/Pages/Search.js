import React, { useState, useEffect } from "react";
import axios from "axios";

import InstagramIcon from "../assets/instagramIcon";
import { IoMdHome } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FaRegCompass } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import { useNavigate } from "react-router-dom";

import profilePic from "../assets/profilePic.jpg";

import { useSelector, useDispatch } from "react-redux";
import { openPost } from "../redux/features/post/postOpenSlice";

import SearchFilters from "../Component/SearchFilters";

import CreatePost from "../Component/CreatePost";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);

  const isPostOpen = useSelector((state) => state.postOpen);

  const [isFocused, setIsFocused] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [filterUsers, setFilterUsers] = useState([]);

  const userInfo = useSelector((state) => state.user.userInfo);

  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    searchInput &&
      axios
        .get(`${URL}/user/search/user?search=${searchInput}`, {
          headers: {
            token,
          },
        })
        .then((response) => {
          setFilterUsers([...response.data]);
          // console.log(response.data);
        })
        .catch((err) => console.log(err));
  }, [searchInput, token]);

  return (
    <div className="md:hidden">
      <header className="sticky bg-white top-0  z-50 relative shadow-sm">
        <nav className="flex justify-start items-center pb-3 pt-3 pl-5 pr-5 top-0">
          <div className="search-input flex justify-center items-center ">
            <div className="input-username relative width-96 pl-5 pr-5 border rounded-lg bg-gray-50   ">
              <IoMdSearch className="top-3 left-2 absolute text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                name="email"
                className="peer bg-gray-50 w-64 h-10 p-2  text-xs  focus:outline-none  placeholder-transparent"
                autoComplete="off"
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsFocused(false);
                    setSearchInput("");
                  }, 20)
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
            {/* {isFocused && (
              <SearchFilters className="w-96" searchInput={searchInput} />
            )} */}
          </div>
          <div
            className="flex  flex-1 justify-end text-lg text-gray-500"
            onClick={() => setSearchInput("asfjaslkfjksd")}
          >
            Cancel
          </div>
        </nav>
      </header>
      {isPostOpen && <CreatePost />}

      <div>
        {filterUsers.length > 0 &&
          filterUsers.map((user) => {
            // console.log("User ID:", user._id); // Add this line for debugging

            return (
              <div
                className="hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => navigate(`/user/profile/${user._id}`)}
              >
                <div className="flex items-center">
                  <div className=" p-3 cursor-pointer">
                    <img
                      src={user.profile}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-gray-500">{user.fullname}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
