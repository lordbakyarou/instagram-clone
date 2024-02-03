import React from "react";

import { FaRegHeart } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Comment = ({ comments, displayDate }) => {
  const navigate = useNavigate();

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
    const seconds = Math.floor(
      (timeDifference % millisecondsPerMinute) / millisecondsPerSecond
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

    if (seconds !== 0) {
      return seconds + " seconds ago";
    }
  }

  // console.log(comments);
  return (
    comments.length > 0 &&
    comments.map((comment, index) => {
      return (
        <div className="bg-white p-4 gap-3 flex " key={index}>
          <img
            src={comment.user.profile}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-3 cursor-pointer"
            onClick={() => navigate(`/user/profile/${comment.user._id}`)}
          />
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 justify-between">
              <p
                className="text-sm text-gray-800 mr-20"
                style={{
                  fontWeight: "500",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                  }}
                  onClick={() => navigate(`/user/profile/${comment.user._id}`)}
                >
                  {comment.user.username}
                </span>

                <span className="ml-3 text-sm text-gray-700">
                  {comment.comment}
                </span>
              </p>
              <FaRegHeart className="cursor-pointer w-10 justify-items-end" />
            </div>
            <p className="text-xs text-gray-500 font-semibold flex gap-4">
              <span className="text-gray-400 font-normal">
                {displayDate(comment.createdAt) || "0 seconds ago"}
              </span>{" "}
              <span className="cursor-pointer">like</span>{" "}
              <span className="cursor-pointer">Reply</span>
            </p>
          </div>
        </div>
      );
    })
  );
};

export default Comment;
