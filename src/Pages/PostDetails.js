import React, { useState, useEffect, lazy, Suspense } from "react";
import Comment from "../Component/Comment";

import Post from "../Component/Posts"; // Assuming Post component is located in the same directory

// import LazyPost from "../Component/Posts"; // Make sure the import is correct

import { useParams } from "react-router-dom";
import axios from "axios";

import { IoMdHome } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { BsSend } from "react-icons/bs";

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

import { BsThreeDots } from "react-icons/bs";

import { MdOutlineDeleteForever } from "react-icons/md";

import { BsEmojiSmileUpsideDown } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";

import { FaRegHeart } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import instagramLoading from "../assets/instagramLoading.png";
import LazyLoadedPosts from "./LazyLoadedPosts";
import InstagramLoading from "../Component/InstagramLoading";

const PostLazyLoad = lazy(() => import(`../Component/Posts`));

const PostDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  //   console.log(id);

  //   const [showFullText, setShowFullText] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [likes, setLikes] = useState(0);

  const [comment, setComment] = useState("");

  const [post, setPost] = useState(null);

  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isPostDeletable, setIsPostDeletable] = useState(false);

  const [isDeleteFocused, setIsDeleteFocused] = useState(false);

  //   const [likes, setLikes] = useState(null);

  //   const [comment, setComment] = useState("");

  const [commentCount, setCommentCount] = useState(null);

  const [updateComments, setUpdateComments] = useState(null);

  //   const [isLiked, setIsLiked] = useState(false);

  //   const [showComments, setShowComments] = useState(false);

  const URL = process.env.REACT_APP_API_URL;

  function dateToCalendar(data) {
    const dateString = data;
    const dateObject = new Date(dateString);
    const formattedDate = format(dateObject, "do MMM yyyy");

    return formattedDate;
  }

  function displayDate(data) {
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;

    const start = new Date(data);
    const end = new Date();

    const timeDifference = Math.abs(end - start);

    const years = Math.floor(timeDifference / (365.25 * millisecondsPerDay));
    const months = Math.floor(
      (timeDifference % (365.25 * millisecondsPerDay)) /
        (30.44 * millisecondsPerDay)
    );
    const weeks = Math.floor(timeDifference / (7 * millisecondsPerDay));
    const days = Math.floor(timeDifference / millisecondsPerDay);
    const hours = Math.floor(
      (timeDifference % millisecondsPerDay) / millisecondsPerHour
    );
    const minutes = Math.floor(
      (timeDifference % millisecondsPerHour) / millisecondsPerMinute
    );

    if (years !== 0) {
      return years + " years ago";
    }

    if (months !== 0) {
      return months + " months ago";
    }

    if (weeks !== 0) {
      return weeks + " weeks ago";
    }

    if (days !== 0) {
      return days + " days ago";
    }

    if (hours !== 0) {
      return hours + " hours ago";
    }

    if (minutes !== 0) {
      return minutes + " minutes ago";
    }
  }

  function findLike(likes, user_id) {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i] === user_id) {
        // console.log(true);
        setIsLiked(true);
      }
    }
  }

  function findBookmark(bookmarks, user_id) {
    // console.log(bookmarks);
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i] === user_id) {
        setIsBookmarked(true);
      }
    }
  }

  useEffect(() => {
    getComment(id);
  }, [commentCount]);

  function deletePost() {
    setIsDeleteFocused(false);
    axios
      .delete(`${URL}/post/${post._id}/delete`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .post(
        `${URL}/post/user/post/detail`,
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
        setPost(response.data);
        // console.log(response.data, "postdetail");
        setLikes(response.data.likes.length);
        if (response.data.user._id === userInfo._id) {
          setIsPostDeletable(true);
        }

        findLike(response.data.likes, userInfo._id);
        findBookmark(response.data.bookmarks, userInfo._id);
      })
      .catch((err) => console.log(err));
  }, [id, updateComments]);

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
            token,
          },
        }
      )
      .then((response) => {
        setComment("");
        // setUpdateComments(response.data);
        getComment(postId);
      })
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
  }

  function likeDislike(id) {
    axios
      .put(`${URL}/post/${id}/like`, null, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setLikes(response.data.likes);
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

  return post ? (
    <div className="flex justify-center">
      <div className="flex justify-center w-10/12  max-md:hidden items-center w-screen h-screen">
        <div className="w-post-detail border-t border-l border-b  border-gray-300 max-h-custom relative flex justify-center items-center ">
          <img
            src={post.image}
            className="w-post-detail h-post-detail object-cover"
            alt="Your Image Alt Text"
            onDoubleClick={() => likeDislike(post._id)}
          />
        </div>
        <div className="w-post-detail border border-gray-300 h-post-detail relative  gap-1 flex flex-col ">
          <div className="flex border-b justify-between bg-white h-fit ">
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
              <span>•</span>
              <span className="text-gray-400 text-sm text-md">
                {post.user.fullname}
              </span>
            </div>
            <div className="flex items-center p-4 cursor-pointer">
              <BsThreeDots
                onClick={() => setIsDeleteFocused(!isDeleteFocused)}
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
          <div className="post bg-white scrollbar-hide overflow-y-scroll h-full description">
            <div className=" p-4 gap-4 cursor-pointer flex ">
              <img
                src={post.user.profile}
                className="w-7 h-7 rounded-full hover:border hover:border-light-blue"
                onClick={() => navigate(`/user/profile/${post.user._id}`)}
              />
              <div className="flex flex-col gap-1">
                <p
                  className="text-sm font-semibold  "
                  onClick={() => navigate(`/user/profile/${post.user._id}`)}
                >
                  {post.user.username}
                  <span className="ml-2 font-normal text-sm">{post.title}</span>
                </p>

                <div className="text-xs text-gray-400">
                  {displayDate(post.createdAt)}
                </div>
              </div>
            </div>
            {updateComments && (
              <div className="comments ">
                <Comment comments={updateComments} />
                {/* {console.log(updateComments, "this is updatedcomment")} */}
              </div>
            )}
          </div>

          <div className="like-bs border-t p-2 ">
            <div className="post-icons flex gap-3 text-xl p-2.5">
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
            <div className="p-2">
              <p className="font-semibold">{likes} Likes</p>
              <p className="text-gray-400">{dateToCalendar(post.createdAt)}</p>
            </div>
            <div>
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
          </div>
        </div>
      </div>
      <div className="md:hidden w-screen pb-20 flex justify-center">
        {/* <LazyPost post={post} />  */}
        {/* {console.log(post, "postpost")} */}
        <LazyLoadedPosts post={post} />
      </div>
    </div>
  ) : (
    <InstagramLoading />
  );
};

export default PostDetails;
