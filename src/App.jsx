import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import ResumeBuilder from "./Pages/ResumeBuilder";
import Preview from "./Pages/Preview";
import Login from "./Pages/Login";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./app/features/authSlice";
import apis from "./configs/api";
import {Toaster} from 'react-hot-toast';


const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (accessToken) {
        const { data } = await apis.get("/api/users/data", {
          headers: { Authorization: accessToken },
        });
        if (data.user) {
          dispatch(login({ accessToken, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:id" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:id" element={<Preview />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
