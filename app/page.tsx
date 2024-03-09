import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Feed from "./components/Feed.jsx";
import Widgets from "./components/Widgets.jsx";
const page = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* Widges  */}
      <Widgets />
    </div>
  );
};

export default page;
