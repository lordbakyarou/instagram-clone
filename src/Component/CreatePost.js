import React, { useState } from "react";
import axios from "axios";

import { ImCancelCircle } from "react-icons/im";
import { CgAddR } from "react-icons/cg";

import { BsArrowClockwise } from "react-icons/bs";

import profilePic from "../assets/profilePic.jpg";
import { useSelector, useDispatch } from "react-redux";

import { openPost } from "../redux/features/post/postOpenSlice";

const URL = process.env.REACT_APP_API_URL;

const CreatePost = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function uploadPost() {
    //will return alert if no image selected
    if (!image) {
      return alert("Post without image cannot be created");
    }

    const data = new FormData();
    data.append("file", image);

    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dj725mr8c");

    setIsLoading(true);

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

      const postResponse = await axios.post(
        `${URL}/post/new/post/`,
        {
          title: postText,
          image: response.data.url,
        },
        {
          headers: {
            token,
          },
        }
      );

      dispatch(openPost());
      setIsLoading(false);
      setImage(null);
    } catch (err) {
      console.log(err, data);
      setIsLoading(false);
    }
  }

  return (
    <div className="absolute flex w-full justify-center">
      <div className="w-96 bg-white flex flex-col h-fit rounded shadow fixed z-50 flex  items-center">
        <div className="flex w-full justify-between p-2 shadow items-center">
          <p className="font-semibold">Create Post</p>
          <ImCancelCircle
            className="text-red-400 cursor-pointer"
            onClick={() => dispatch(openPost())}
          />
        </div>
        <div className="w-full">
          <div className="profile">
            <div className="flex justify-between">
              <div className=" pl-4 pr-4 gap-3  cursor-pointer flex items-center">
                <img
                  src={userInfo.profile || profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-xs font-semibold">{userInfo.username}</p>
                  <p className="text-xs text-gray-500">{userInfo.fullname}</p>
                </div>
              </div>
              <div className="flex items-center p-4 text-xs text-light-blue cursor-pointer">
                <label htmlFor="file" className="cursor-pointer">
                  Add Photo/Videos
                </label>
                <input
                  id="file"
                  type="file"
                  className="hidden "
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="p-4 h-48 shadow">
            <textarea
              id="multilineInput"
              rows="4" // You can adjust the number of visible rows as needed
              className="w-full mt-1 p-2  outline-none rounded-md"
              placeholder="What's on your mind today..."
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
          <div className="p-2">
            <button
              onClick={uploadPost}
              className="bg-light-blue flex justify-center items-center hover:bg-dark-blue text-white font-bold text-sm p-2 w-full rounded"
            >
              {isLoading ? (
                <BsArrowClockwise className="animate-spin text-xl " />
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
