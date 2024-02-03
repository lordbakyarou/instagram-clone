import React from "react";

import { BsArrowClockwise } from "react-icons/bs";

const Posts = React.lazy(() => import("../Component/Posts"));

const LazyLoadedPosts = ({ post, index }) => {
  return (
    <React.Suspense
      fallback={
        <div className="w-96 h-96 flex justify-center items-center">
          <BsArrowClockwise className="animate-spin text-xl text-dark-blue" />
        </div>
      }
    >
      <Posts post={post} key={index} className="flex flex-col gap-10" />
    </React.Suspense>
  );
};

export default LazyLoadedPosts;
