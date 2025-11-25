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
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* Main content area */}
        <main className="flex-1 bg-gray-50 flex flex-col">
          <Routes>
            {/* Chat on home (or use route.chat.path if you made one) */}

            <Route path={route.chat.path} element={<Chat />} />

            <Route path={route.login.path} element={<Login />} />
            <Route path={route.signup.path} element={<Signup />} />
            <Route path={route.chat.path} element={<Chat />} />

            {/* optional: redirect unknown paths to chat */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}

export default App;
