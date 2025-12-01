// src/App.js
import React from "react";

import Sidebar from "./common/element/layout/sidebar";
import Header from "./common/element/layout/header";
import Login from "./app/auth/login";
import Signup from "./app/auth/signup";
import Chat from "./common/element/chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { route } from "./common/config/route";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* Main content area */}
        <main className="flex-1 bg-gray-900 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0">
            <Routes>
              {/* Chat on home route */}
              <Route path={route.home.path} element={<Chat />} />
              <Route path={route.chat.path} element={<Chat />} />

              <Route path={route.login.path} element={<Login />} />
              <Route path={route.signup.path} element={<Signup />} />

              {/* optional: redirect unknown paths to home */}
              <Route path="*" element={<Navigate to={route.home.path} />} />
            </Routes>
          </div>
        </main>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}

export default App;
