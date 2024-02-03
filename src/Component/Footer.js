import React from "react";

import profilePic from "../assets/profilePic.jpg";

import { IoMdHome } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FaRegCompass } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openPost } from "../redux/features/post/postOpenSlice";

const Footer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const isPostOpen = useSelector((state) => state.postOpen);

  return (
    <div className="fixed md:hidden text-2xl flex bg-gray-100 justify-center items-center gap-10  bottom-0 z-50  w-full bg-white">
      <IoMdHome onClick={() => navigate("/dashboard")} />
      <FaRegCompass onClick={() => navigate("/explore")} />
      <IoMdSearch onClick={() => navigate("/search")} />
      <BiMessageSquareAdd onClick={() => dispatch(openPost())} />
      <div className="bg-white p-4 cursor-pointer">
        <img
          src={userInfo.profile}
          alt="Profile"
          className="w-6 h-6 rounded-full object-cover"
          onClick={() => navigate(`/user/profile/${userInfo._id}`)}
        />
      </div>
    </div>
  );
};

export default Footer;
