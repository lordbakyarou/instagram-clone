import React, { useEffect, useState } from "react";

import NavBar from "../Component/NavBar";

import profilePic from "../assets/profilePic.jpg";
import axios from "axios";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { BsArrowClockwise } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";

import { openPost } from "../redux/features/post/postOpenSlice";
import CreatePost from "../Component/CreatePost";
import { setUserInfo } from "../redux/features/user/userSlice";

const URL = process.env.REACT_APP_API_URL;

const Settings = () => {
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.user.userInfo);
  // console.log(userInfo, "this is userInfo");
  const isPostOpen = useSelector((state) => state.postOpen);

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [userCreationError, setUserCreationError] = useState(null);
  const [userPasswordChange, setUserPasswordChange] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [changePasswordButton, setChangePasswordButton] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [image, setImage] = useState(null);

  const [user, setUser] = useState({
    username: userInfo.username,
    fullname: userInfo.fullname,
    email: userInfo.email,
    description: userInfo.description,
    profile: userInfo.profile,
  });

  async function uploadPost() {
    setIsLoading(true);

    // console.log(user, "inside upload post");

    const data = new FormData();
    // console.log(image, "userproflie");
    data.append("file", image);

    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dj725mr8c");

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

      // console.log(response.data.url, "userData");

      updateUser(response.data.url);
    } catch (err) {
      console.log(err, data);
      updateUser();
    }
  }

  // console.log(user, "this is uer");

  const { username, fullname, email, description } = user;

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  function updateUser(data) {
    // console.log(user.username);
    axios
      .put(
        `${URL}/user/update/user/profile/details`,
        {
          username: user.username,
          fullname: user.fullname,
          description: user.description,
          email: user.email,
          profile: data || user.profile,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        // console.log(response, "after user updated");
        setUser({ ...user, profile: data || response.data.profile });
        dispatch(setUserInfo(response.data));
        setUserCreationError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUserCreationError(err.response.data);

        setIsLoading(false);
      });
  }

  function updateUserInput(e) {
    let key = e.target.name;
    // console.log(user);
    setUser({ ...user, [key]: e.target.value });
    // console.log(user);
  }

  function updatePassword() {
    setIsLoading(true);

    axios
      .put(
        `http://localhost:5000/api/user/update/password`,
        {
          oldpassword: oldPassword.trim().toLocaleLowerCase(),
          newpassword: newPassword.trim().toLocaleLowerCase(),
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setOldPassword("");
        setNewPassword("");
        setUserPasswordChange(null);
      })
      .catch((err) => {
        // console.log(err);
        setUserPasswordChange(err.response.data);
        setIsLoading(false);
      });
  }

  return (
    <div>
      {isPostOpen && <CreatePost />}

      <div className="bg-gray-50 h-screen">
        <div className=" rounded flex justify-center  scrollbar-hide overflow-x-scroll">
          <div className="flex border  max-lg:gap-1 mt-10 gap-10 rounded-md shadow bg-white">
            <div className="left-side max-lg:hidden border-r flex flex-col gap-10 ">
              <div className="left-up p-6 flex flex-col gap-5 font-semibold">
                <p onClick={() => setChangePasswordButton(false)}>
                  Edit Profile
                </p>
                <p onClick={() => setChangePasswordButton(true)}>
                  Change Password
                </p>
              </div>
              <div className="left-down  p-6 flex flex-col gap-5 border-t">
                <p className="text-dark-blue font-semibold">Account center</p>
                <p className="w-48 text-gray-400">
                  {" "}
                  Control settings for connected experiences on Instagram, the
                  Facebook app, and Messenger, including sharing stories and
                  posts, and logging in.
                </p>
              </div>
            </div>
            {changePasswordButton ? (
              <div className="p-10 max-sm:p-5 ">
                <table>
                  <tbody>
                    <tr>
                      <td
                        colSpan="2"
                        className="bg-white p-4 flex justify-center items-center w-fit cursor-pointer"
                      >
                        <img
                          src={userInfo.profile}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </td>
                      <td>
                        {" "}
                        <p className="font-semibold p-2 text-2xl">{username}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-semibold">
                        Previous password
                      </td>
                      <td className="pl-5 py-5">
                        <div className="input-password  relative">
                          <input
                            type={showOldPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={oldPassword}
                            className="peer bg-gray-50 max-lg:w-80 max-sm:w-52 w-full h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                          <label
                            className="absolute
                 transition-all
                  left-2.5 -top-0
                   text-gray-400 
                   text-xxs peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                          >
                            Old Password
                          </label>
                          {/* {console.log(oldPassword)} */}
                          {oldPassword != "" && (
                            <div
                              className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                              onClick={toggleOldPasswordVisibility}
                            >
                              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-semibold">
                        New password
                      </td>
                      <td className="pl-5">
                        <div className="input-password  relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={newPassword}
                            className="peer max-lg:w-80 max-sm:w-52 bg-gray-50 w-96 h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <label
                            className="absolute
                 transition-all
                  left-2.5 -top-0
                   text-gray-400 
                   text-xxs peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                          >
                            New Password
                          </label>

                          {newPassword && (
                            <div
                              className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                              onClick={toggleNewPasswordVisibility}
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td
                        colSpan="2"
                        className="flex py-5 flex-col pl-5 gap-10 justify-center"
                      >
                        <button
                          onClick={() => updatePassword()}
                          className="text-sm w-40 flex justify-center items-center cursor-pointer font-semibold flex items-center border rounded-md px-4 p-1 bg-light-blue text-white"
                        >
                          {isLoading ? (
                            <BsArrowClockwise className="animate-spin text-xl " />
                          ) : (
                            "Change Password"
                          )}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <p
                          onClick={() => setChangePasswordButton(false)}
                          className="font-semibold pl-5 cursor-pointer text-dark-blue"
                        >
                          Edit Profile?
                        </p>
                      </td>
                    </tr>
                    {userPasswordChange && (
                      <tr>
                        <td></td>
                        <td>
                          <p className="text-red-400">{userPasswordChange}</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 max-lg:p-1">
                <table>
                  <tbody>
                    <tr>
                      <td
                        colSpan="2"
                        className="bg-white p-4 flex justify-center items-center w-fit cursor-pointer"
                      >
                        {/* {console.log(userInfo.profile, "userProfil")} */}

                        <img
                          src={userInfo.profile}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </td>
                      <td className="p-4">
                        {/* {console.log("mayurhanwate")} */}
                        <p className="font-semibold p-2 text-2xl">
                          {user.username}
                        </p>
                        <p className=" text-dark-blue font-semibold cursor-pointer p-2">
                          <label htmlFor="file" className="cursor-pointer">
                            Add Photo/Videos
                          </label>
                          <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              setImage(e.target.files[0]);
                            }}
                          />
                        </p>
                      </td>
                    </tr>
                    <tr className="">
                      <td className="p-2 text-right font-semibold">Name</td>
                      <td className="pl-5 pr-10">
                        <input
                          id="old-password"
                          placeholder="Name..."
                          value={user.fullname}
                          className="w-96 max-lg:w-80 max-sm:w-52 bg-gray-50 p-2 outline-none border rounded border-gray-100"
                          name="fullname"
                          onChange={updateUserInput}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="p-2 w-96  max-sm:w-52 max-lg:w-80 text-sm py-5 text-gray-400 pl-5">
                        To help people discover your account, use the name
                        people know you by, whether it's your full name,
                        nickname, or business name. You can only change your
                        name twice within a 14-day period.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-semibold">Username</td>
                      <td className="pl-5">
                        <input
                          id="new-password"
                          placeholder="Username..."
                          value={user.username}
                          name="username"
                          onChange={updateUserInput}
                          className="w-96 max-sm:w-52 max-lg:w-80 bg-gray-50 p-2 outline-none border rounded border-gray-100"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="p-2 w-96 max-sm:w-52 max-lg:w-80 text-sm py-5 pl-5 text-gray-400">
                        In most cases, you will be able to change your username
                        back to johndoe for an additional 14 days. More
                        information
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-semibold">
                        Description
                      </td>
                      <td className="pl-5">
                        <textarea
                          id="new-password"
                          placeholder="Decription..."
                          value={user.description}
                          name="description"
                          onChange={updateUserInput}
                          className="w-96 max-sm:w-52 max-lg:w-80 bg-gray-50 p-2 outline-none border rounded border-gray-100"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="p-2 w-96 max-sm:w-52 max-lg:w-80 py-5 text-sm pl-5 text-gray-400">
                        Provide your personal information, even if the account
                        is used for a business, a pet, etc. This information
                        will not be kept in your public profile.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-semibold">Email</td>
                      <td className="pl-5 py-5">
                        <input
                          id="new-password"
                          placeholder="Email..."
                          value={user.email}
                          name="email"
                          onChange={updateUserInput}
                          className="w-96 max-sm:w-52 max-lg:w-80 bg-gray-50 p-2 outline-none border rounded border-gray-100"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className=""></td>
                      <td
                        colSpan="2"
                        className="flex pb-10 pl-5 gap-10 justify-first items-center"
                      >
                        <button
                          onClick={() => uploadPost()}
                          className="text-sm w-fit flex justify-center font-semibold cursor-pointer flex items-center border rounded-md px-4 p-1 bg-light-blue text-white"
                        >
                          {isLoading ? (
                            <BsArrowClockwise className="animate-spin text-xl " />
                          ) : (
                            "Update Profile"
                          )}
                        </button>
                        <p
                          onClick={() => setChangePasswordButton(true)}
                          className="font-semibold cursor-pointer pl-5 text-dark-blue"
                        >
                          Change Password?
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td
                        colSpan="2"
                        className="flex text-red-400  text-lg pb-20 pl-5 gap-10 justify-first items-center"
                      >
                        {userCreationError && (
                          <div className="error">
                            <p className="flex justify-center items-center text-red-400">
                              {userCreationError}
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
