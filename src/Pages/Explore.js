import React, { useEffect, useState } from "react";

import axios from "axios";

import NavBar from "../Component/NavBar";
import CreatePost from "../Component/CreatePost";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { openPost } from "../redux/features/post/postOpenSlice";

import instagramLoading from "../assets/instagramLoading.png";
import InstagramLoading from "../Component/InstagramLoading";

const URL = process.env.REACT_APP_API_URL;

const Explore = () => {
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const token = useSelector((state) => state.token);

  const isPostOpen = useSelector((state) => state.postOpen);

  useEffect(() => {
    axios
      .get(`${URL}/post/explore`, {
        headers: {
          token,
        },
      })
      .then((response) => setPost(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {isPostOpen && <CreatePost />}

      {post ? (
        <div className="flex items-center gap-2  flex-col pt-10 ">
          {/* if length is 3 or more than 3 */}

          {post.length >= 3 ? (
            <div className="flex flex-col w-full items-center">
              <div className="flex w-2/3 max-md:w-full p-2 items-center gap-2">
                <div className="w-1/3 flex flex-col gap-2">
                  <div className="bg-gray-200 ">
                    <div className="bg-white h-full shadow">
                      <img
                        src={post[0].image}
                        alt="Post Image"
                        className="w-full h-full object-cover"
                        onClick={() => navigate(`/post/detail/${post[0]._id}`)}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-200 ">
                    <div className="bg-white h-full shadow">
                      <img
                        src={post[1].image}
                        alt="Post Image"
                        className="w-full h-full object-cover"
                        onClick={() => navigate(`/post/detail/${post[1]._id}`)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-200 h-full w-2/3">
                  <div className="bg-white h-full flex justify-center shadow">
                    <img
                      src={post[2].image}
                      alt="Post Image"
                      className="w-full h-full object-cover"
                      onClick={() => navigate(`/post/detail/${post[2]._id}`)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid w-2/3 max-md:w-full p-2 grid-cols-3 gap-2 pt-2">
                {post.map((item, index) => {
                  return (
                    index >= 3 && (
                      <div className="bg-gray-200 " key={index}>
                        <div className="bg-white h-full shadow">
                          <img
                            src={item.image}
                            alt="Post Image"
                            onClick={() => navigate(`/post/detail/${item._id}`)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid w-2/3 max-md:w-full p-2 grid-cols-3 gap-2 ">
              {post.map((item) => {
                return (
                  <div className="bg-gray-200 ">
                    <div className="bg-white h-full shadow">
                      <img
                        src={item.image}
                        alt="Post Image"
                        className="w-full h-full object-cover"
                        onClick={() =>
                          navigate(`/post/detail/${post.user._id}`)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <InstagramLoading />
      )}
    </div>
  );
};

export default Explore;
