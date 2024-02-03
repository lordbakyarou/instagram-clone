import React, { useEffect, useState } from "react";

import Comment from "./Comment";

import { BsSend } from "react-icons/bs";

import profilePic from "../assets/profilePic.jpg";

import { IoMdHome } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { IoMdSearch } from "react-icons/io";

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

import { BsThreeDots } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";

import { LazyLoadImage } from "react-lazy-load-image-component";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { displayDate } from "../commonFunction"; // Adjust the path based on your project structure

const URL = process.env.REACT_APP_API_URL;

const Posts = ({ post, userId }) => {
  const [showFullText, setShowFullText] = useState(false);

  const [onHold, setOnHold] = useState(true);

  // console.log(post);

  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isPostDeletable, setIsPostDeletable] = useState(
    post.user._id === userInfo._id
  );

  const [isDeleteFocused, setIsDeleteFocused] = useState(false);

  const navigate = useNavigate();

  const [onClickOrHold, setOnClickOrHold] = useState(false);

  const [holdTimeout, setHoldTimeout] = useState(null);

  function handleHold() {
    const timeout = setTimeout(() => {
      setOnHold(false);
    }, 1000);

    setHoldTimeout(timeout);
  }

  function handleMouseUp(e) {
    e.preventDefault();
    clearTimeout(holdTimeout);
    setHoldTimeout(null);
    if (holdTimeout === null) {
      navigate(`/post/detail/${post._id}`);
    }
    setOnHold(true);
  }

  const [likes, setLikes] = useState(post.likes.length);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.comments.length);

  const [updateComments, setUpdateComments] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [showComments, setShowComments] = useState(false);

  let isThisVisible = false;

  function deletePost() {
    setIsDeleteFocused(false);
    axios
      .delete(`${URL}/post/${post._id}/delete`, {
        headers: {
          token,
        },
      })
      .then((response) => {})
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // console.log(post, userInfo._id);
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i] === userInfo._id) {
        setIsLiked(true);
        // console.log(post.likes[i], userInfo._id, "post userId");
      }
    }

    for (let i = 0; i < post.bookmarks.length; i++) {
      if (post.bookmarks[i] === userInfo._id) {
        setIsBookmarked(true);
      }
    }
  }, [post]);

  useEffect(() => {
    getComment(post._id);
  }, [commentCount]);

  function postComment(postId) {
    setComment("");
    axios
      .put(
        `${URL}/post/comment/post`,
        {
          postid: post._id,
          comment: comment,
          profile: "post.profile",
        },
        {
          headers: {
            token, // Use the token variable here
          },
        }
      )
      .then((response) => {
        setCommentCount(response.data.comments.length);
        setComment("");
        // console.log(response.data, "postCOmment");
        // setUpdateComments(response.data);
        getComment(postId);
      })
      .catch((err) => console.log(err));

    // console.log(post, "postId");
  }

  function getComment(postId) {
    axios
      .get(`${URL}/post/get/comment/${postId}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setUpdateComments(response.data);
        // console.log(response.data, "this si comment data");
      })
      .catch((err) => console.log(err, "is this the error"));
  }

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  function likeDislike(id) {
    axios
      .put(`${URL}/post/${id}/like`, null, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setLikes(response.data.likes);
        // console.log(isLiked);
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  }

  function bookmarked(id) {
    axios
      .put(`${URL}/post/${id}/bookmark`, null, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setIsBookmarked(!isBookmarked);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  // console.log(post, "postypost");

  return (
    <div className="w-10/12 max-sm:w-screen max-sm:m-0 bg-white m-5 shadow">
      <div className="flex shadow justify-between">
        <div className="bg-white p-4 gap-3  cursor-pointer flex items-center">
          <img
            src={post.user.profile}
            alt="Profile"
            className="w-8 h-8 rounded-full hover:border hover:border-light-blue"
            onClick={() => navigate(`/user/profile/${post.user._id}`)}
          />
          <p
            className="text-sm font-semibold hover:underline"
            onClick={() => navigate(`/user/profile/${post.user._id}`)}
          >
            {post.user.username}
          </p>
        </div>
        <div className="flex items-center p-4 relative cursor-pointer">
          <BsThreeDots
            onClick={() => {
              setIsDeleteFocused(!isDeleteFocused);
              // console.log(isPostDeletable, isDeleteFocused, "click");
            }}
          />
          {isPostDeletable && isDeleteFocused && (
            <div
              className="w-fit h-sit bg-white absolute rounded top-12 right-1 border z-50
        "
              onClick={() => deletePost()}
            >
              <div className="flex items-center p-2 gap-2 hover:bg-gray-100">
                <MdOutlineDeleteForever /> <p>Delete</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="w-full max-h-custom relative flex justify-center items-center "
        onClick={() => navigate(`/post/detail/${post._id}`)}
      >
        <img
          src={post.image}
          // loading="lazy"
          className={`${onHold ? "w-full" : ""} max-h-custom object-cover`}
          alt="Your Image Alt Text"
          onMouseDown={() => handleHold()}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className="h-fit pb-5 shadow">
        <div className="post-icons flex gap-3 p-2.5">
          {isLiked ? (
            <FaHeart
              className="cursor-pointer"
              style={{
                fill: "red",
                stroke: "red",
              }}
              onClick={() => likeDislike(post._id)}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer"
              onClick={() => likeDislike(post._id)}
            />
          )}
          <FiMessageCircle className="cursor-pointer" />
          <BsSend className="cursor-pointer" />
          <div className="flex flex-1 justify-end">
            {isBookmarked ? (
              <FaBookmark
                className="flex cursor-pointer"
                style={{
                  fill: "skyblue",
                  stoke: "black",
                }}
                onClick={() => bookmarked(post._id)}
              />
            ) : (
              <FaRegBookmark
                className="flex cursor-pointer"
                onClick={() => bookmarked(post._id)}
              />
            )}
          </div>
        </div>
        <div className="flex pl-2.5 text-sm font-semibold">
          <p>{likes} likes</p>
        </div>
        <div className="flex pl-2.5 pr-2.5 flex-col gap-1 ">
          <p className="text-sm overflow-ellipsis overflow-hidden h-10">
            <span className="font-semibold">{post.user.username} </span>
            {post.title}
          </p>
          <p
            className="text-sm text-gray-400 cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          >
            See {commentCount} comments
          </p>
          {showComments && (
            <div>
              <Comment comments={updateComments} />
              {/* {console.log(updateComments, "this is updatedcomment")} */}
            </div>
          )}

          <p className="text-xs text-gray-400">
            {displayDate(post.createdAt || "2024-01-20T23:24:40.463+00:00")}
          </p>
        </div>
      </div>
      <div className="flex p-2.5 gap-3 items-center text-sm">
        <BsEmojiSmileUpsideDown />
        <input
          className="outline-none w-full"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <div
          className="flex flex-1 justify-end text-sm text-light-blue cursor-pointer"
          onClick={() => postComment(post._id)}
        >
          Post
        </div>
      </div>
    </div>
  );
};

export default Posts;
