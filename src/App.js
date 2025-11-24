import React from "react";

import Sidebar from "./common/element/layout/sidebar/index";
import Header from "./common/element/layout/header/index";
import Login from "./app/login/index";
import Signup from "./app/signup/index";
import { Routes, Route } from "react-router-dom";
import { route } from "./common/config/route";

function App() {
  return (
    <div className="flex h-screen">
      {/* Left: Sidebar */}
      <Sidebar />

      {/* Right: Main area */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Page content area */}
        <main className="flex-1 bg-gray-50">
          {/* put your main content here */}
          <Routes>
            <Route path={route.login.path} element={<Login />} />
            <Route path={route.signup.path} element={<Signup />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
