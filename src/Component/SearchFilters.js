import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import profilePic from "../assets/profilePic.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_API_URL;

const SearchFilters = ({ searchInput }) => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const [filterUsers, setFilterUsers] = useState([]);

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
        })
        .catch((err) => console.log(err));
  }, [searchInput, token]);

  return (
    <div className="absolute top-20 ">
      <div className="w-80 h-fit max-h-80 bg-white scrollbar-hide overflow-y-hidden overflow-y-scroll rounded shadow">
        {filterUsers.length > 0 &&
          filterUsers.map((user) => {
            // console.log("User ID:", user._id); // Add this line for debugging

            return (
              <div className="hover:bg-gray-100 hover:cursor-pointer">
                <div
                  className="flex items-center"
                  onClick={() => {
                    setFilterUsers([]);
                    navigate(`/user/profile/${user._id}`);
                  }}
                >
                  <div className=" p-4 cursor-pointer">
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
                <div className="w-full border border-gray-200"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchFilters;
