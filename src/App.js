import React, { useState } from "react";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import UserProfile from "./Pages/UserProfile";
import Settings from "./Pages/Settings";
import Explore from "./Pages/Explore";
import Search from "./Pages/Search";
import PostDetails from "./Pages/PostDetails";

import NavBar from "./Component/NavBar";
import Footer from "./Component/Footer";

import "../src/App.css";

import { Routes, Route } from "react-router-dom";

const LayoutWithNavBar = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <LayoutWithNavBar>
              <Dashboard />
            </LayoutWithNavBar>
          }
        />
        <Route
          path="/user/profile/:id"
          element={
            <LayoutWithNavBar>
              <UserProfile />
            </LayoutWithNavBar>
          }
        />
        <Route
          path="/user/settings"
          element={
            <LayoutWithNavBar>
              <Settings />
            </LayoutWithNavBar>
          }
        />
        <Route
          path="/explore"
          element={
            <LayoutWithNavBar>
              <Explore />
            </LayoutWithNavBar>
          }
        />
        <Route
          path="/search"
          element={
            <div>
              <Search /> <Footer />
            </div>
          }
        />
        <Route
          path="/post/detail/:id"
          element={
            <LayoutWithNavBar>
              <PostDetails />
            </LayoutWithNavBar>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
