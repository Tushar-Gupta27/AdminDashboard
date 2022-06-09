import React from "react";
import "./list.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Datatable from "../../components/Datatable/Datatable";
import { Outlet } from "react-router-dom";
function List() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Header />
        <Datatable />
        <Outlet />
      </div>
    </div>
  );
}

export default List;
