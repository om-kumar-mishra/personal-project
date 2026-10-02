import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routeConstants";
import { useDispatch } from "react-redux";
import { setSideMenuType } from "../lib/services/common/action";
import { NavFor } from "./navigationBar/navList";

const ProjectSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSideMenuType(undefined));
  }, []);

  return (
    <div className='text-center p-3'>
      <div
        onClick={() => {
          dispatch(setSideMenuType(NavFor.PORTFOLIO));
        }}>
        Portfolio
      </div>
      <div
        onClick={() => {
          dispatch(setSideMenuType(NavFor.INVESTMENT));
        }}>
        Investment
      </div>
      <div
        onClick={() => {
          dispatch(setSideMenuType(NavFor.PROJECT));
          navigate(ROUTES.PROJECT_LIST);
        }}>
        Project
      </div>
    </div>
  );
};

export default ProjectSearch;
